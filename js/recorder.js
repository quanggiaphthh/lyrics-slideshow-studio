/**
 * LYRICSTUDIO PRO - 60FPS VIDEO EXPORT RECORDER
 * Captures Canvas 60fps stream + Web Audio destination and downloads WebM/MP4
 */

class VideoExporter {
  constructor(engine, audioElement) {
    this.engine = engine;
    this.audio = audioElement;
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.isRecording = false;
    this.onProgress = null;
    this.onComplete = null;
    this.onError = null;
  }

  startExport(options = {}) {
    if (this.isRecording) return;
    this.isRecording = true;
    this.recordedChunks = [];

    const canvas = this.engine.canvas;
    const fps = options.fps || 60;
    const duration = this.audio.duration || this.engine.totalDuration || 30.0;

    // 1. Get Canvas video stream at specified FPS
    const canvasStream = canvas.captureStream(fps);

    // 2. Get Audio stream from AudioContext
    let combinedStream;
    try {
      if (!this.engine.audioCtx) {
        this.engine.initAudioContext(this.audio);
      }
      const audioCtx = this.engine.audioCtx;
      const dest = audioCtx.createMediaStreamDestination();
      
      // Connect audio source to destination for recording
      this.engine.audioSource.connect(dest);

      const audioTrack = dest.stream.getAudioTracks()[0];
      if (audioTrack) {
        canvasStream.addTrack(audioTrack);
      }
      combinedStream = canvasStream;
    } catch (e) {
      console.warn('Could not capture audio track directly, recording video stream:', e);
      combinedStream = canvasStream;
    }

    // 3. Determine best supported mimeType
    const mimeTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=avc1,mp4a',
      'video/webm'
    ];

    let selectedMime = 'video/webm';
    for (const mime of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mime)) {
        selectedMime = mime;
        break;
      }
    }

    // 4. Initialize MediaRecorder
    try {
      this.mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: selectedMime,
        videoBitsPerSecond: 8000000 // 8 Mbps high quality
      });
    } catch (err) {
      console.error('Failed to create MediaRecorder:', err);
      this.isRecording = false;
      if (this.onError) this.onError(err);
      return;
    }

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      this.isRecording = false;
      const blob = new Blob(this.recordedChunks, { type: selectedMime });
      const ext = selectedMime.includes('mp4') ? 'mp4' : 'webm';
      const filename = `lyric_video_${this.engine.currentTemplate.id}_${Date.now()}.${ext}`;

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 2000);

      if (this.onComplete) this.onComplete(blob, filename);
    };

    // 5. Start real-time recording synchronized with playback
    this.mediaRecorder.start(100);

    // Reset audio to start
    this.audio.currentTime = 0;
    this.audio.play();

    const checkInterval = setInterval(() => {
      if (!this.isRecording) {
        clearInterval(checkInterval);
        return;
      }

      const currTime = this.audio.currentTime;
      const progress = Math.min(100, Math.round((currTime / duration) * 100));

      if (this.onProgress) {
        this.onProgress(progress, currTime, duration);
      }

      if (currTime >= duration || this.audio.ended) {
        clearInterval(checkInterval);
        this.stopExport();
      }
    }, 150);
  }

  stopExport() {
    if (!this.isRecording) return;
    this.isRecording = false;
    this.audio.pause();
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  cancelExport() {
    this.isRecording = false;
    this.audio.pause();
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.recordedChunks = [];
  }
}

window.VideoExporter = VideoExporter;
