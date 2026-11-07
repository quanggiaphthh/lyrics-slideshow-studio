/**
 * LYRICSTUDIO PRO - 60FPS GRAPHICS & SLIDESHOW ENGINE
 * High-performance HTML5 Canvas renderer with Web Audio API Integration,
 * multi-panel parallax intro slicing, and WORD-BY-WORD kinetic typography.
 */

class LyricEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });

    // Aspect ratio & dimensions
    this.aspectRatio = '16-9';
    this.width = 1280;
    this.height = 720;
    this.updateDimensions('16-9');

    // State
    this.images = [];
    this.transitionType = 'kenburns';
    this.currentTemplate = window.LYRIC_TEMPLATES.finnxiii;
    this.lyricsData = [];
    this.totalDuration = 70.0;

    // Web Audio Analyzer
    this.audioCtx = null;
    this.analyser = null;
    this.audioSource = null;
    this.freqData = new Uint8Array(64);
    this.beatEnergy = 0;

    // Particles system
    this.particles = [];
    this.initParticles(55);

    // Easing helper
    this.easeSnappy = this.cubicBezier(0.16, 1, 0.3, 1);

    // 35mm Cinematic Film Grain Texture Generator (Pre-rendered offscreen pattern)
    this.noiseCanvas = document.createElement('canvas');
    this.noiseCanvas.width = 128;
    this.noiseCanvas.height = 128;
    const nCtx = this.noiseCanvas.getContext('2d');
    const nData = nCtx.createImageData(128, 128);
    for (let i = 0; i < nData.data.length; i += 4) {
      const val = (Math.random() * 255) | 0;
      nData.data[i] = val;
      nData.data[i + 1] = val;
      nData.data[i + 2] = val;
      nData.data[i + 3] = (Math.random() * 24) | 0; // ~9% subtle organic opacity
    }
    nCtx.putImageData(nData, 0, 0);
  }

  updateDimensions(ratio) {
    this.aspectRatio = ratio;
    if (ratio === '9-16') {
      this.width = 720;
      this.height = 1280;
    } else if (ratio === '1-1') {
      this.width = 1080;
      this.height = 1080;
    } else {
      this.width = 1280;
      this.height = 720;
    }
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.initParticles(55);
  }

  setTemplate(templateId) {
    if (window.LYRIC_TEMPLATES[templateId]) {
      this.currentTemplate = window.LYRIC_TEMPLATES[templateId];
      this.initParticles(55);
    }
  }

  setImages(imgElements) {
    this.images = imgElements;
  }

  setLyrics(lyrics) {
    this.lyricsData = lyrics;
  }

  setDuration(duration) {
    this.totalDuration = duration > 0 ? duration : 70.0;
  }

  // === AUDIO CONTEXT INITIALIZATION ===
  initAudioContext(audioElement) {
    if (this.audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;

      this.audioSource = this.audioCtx.createMediaElementSource(audioElement);
      this.audioSource.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    } catch (e) {
      console.warn('AudioContext requires user gesture or already connected:', e);
    }
  }

  updateAudioEnergy() {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.freqData);
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        sum += this.freqData[i];
      }
      this.beatEnergy = (sum / 8) / 255.0;
    } else {
      this.beatEnergy = 0.2;
    }
  }

  // === PARTICLE SYSTEM ===
  initParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.5 + 0.15,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.3 - 0.12,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  renderParticles() {
    const ctx = this.ctx;
    ctx.save();
    const pType = this.currentTemplate.particleType;

    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.phase += 0.02;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      const alpha = Math.max(0, p.alpha + Math.sin(p.phase) * 0.12);

      if (pType === 'stars') {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      } else if (pType === 'neon') {
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.85})`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.fillRect(p.x, p.y, p.radius * 2, p.radius * 2);
      } else if (pType === 'grain') {
        ctx.fillStyle = `rgba(255, 230, 180, ${alpha * 0.45})`;
        ctx.fillRect(p.x, p.y, p.radius * 1.5, p.radius * 1.5);
      } else {
        // Soft glowing ambient dust mote (FinnXIII)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
    });

    ctx.restore();
  }

  // === SLIDESHOW IMAGE DRAWING WITH AUTHENTIC PARALLAX SLICES ===
  drawSlideshowImage(time) {
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;

    if (!this.images || this.images.length === 0) {
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#10121a');
      grad.addColorStop(1, '#08090d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      return;
    }

    // --- AUTHENTIC FINNXIII INTRO PARALLAX SLICE CUTS (0s - 7.5s) ---
    if (this.currentTemplate.id === 'finnxiii' && time < 7.5) {
      const baseImg = this.images[0];
      const shiftX = Math.sin(time * 0.8) * 15;

      const sliceAngle = -0.32;
      const x1 = W * 0.32;
      const x2 = W * 0.68;

      // Slice 1 (Left)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x1 + H * Math.tan(sliceAngle) * 0.5, 0);
      ctx.lineTo(x1 - H * Math.tan(sliceAngle) * 0.5, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.clip();
      this.drawCoverImage(baseImg, 1.06, -30 + shiftX, 1);
      ctx.restore();

      // Slice 2 (Center)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1 + H * Math.tan(sliceAngle) * 0.5, 0);
      ctx.lineTo(x2 + H * Math.tan(sliceAngle) * 0.5, 0);
      ctx.lineTo(x2 - H * Math.tan(sliceAngle) * 0.5, H);
      ctx.lineTo(x1 - H * Math.tan(sliceAngle) * 0.5, H);
      ctx.closePath();
      ctx.clip();
      this.drawCoverImage(baseImg, 1.08, shiftX * 0.5, 1);
      ctx.restore();

      // Slice 3 (Right)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x2 + H * Math.tan(sliceAngle) * 0.5, 0);
      ctx.lineTo(W, 0);
      ctx.lineTo(W, H);
      ctx.lineTo(x2 - H * Math.tan(sliceAngle) * 0.5, H);
      ctx.closePath();
      ctx.clip();
      this.drawCoverImage(baseImg, 1.06, 30 - shiftX, 1);
      ctx.restore();
      return;
    }

    // --- NORMAL SLIDESHOW DISTRIBUTION ---
    const numImages = this.images.length;
    const slideDuration = this.totalDuration / numImages;
    const slideIndex = Math.min(numImages - 1, Math.floor(time / slideDuration));
    const nextSlideIndex = (slideIndex + 1) % numImages;

    const slideProgress = (time % slideDuration) / slideDuration;
    const currentImg = this.images[slideIndex];
    const nextImg = this.images[nextSlideIndex];

    const zoomScale = 1.02 + slideProgress * 0.07;
    const panX = (slideProgress - 0.5) * 20;

    const transitionTime = 1.5;
    const remainingTime = slideDuration * (1 - slideProgress);

    if (remainingTime < transitionTime && numImages > 1) {
      const fadeProgress = 1 - (remainingTime / transitionTime);

      if (this.transitionType === 'slide') {
        // Push-slide horizontal
        this.drawCoverImage(currentImg, zoomScale, -fadeProgress * W, 0, 1);
        this.drawCoverImage(nextImg, 1.02, (1 - fadeProgress) * W, 0, 1);
      } else if (this.transitionType === 'zoom') {
        // Dynamic push-in zoom transition
        const currentZoom = zoomScale * (1 + fadeProgress * 0.35);
        const nextZoom = 0.88 + 0.14 * fadeProgress;
        this.drawCoverImage(currentImg, currentZoom, panX, 0, 1 - fadeProgress);
        this.drawCoverImage(nextImg, nextZoom, 0, 0, fadeProgress);
      } else if (this.transitionType === 'diagonal') {
        // Smooth diagonal push transition
        const currentOffX = -fadeProgress * W * 0.6;
        const currentOffY = -fadeProgress * H * 0.6;
        const nextOffX = (1 - fadeProgress) * W * 0.6;
        const nextOffY = (1 - fadeProgress) * H * 0.6;
        this.drawCoverImage(currentImg, zoomScale, currentOffX, currentOffY, 1 - fadeProgress * 0.3);
        this.drawCoverImage(nextImg, 1.02, nextOffX, nextOffY, fadeProgress);
      } else {
        // Classic Ken Burns crossfade drift
        this.drawCoverImage(currentImg, zoomScale, panX, 0, 1 - fadeProgress);
        this.drawCoverImage(nextImg, 1.02, -(slideProgress * 15), 0, fadeProgress);
      }
    } else {
      this.drawCoverImage(currentImg, zoomScale, panX, 0, 1);
    }

    // Soft overall cinematic ambient scrim to ensure high text contrast
    ctx.save();
    ctx.fillStyle = 'rgba(6, 8, 14, 0.26)';
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  drawCoverImage(img, scale = 1, panOffsetX = 0, panOffsetY = 0, opacity = 1) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = W / H;
    let renderW, renderH;

    if (imgRatio > canvasRatio) {
      renderH = H * scale;
      renderW = renderH * imgRatio;
    } else {
      renderW = W * scale;
      renderH = renderW / imgRatio;
    }

    const offsetX = (W - renderW) / 2 + panOffsetX;
    const offsetY = (H - renderH) / 2 + panOffsetY;

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }

  // === ACTIVE STANZA RESOLUTION (PRIORITIZES INCOMING STANZA OVER OVERLAPPING EXITING STANZA) ===
  getActiveStanza(time) {
    if (!this.lyricsData || this.lyricsData.length === 0) return null;
    const exitThreshold = 0.85;

    // Collect all candidates within [start, end + exitThreshold]
    const candidates = [];
    for (let i = 0; i < this.lyricsData.length; i++) {
      const s = this.lyricsData[i];
      if (time >= s.start && time <= s.end + exitThreshold) {
        candidates.push(s);
      }
    }
    if (candidates.length === 0) return null;
    if (candidates.length === 1) return candidates[0];

    // Priority:
    // Any candidate that has started (s.start <= time): pick the latest started one (incoming)
    const started = candidates.filter(s => time >= s.start);
    if (started.length > 0) {
      started.sort((a, b) => b.start - a.start);
      return started[0];
    }
    candidates.sort((a, b) => a.start - b.start);
    return candidates[0];
  }

  // === LYRICS MOTION RENDERER (WORD-BY-WORD KINETIC TIMING & DYNAMIC LAYOUTS) ===
  drawLyrics(time) {
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;

    if (!this.lyricsData || this.lyricsData.length === 0) return;

    const exitThreshold = 0.85;
    const activeStanza = this.getActiveStanza(time);
    if (!activeStanza) return;

    // Check if there is an outgoing stanza still in its exit transition window
    let outgoingStanza = null;
    for (let i = 0; i < this.lyricsData.length; i++) {
      const s = this.lyricsData[i];
      if (s !== activeStanza && time >= s.start && time > s.end && time <= s.end + exitThreshold) {
        outgoingStanza = s;
        break;
      }
    }

    // Render outgoing stanza in transition background (fading out)
    if (outgoingStanza) {
      this.drawSingleStanza(outgoingStanza, time, W, H, true);
    }
    // Render current active stanza
    this.drawSingleStanza(activeStanza, time, W, H, false);
  }

  drawSingleStanza(stanza, time, W, H, isOutgoing = false) {
    const ctx = this.ctx;
    const stanzaDuration = stanza.end - stanza.start;

    const isVertical = this.aspectRatio === '9-16';
    const lines = stanza.lines || [{ text: stanza.text || '', start: stanza.start, end: stanza.end }];
    const layout = stanza.layout || 'left';

    // Organic whole-stanza micro-drift (keeps words breathing naturally during vocal sustain)
    const stanzaDriftY = Math.sin((time - stanza.start) * 1.5) * 1.6;

    // Dynamic baseY and lineSpacing based on layout and line count (Generous, balanced breathing room)
    let baseY;
    let lineSpacing;
    if (layout === 'lower') {
      baseY = isVertical ? H * 0.72 : H * 0.68;
      lineSpacing = isVertical ? Math.round(H * 0.065) : Math.round(H * 0.078);
    } else if (lines.length >= 5) {
      baseY = isVertical ? H * 0.38 : H * 0.22;
      lineSpacing = isVertical ? Math.round(H * 0.062) : Math.round(H * 0.076);
    } else if (lines.length >= 3) {
      baseY = isVertical ? H * 0.42 : H * 0.28;
      lineSpacing = isVertical ? Math.round(H * 0.072) : Math.round(H * 0.088);
    } else {
      baseY = isVertical ? H * 0.48 : H * 0.34;
      lineSpacing = isVertical ? Math.round(H * 0.085) : Math.round(H * 0.105);
    }
    baseY += stanzaDriftY;

    // Dynamic baseX and indentStep based on layout archetype
    let baseX;
    let indentStep;
    if (layout === 'right') {
      baseX = isVertical ? W * 0.38 : W * 0.46;
      indentStep = isVertical ? 20 : 40;
    } else if (layout === 'center' || layout === 'lower') {
      baseX = W * 0.5;
      indentStep = 0;
    } else {
      // default: left layout
      baseX = isVertical ? W * 0.06 : W * 0.08;
      indentStep = isVertical ? 20 : 40;
    }

    lines.forEach((line, idx) => {
      const lineStart = line.start !== undefined ? line.start : stanza.start + (idx / lines.length) * stanzaDuration;
      const lineEnd = line.end !== undefined ? line.end : stanza.start + ((idx + 1) / lines.length) * stanzaDuration;

      // If line hasn't started yet, skip
      if (time < lineStart) return;

      // Cascade Staggered Exit (dòng trên bay trước, dòng dưới bay sau)
      let lineExitAlpha = 1.0;
      let lineExitOffsetY = 0;
      if (time > stanza.end) {
        const lineExitDelay = idx * 0.08;
        const lineExitStart = stanza.end + lineExitDelay;
        if (time > lineExitStart) {
          const lineExitProg = Math.min(1, Math.max(0, (time - lineExitStart) / 0.45));
          const exitEase = lineExitProg * lineExitProg * (3 - 2 * lineExitProg); // Hermite smoothstep
          lineExitAlpha = Math.max(0, 1 - exitEase);
          lineExitOffsetY = -exitEase * 14;
        }
      }

      if (lineExitAlpha <= 0.001) return;

      const lineDur = Math.max(0.3, lineEnd - lineStart);
      const lineProgress = Math.max(0, Math.min(1, (time - lineStart) / lineDur));
      const isCurrent = time >= lineStart && time <= lineEnd;

      // Staircase indent offset
      const indentOffset = (line.indent !== undefined ? line.indent : idx) * indentStep;
      const posX = baseX + indentOffset;
      const posY = baseY + (idx * lineSpacing) + lineExitOffsetY;

      // Completed lines dim slightly to focus on the active singing line
      const lineFocusAlpha = isCurrent ? 1.0 : (isOutgoing ? 0.6 : 0.84);

      ctx.save();
      ctx.globalAlpha = lineExitAlpha * lineFocusAlpha;

      // Delegate line styling and word-by-word reveal to template definition with layout
      this.currentTemplate.drawLyricLine(ctx, line, posX, posY, W, H, time, lineProgress, isCurrent, layout);

      ctx.restore();
    });
  }

  // === 35MM CINEMATIC FILM GRAIN TEXTURE ===
  drawCinematicGrain(W, H) {
    if (!this.noiseCanvas) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = 0.14; // soft and subtle
    const pat = ctx.createPattern(this.noiseCanvas, 'repeat');
    ctx.fillStyle = pat;
    // Jitter grain position each frame for authentic flickering film grain
    ctx.translate(Math.random() * 128, Math.random() * 128);
    ctx.fillRect(-128, -128, W + 256, H + 256);
    ctx.restore();
  }

  // === MAIN 60FPS FRAME RENDER METHOD ===
  renderFrame(time) {
    this.updateAudioEnergy();
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;

    // Active stanza lookup (prioritizes incoming stanza)
    const activeStanza = this.getActiveStanza(time);

    // 1. Clear background
    ctx.clearRect(0, 0, W, H);

    // 2. Draw Slideshow Image with Ken Burns / Parallax Slices
    this.drawSlideshowImage(time);

    // 3. Draw Template Background & Lighting Filters with layout awareness
    this.currentTemplate.drawBackgroundEffects(ctx, W, H, time, this.beatEnergy, activeStanza);

    // 4. Render Ambient Particles
    this.renderParticles();

    // 5. Draw Badges / Ribbons / Overlays
    this.currentTemplate.drawOverlayBadges(ctx, W, H, time, null, this.images[0]);

    // 6. Draw Synchronized Kinetic Lyrics (Word-by-Word)
    this.drawLyrics(time);

    // 7. Subtle 35mm Cinematic Film Grain Layer
    this.drawCinematicGrain(W, H);
  }

  cubicBezier(p0, p1, p2, p3) {
    return function(t) {
      const u = 1 - t;
      return 3 * u * u * t * p0 + 3 * u * t * t * p2 + t * t * t;
    };
  }
}

window.LyricEngine = LyricEngine;
