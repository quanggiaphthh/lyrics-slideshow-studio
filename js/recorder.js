/**
 * LYRICSTUDIO PRO - 60FPS VIDEO EXPORT RECORDER (G2 ENHANCED)
 * Captures Canvas 60fps stream + Web Audio destination and downloads MP4/WebM
 * Features robust State Machine, Strict Cancellation Semantics, and Dynamic Naming.
 */

class VideoExporter {
  constructor(engine, audioElement) {
    this.engine = engine;
    this.audio = audioElement;
    this.mediaRecorder = null;
    this.recordedChunks = [];
    
    // State machine: idle | preparing | recording | finalizing | completed | cancelled | failed
    this.exportState = 'idle';
    // Intent: null | finish_full | save_partial | cancel
    this.completionIntent = null;

    this.renderAnimId = null;
    this.recordDestination = null;
    this.onProgress = null;
    this.onComplete = null;
    this.onError = null;
  }

  get isRecording() {
    return this.exportState === 'recording' || this.exportState === 'preparing';
  }

  generateFilename(ext) {
    let rawTitle = 'lyric_video';
    try {
      if (typeof window.getCurrentProjectState === 'function') {
        const state = window.getCurrentProjectState();
        rawTitle = state.audioTitle || state.audioName || rawTitle;
      } else if (window.DEMO_PRESET_GANH_HAO?.audioTitle) {
        rawTitle = window.DEMO_PRESET_GANH_HAO.audioTitle;
      }
    } catch (e) {}

    // Sanitize Unicode and Windows reserved characters: < > : " / \ | ? *
    let safeTitle = String(rawTitle)
      .normalize('NFC')
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
      .replace(/\s+/g, '_')
      .trim();

    if (!safeTitle || safeTitle === '.') safeTitle = 'lyric_video';
    return `${safeTitle.slice(0, 80)}_60fps_${Date.now()}.${ext}`;
  }

  async startExport(options = {}) {
    if (this.exportState !== 'idle' && this.exportState !== 'completed' && this.exportState !== 'cancelled' && this.exportState !== 'failed') {
      console.warn('Export already in progress in state:', this.exportState);
      return;
    }

    this.exportState = 'preparing';
    this.completionIntent = null;
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
      if (typeof this.audio.captureStream === 'function') {
        try {
          const stream = this.audio.captureStream();
          audioTracks = stream.getAudioTracks();
        } catch (e) {
          console.warn('HTMLAudioElement.captureStream fallback to Web Audio:', e);
        }
      }

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
      } else {
        console.warn('[EXP-03] Warning: No audio tracks available for export stream!');
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

      console.log(`[Export Diagnostics] Target MIME: ${selectedMime}, Duration: ${duration.toFixed(2)}s, AudioTracks: ${audioTracks.length}, VideoTracks: ${canvasStream.getVideoTracks().length}`);

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
        const intent = this.completionIntent;
        this.cleanup();

        // STRICT CANCELLATION SEMANTICS: Do not download or fire complete if cancelled or failed
        if (intent === 'cancel' || this.exportState === 'cancelled' || this.exportState === 'failed') {
          console.log('[Export] Cancelled cleanly - discarding recorded chunks, no file downloaded.');
          if (this.exportState !== 'failed') this.exportState = 'cancelled';
          this.recordedChunks = [];
          return;
        }

        if (intent === 'finish_full' || intent === 'save_partial') {
          this.exportState = 'completed';
          if (!this.recordedChunks.length) {
            console.error('[Export] Error: No chunks recorded on completion!');
            if (this.onError) this.onError(new Error('Không nhận được dữ liệu video nào từ trình duyệt.'));
            return;
          }

          const blob = new Blob(this.recordedChunks, { type: selectedMime });
          const ext = selectedMime.includes('mp4') ? 'mp4' : 'webm';
          const filename = this.generateFilename(ext);

          console.log(`[Export Success] Download ready: ${filename} (${(blob.size / (1024*1024)).toFixed(2)} MB, Chunks: ${this.recordedChunks.length})`);

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
        }
      };

      this.mediaRecorder.onerror = (e) => {
        console.error('MediaRecorder error event:', e);
        this.exportState = 'failed';
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
      this.exportState = 'recording';

      // 8. Start audio playback
      try {
        await this.audio.play();
      } catch (playErr) {
        console.error('Failed to play audio during export:', playErr);
        this.completionIntent = 'cancel';
        this.exportState = 'failed';
        this.cleanup();
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
          try { this.mediaRecorder.stop(); } catch (e) {}
        }
        if (this.onError) this.onError(playErr);
        return;
      }

      // 9. Dedicated 60FPS export render loop
      const renderExportLoop = () => {
        if (this.exportState !== 'recording') return;

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
          this.stopExport('finish_full');
          return;
        }

        this.renderAnimId = requestAnimationFrame(renderExportLoop);
      };

      this.renderAnimId = requestAnimationFrame(renderExportLoop);

    } catch (fatalErr) {
      console.error('Fatal export initialization error:', fatalErr);
      this.exportState = 'failed';
      this.cleanup();
      if (this.onError) this.onError(fatalErr);
    }
  }

  cleanup() {
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

  stopExport(intent = 'finish_full') {
    if (this.exportState !== 'recording' && this.exportState !== 'preparing') return;
    this.completionIntent = intent;
    this.exportState = 'finalizing';
    this.cleanup();

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        console.warn('Error stopping MediaRecorder:', e);
      }
    }
  }

  savePartialExport() {
    this.stopExport('save_partial');
  }

  cancelExport() {
    this.completionIntent = 'cancel';
    this.exportState = 'cancelled';
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
