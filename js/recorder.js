/**
 * LYRICSTUDIO PRO - 60FPS VIDEO EXPORT RECORDER
 * Captures Canvas 60fps stream + Web Audio destination and downloads MP4/WebM
 * Synchronized with dedicated 60fps render loop to prevent browser frame stalls.
 */

class VideoExporter {
  constructor(engine, audioElement) {
    this.engine = engine;
    this.audio = audioElement;
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.isRecording = false;
    this.renderAnimId = null;
    this.recordDestination = null;
    this.onProgress = null;
    this.onComplete = null;
    this.onError = null;
  }

  async startExport(options = {}) {
    if (this.isRecording) return;
    this.isRecording = true;
    this.recordedChunks = [];

    const canvas = this.engine.canvas;
    const fps = options.fps || 60;
    const duration = this.audio.duration || this.engine.totalDuration || 353.23;

    try {
      // 1. Ensure AudioContext is initialized and resumed
      if (!this.engine.audioCtx) {
        this.engine.initAudioContext(this.audio);
      }
      if (this.engine.audioCtx && this.engine.audioCtx.state === 'suspended') {
        try {
          await this.engine.audioCtx.resume();
        } catch (ctxErr) {
          console.warn('AudioContext resume warning:', ctxErr);
        }
      }

      // 2. Capture Canvas video stream at requested FPS
      const canvasStream = canvas.captureStream(fps);

      // 3. Connect audio stream
      let audioTracks = [];
      // Try direct captureStream from HTMLAudioElement first
      if (typeof this.audio.captureStream === 'function') {
        try {
          const stream = this.audio.captureStream();
          audioTracks = stream.getAudioTracks();
        } catch (e) {
          console.warn('HTMLAudioElement.captureStream failed, fallback to Web Audio:', e);
        }
      }

      // Fallback to Web Audio destination node
      if (audioTracks.length === 0 && this.engine.audioCtx) {
        try {
          if (!this.recordDestination) {
            this.recordDestination = this.engine.audioCtx.createMediaStreamDestination();
            if (this.engine.audioSource) {
              this.engine.audioSource.connect(this.recordDestination);
            }
          }
          audioTracks = this.recordDestination.stream.getAudioTracks();
        } catch (e) {
          console.warn('Web Audio destination failed:', e);
        }
      }

      if (audioTracks.length > 0) {
        for (const track of audioTracks) {
          canvasStream.addTrack(track);
        }
      }

      // 4. Select best supported MIME type
      const candidateMimes = [
        'video/mp4;codecs=avc1,mp4a.40.2',
        'video/mp4',
        'video/webm;codecs=h264,opus',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm'
      ];

      let selectedMime = '';
      for (const mime of candidateMimes) {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(mime)) {
          selectedMime = mime;
          break;
        }
      }
      if (!selectedMime) selectedMime = 'video/webm';

      // 5. Initialize MediaRecorder
      const recOptions = {
        mimeType: selectedMime,
        videoBitsPerSecond: options.bitrate || 10000000 // 10 Mbps crisp quality
      };

      try {
        this.mediaRecorder = new MediaRecorder(canvasStream, recOptions);
      } catch (err) {
        console.warn('MediaRecorder with options failed, fallback without bitrate:', err);
        this.mediaRecorder = new MediaRecorder(canvasStream, { mimeType: selectedMime });
      }

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.recordedChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.cleanup();
        const blob = new Blob(this.recordedChunks, { type: selectedMime });
        const ext = selectedMime.includes('mp4') ? 'mp4' : 'webm';
        const rawTitle = (window.DEMO_PRESET_GANH_HAO?.audioTitle || 'dem_ganh_hao_lyric_video');
        const safeTitle = rawTitle.replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '_');
        const filename = `${safeTitle}_60fps_${Date.now()}.${ext}`;

        // Trigger automatic file download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 3000);

        if (this.onComplete) this.onComplete(blob, filename);
      };

      this.mediaRecorder.onerror = (e) => {
        console.error('MediaRecorder error event:', e);
        this.cleanup();
        if (this.onError) this.onError(e.error || e);
      };

      // 6. Reset audio to start position cleanly
      this.audio.pause();
      this.audio.currentTime = 0;
      await new Promise(r => setTimeout(r, 150));

      // Initial frame paint
      this.engine.renderFrame(0);

      // 7. Start recording in slices of 200ms
      this.mediaRecorder.start(200);

      // 8. Start audio playback
      try {
        await this.audio.play();
      } catch (playErr) {
        console.error('Failed to play audio during export:', playErr);
        this.cleanup();
        if (this.onError) this.onError(playErr);
        return;
      }

      // 9. Dedicated 60FPS export render loop to feed canvasStream and update UI
      const renderExportLoop = () => {
        if (!this.isRecording) return;

        const t = this.audio.currentTime;

        // Render kinetic motion, Ken Burns pan/zoom, film grain, lyrics
        this.engine.renderFrame(t);

        // Update progress UI
        const progress = Math.min(100, Math.round((t / duration) * 100));
        if (this.onProgress) {
          this.onProgress(progress, t, duration);
        }

        // Check completion (only check ended after at least 3 seconds of playback)
        if (t >= duration - 0.1 || (t > 3.0 && this.audio.ended)) {
          this.stopExport();
          return;
        }

        this.renderAnimId = requestAnimationFrame(renderExportLoop);
      };

      this.renderAnimId = requestAnimationFrame(renderExportLoop);

    } catch (fatalErr) {
      console.error('Fatal export initialization error:', fatalErr);
      this.cleanup();
      if (this.onError) this.onError(fatalErr);
    }
  }

  cleanup() {
    this.isRecording = false;
    if (this.renderAnimId) {
      cancelAnimationFrame(this.renderAnimId);
      this.renderAnimId = null;
    }
    if (this.audio && !this.audio.paused) {
      try {
        this.audio.pause();
      } catch (e) {}
    }
  }

  stopExport() {
    if (!this.isRecording) return;
    this.cleanup();
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        console.warn('Error stopping MediaRecorder:', e);
      }
    }
  }

  cancelExport() {
    this.cleanup();
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        console.warn('Error stopping MediaRecorder:', e);
      }
    }
    this.recordedChunks = [];
  }
}

window.VideoExporter = VideoExporter;
