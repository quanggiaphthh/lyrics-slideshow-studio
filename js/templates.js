/**
 * LYRICSTUDIO PRO - TEMPLATE DEFINITIONS & GRAPHIC MOTION RULES
 * 5 distinct production-grade styles with TRUE WORD-BY-WORD kinetic typography.
 */

window.LYRIC_TEMPLATES = {
  // =========================================================================
  // 1. FINNXIII SHARP EDITORIAL (AUTHENTIC RECREATION OF "PHÍA SAU MỘT CÔ GÁI")
  // =========================================================================
  finnxiii: {
    id: 'finnxiii',
    name: 'FinnXIII Sharp',
    accentColor: '#de708b',
    glowColor: 'rgba(222, 112, 139, 0.5)',
    fontFamily: "'Montserrat', sans-serif",
    particleType: 'dust',

    drawBackgroundEffects: (ctx, width, height, time, beatEnergy) => {
      // 1. Dedicated soft typography scrim behind the text zone (left side)
      const scrimGrad = ctx.createLinearGradient(0, 0, width * 0.72, 0);
      scrimGrad.addColorStop(0, 'rgba(8, 10, 16, 0.62)');
      scrimGrad.addColorStop(0.35, 'rgba(8, 10, 16, 0.44)');
      scrimGrad.addColorStop(0.65, 'rgba(8, 10, 16, 0.16)');
      scrimGrad.addColorStop(1, 'rgba(8, 10, 16, 0)');
      ctx.fillStyle = scrimGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Atmospheric high-key radial vignette
      const grad = ctx.createRadialGradient(width * 0.38, height * 0.5, width * 0.15, width * 0.5, height * 0.5, width * 0.78);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.48)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle warm light leak wash in top right corner
      const lightGrad = ctx.createLinearGradient(width * 0.6, 0, width, height * 0.4);
      lightGrad.addColorStop(0, 'rgba(255, 245, 240, 0.07)');
      lightGrad.addColorStop(1, 'rgba(255, 245, 240, 0)');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);
    },

    drawOverlayBadges: (ctx, width, height, time, currentStanza, currentImage) => {
      // --- INTRO PARALLAX DIAGONAL SLICES (0s - 7.5s) ---
      if (time < 7.5) {
        ctx.save();
        const introExit = time > 6.0 ? (time - 6.0) / 1.5 : 0;
        const panelAlpha = Math.max(0, 1 - introExit);
        ctx.globalAlpha = panelAlpha;

        const sliceAngle = -0.32; // ~ -18.5 degrees
        const sliceX1 = width * 0.32;
        const sliceX2 = width * 0.68;

        // Draw diagonal separator lines with subtle glow
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(sliceX1 + height * Math.tan(sliceAngle) * 0.5, 0);
        ctx.lineTo(sliceX1 - height * Math.tan(sliceAngle) * 0.5, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(sliceX2 + height * Math.tan(sliceAngle) * 0.5, 0);
        ctx.lineTo(sliceX2 - height * Math.tan(sliceAngle) * 0.5, height);
        ctx.stroke();
        ctx.restore();

        // --- AUTHENTIC VERTICAL TITLE CARD: "PHÍA SAU MỘT CÔ GÁI" ---
        const cardW = width * 0.095;
        const cardH = height * 0.34;
        const cardX = width * 0.72;
        const cardY = height * 0.42;

        ctx.save();
        ctx.fillStyle = '#de708b';
        ctx.shadowColor = 'rgba(222, 112, 139, 0.55)';
        ctx.shadowBlur = 24;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;

        const cardLines = [
          { text: 'P H Í A', size: 14, weight: '700' },
          { text: 'S A U', size: 14, weight: '700' },
          { text: 'M Ộ T', size: 14, weight: '700' },
          { text: '- C Ô', size: 13, weight: '600' },
          { text: 'G Á I', size: 17, weight: '900' }
        ];

        const lineStep = cardH / (cardLines.length + 0.8);
        cardLines.forEach((item, idx) => {
          ctx.font = `${item.weight} ${item.size}px "Montserrat", sans-serif`;
          ctx.fillText(item.text, cardX + cardW / 2, cardY + 28 + idx * lineStep);
        });
        ctx.restore();

        // --- AUTHENTIC 3D ORIGAMI RIBBON "OFFICIAL" (BOTTOM LEFT) ---
        ctx.save();
        const ribX = width * 0.06;
        const ribY = height * 0.82;
        const ribW = 165;
        const ribH = 38;

        // Dark folded triangle flap
        ctx.fillStyle = '#5c1225';
        ctx.beginPath();
        ctx.moveTo(ribX, ribY + ribH);
        ctx.lineTo(ribX - 16, ribY + ribH);
        ctx.lineTo(ribX, ribY + ribH + 16);
        ctx.closePath();
        ctx.fill();

        // Skewed ribbon body
        ctx.save();
        ctx.transform(1, 0, -0.28, 1, ribX, ribY);
        const ribGrad = ctx.createLinearGradient(0, 0, ribW, 0);
        ribGrad.addColorStop(0, '#eaf2ee');
        ribGrad.addColorStop(0.35, '#f07b96');
        ribGrad.addColorStop(0.85, '#de708b');
        ribGrad.addColorStop(1, '#94223d');
        ctx.fillStyle = ribGrad;
        ctx.shadowColor = 'rgba(0,0,0,0.45)';
        ctx.shadowBlur = 12;
        ctx.fillRect(0, 0, ribW, ribH);
        ctx.restore();

        ctx.font = 'italic 900 19px "Montserrat", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 6;
        ctx.fillText('OFFICIAL', ribX + 32, ribY + 26);
        ctx.restore();

        // Top Single Meta Text
        ctx.save();
        ctx.font = '700 12px "Montserrat", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.letterSpacing = '0.2em';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 8;
        ctx.fillText('SOOBIN HOÀNG SƠN  •  NEW SINGLE  •  1989s PRODUCTION', width * 0.08, height * 0.12);
        ctx.restore();

        ctx.restore();
      }

      if (time >= 7.5) {
        ctx.save();
        ctx.font = '600 11px "Montserrat", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillText('FINNXIII  |  1989s PRODUCTION', width * 0.08, height * 0.94);
        ctx.restore();
      }
    },

    // --- TRUE WORD-BY-WORD KINETIC TYPOGRAPHY (AUTHENTIC FINNXIII EDITORIAL) ---
    drawLyricLine: (ctx, line, x, y, width, height, time, lineProgress, isCurrent) => {
      ctx.save();

      const baseFontSize = Math.round(height * 0.040); // Compact, elegant ~29px on 720p
      const words = line.words || autoSplitLineWords(line.text, line.start, line.end);

      // Pre-calculate word metrics and highlight groups
      let curX = x;
      const measuredWords = words.map((w) => {
        const cleanWord = w.text.replace(/[.,!?;:…"']/g, '');
        const isUpperKey = w.isUpperKey !== undefined ? w.isUpperKey : (cleanWord === cleanWord.toUpperCase() && cleanWord.length > 1);
        const isHighlight = w.isHighlight !== undefined ? w.isHighlight : [
          'EM', 'ANH', 'CÔ GÁI', 'CÔ', 'GÁI', 'NGUỒN SỐNG', 'NGUỒN', 'SỐNG',
          'LÙI BƯỚC', 'LÙI', 'BƯỚC', 'GIỌT LỆ NÀO', 'GIỌT', 'LỆ', 'NÀO',
          'NÓI RA', 'NÓI', 'RA', 'ĐÔI MẮT', 'ĐÔI', 'MẮT', 'HẾT', 'TẤT', 'CẢ',
          'NẮM TAY', 'NẮM', 'TAY', 'mắt', 'đôi'
        ].includes(cleanWord);

        const wordFontSize = isUpperKey ? Math.round(baseFontSize * 1.30) : baseFontSize;
        const fontWeight = isUpperKey ? '900' : '600';
        ctx.font = `${fontWeight} ${wordFontSize}px "Montserrat", sans-serif`;

        const wordW = ctx.measureText(w.text).width;
        const padX = isUpperKey ? 9 : 8;
        const padY = 5;

        const res = {
          raw: w,
          text: w.text,
          start: w.start,
          end: w.end || (w.start + 0.6),
          isUpperKey,
          isHighlight,
          wordFontSize,
          fontWeight,
          wordW,
          padX,
          padY,
          x: curX
        };

        const spacing = isHighlight ? 10 : (isUpperKey ? 13 : 9);
        curX += wordW + spacing;
        return res;
      });

      // Find continuous runs of isHighlight words to draw unified, seamless highlight boxes
      const highlightGroups = [];
      let currentGroup = null;

      measuredWords.forEach((mw) => {
        if (mw.isHighlight) {
          if (!currentGroup) {
            currentGroup = {
              words: [mw],
              startX: mw.x - mw.padX,
              endX: mw.x + mw.wordW + mw.padX,
              startTime: mw.start,
              endTime: mw.end,
              fontSize: mw.wordFontSize,
              padY: mw.padY
            };
          } else {
            currentGroup.words.push(mw);
            currentGroup.endX = mw.x + mw.wordW + mw.padX;
            currentGroup.endTime = Math.max(currentGroup.endTime, mw.end);
            currentGroup.fontSize = Math.max(currentGroup.fontSize, mw.wordFontSize);
          }
        } else {
          if (currentGroup) {
            highlightGroups.push(currentGroup);
            currentGroup = null;
          }
        }
      });
      if (currentGroup) highlightGroups.push(currentGroup);

      // --- 1. DRAW UNIFIED DUSTY ROSE HIGHLIGHTER BOXES ---
      highlightGroups.forEach(grp => {
        if (time >= grp.startTime) {
          const grpAge = time - grp.startTime;
          const boxDur = 0.38; // Smooth 380ms wipe
          const boxProg = Math.min(1, Math.max(0, grpAge / boxDur));
          // Ultra-smooth cubic deceleration wipe:
          const boxEase = 1 - Math.pow(1 - boxProg, 3);

          const fullW = grp.endX - grp.startX;
          const curW = fullW * boxEase;

          // Gentle vertical float lock
          const floatOffset = (1 - boxEase) * 8;
          const boxY = y - grp.fontSize * 0.86 + floatOffset;
          const boxH = grp.fontSize + grp.padY * 2;

          const isVoicing = time >= grp.startTime && time <= grp.endTime;

          ctx.save();
          // Soft alpha fade for the box
          const boxAlpha = Math.min(1, grpAge / 0.18);
          ctx.globalAlpha = ctx.globalAlpha * boxAlpha;

          if (isVoicing) {
            ctx.shadowColor = 'rgba(222, 112, 139, 0.80)';
            ctx.shadowBlur = 22;
          } else {
            ctx.shadowColor = 'rgba(222, 112, 139, 0.40)';
            ctx.shadowBlur = 12;
          }

          ctx.fillStyle = '#de708b'; // Authentic Dusty Rose
          ctx.fillRect(grp.startX, boxY, curW, boxH);
          ctx.restore();
        }
      });

      // --- 2. DRAW SOFT KINETIC WORDS ---
      measuredWords.forEach((mw) => {
        if (time >= mw.start) {
          const wAge = time - mw.start;
          const isVoicing = time >= mw.start && time <= mw.end;

          // Soft, gentle deceleration entrance (440ms duration)
          const enterDur = 0.44;
          const normProg = Math.min(1, Math.max(0, wAge / enterDur));
          const enterEase = 1 - Math.pow(1 - normProg, 3.2);

          // Silky alpha ramp (220ms duration)
          const alphaProg = Math.min(1, Math.max(0, wAge / 0.22));
          const alphaFade = Math.pow(alphaProg, 1.35);

          // Gentle 9px float-up
          const floatY = (1 - enterEase) * 9;
          // Organic micro-drift while held on screen
          const holdDriftY = -Math.min(2.5, wAge * 0.22);
          const totalY = floatY + holdDriftY;

          ctx.save();
          ctx.globalAlpha = ctx.globalAlpha * alphaFade;

          ctx.font = `${mw.fontWeight} ${mw.wordFontSize}px "Montserrat", sans-serif`;

          if (mw.isHighlight) {
            // Text inside dusty-rose box: crisp pure white with soft drop-shadow
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 1;
          } else if (mw.isUpperKey) {
            // Uppercase key words (e.g. RÕ HƠN, LẤP, LÁNH, NÓI RA, ANH TA)
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = isVoicing ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.90)';
            ctx.shadowBlur = isVoicing ? 16 : 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 1.5;
          } else {
            // Regular lyric word
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = isVoicing ? 'rgba(255, 255, 255, 0.70)' : 'rgba(0, 0, 0, 0.85)';
            ctx.shadowBlur = isVoicing ? 14 : 9;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 1.2;
          }

          ctx.fillText(mw.text, mw.x, y + totalY);
          ctx.restore();
        }
      });

      ctx.restore();
    }
  },

  // =========================================================================
  // 2. LOFI CHILL & VINYL DREAM
  // =========================================================================
  lofi: {
    id: 'lofi',
    name: 'Lofi Vinyl',
    accentColor: '#f9a8d4',
    glowColor: 'rgba(249, 168, 212, 0.4)',
    fontFamily: "'Space Grotesk', monospace",
    particleType: 'stars',

    drawBackgroundEffects: (ctx, width, height, time, beatEnergy) => {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, 'rgba(76, 29, 149, 0.25)');
      grad.addColorStop(1, 'rgba(244, 114, 182, 0.22)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    },

    drawOverlayBadges: (ctx, width, height, time, currentStanza) => {
      ctx.save();
      const vinylX = width * 0.86;
      const vinylY = height * 0.22;
      const vinylR = Math.min(width, height) * 0.12;

      ctx.translate(vinylX, vinylY);
      ctx.rotate(time * 0.75);

      ctx.beginPath();
      ctx.arc(0, 0, vinylR, 0, Math.PI * 2);
      ctx.fillStyle = '#111216';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 18;
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      for (let r = vinylR * 0.45; r < vinylR * 0.95; r += 5) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(0, 0, vinylR * 0.38, 0, Math.PI * 2);
      ctx.fillStyle = '#f472b6';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, vinylR * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = '#090a0f';
      ctx.fill();
      ctx.restore();
    },

    drawLyricLine: (ctx, line, x, y, width, height, time, lineProgress, isCurrent) => {
      ctx.save();
      const fontSize = Math.round(height * 0.042);
      ctx.font = `600 ${fontSize}px "Space Grotesk", sans-serif`;

      const words = line.words || autoSplitLineWords(line.text, line.start, line.end);
      let currentX = x;

      words.forEach((w) => {
        const wordW = ctx.measureText(w.text).width;
        const pillPadX = 12;
        const pillPadY = 8;
        const pillH = fontSize + pillPadY;
        const pillW = wordW + pillPadX * 2;

        if (time >= w.start) {
          const wAge = time - w.start;
          const pop = Math.min(1, wAge / 0.22);
          const ease = 1 - Math.pow(1 - pop, 3) + Math.sin(pop * Math.PI) * 0.05 * (1 - pop);
          const alphaRamp = Math.min(1, wAge / 0.06);
          const offsetY = (1 - ease) * 12;
          const driftY = -Math.min(1.8, wAge * 0.25);
          const totalY = offsetY + driftY;

          ctx.save();
          ctx.globalAlpha = ctx.globalAlpha * alphaRamp;

          const isVoicing = wAge < Math.max(0.3, (w.end || (w.start + 0.6)) - w.start);

          // Capsule pill behind word
          ctx.fillStyle = isVoicing ? 'rgba(244, 114, 182, 0.40)' : 'rgba(15, 18, 28, 0.50)';
          ctx.strokeStyle = isVoicing ? '#f472b6' : 'rgba(255,255,255,0.18)';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = isVoicing ? 'rgba(244, 114, 182, 0.6)' : 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = isVoicing ? 16 : 6;

          ctx.beginPath();
          ctx.roundRect(currentX - pillPadX, y - fontSize + 2 + totalY, pillW, pillH, pillH / 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(0,0,0,0.8)';
          ctx.shadowBlur = 8;
          ctx.fillText(w.text, currentX, y + totalY);
          ctx.restore();
        }

        currentX += wordW + 16;
      });

      ctx.restore();
    }
  },

  // =========================================================================
  // 3. NEON CYBERPUNK SPECTRUM
  // =========================================================================
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyber Wave',
    accentColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.6)',
    fontFamily: "'Space Grotesk', monospace",
    particleType: 'neon',

    drawBackgroundEffects: (ctx, width, height, time, beatEnergy) => {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(8, 10, 24, 0.55)');
      grad.addColorStop(1, 'rgba(22, 5, 32, 0.7)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      if (beatEnergy > 0.65) {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.fillRect(0, Math.random() * height, width, 14);
      }
    },

    drawOverlayBadges: (ctx, width, height, time, currentStanza) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(30, 50); ctx.lineTo(30, 30); ctx.lineTo(50, 30);
      ctx.moveTo(width - 30, height - 50); ctx.lineTo(width - 30, height - 30); ctx.lineTo(width - 50, height - 30);
      ctx.stroke();

      ctx.font = '700 11px "Space Grotesk", monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.fillText('REC [60 FPS] • CYBER_AUDIO_V2', 60, 35);
      ctx.restore();
    },

    drawLyricLine: (ctx, line, x, y, width, height, time, lineProgress, isCurrent) => {
      ctx.save();
      const fontSize = Math.round(height * 0.046);
      ctx.font = `700 ${fontSize}px "Space Grotesk", monospace`;

      const words = line.words || autoSplitLineWords(line.text, line.start, line.end);
      let currentX = x;

      words.forEach((w) => {
        const wordText = w.text.toUpperCase();
        const wordW = ctx.measureText(wordText).width;

        if (time >= w.start) {
          const wAge = time - w.start;
          const pop = Math.min(1, wAge / 0.20);
          const ease = 1 - Math.pow(1 - pop, 3);
          const alphaRamp = Math.min(1, wAge / 0.05);
          const offsetY = (1 - ease) * 12;

          ctx.save();
          ctx.globalAlpha = ctx.globalAlpha * alphaRamp;

          const isVoicing = wAge < Math.max(0.25, (w.end || (w.start + 0.6)) - w.start);

          if (wAge < 0.22) {
            // Intense initial chromatic aberration glitch punch
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 24;
            ctx.fillStyle = '#00f0ff';
            ctx.fillText(wordText, currentX + 2, y + offsetY);

            ctx.shadowColor = '#ff0077';
            ctx.shadowBlur = 14;
            ctx.fillStyle = '#ff0077';
            ctx.fillText(wordText, currentX - 2, y + offsetY);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(wordText, currentX, y + offsetY);
          } else if (isVoicing) {
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#00f0ff';
            ctx.fillText(wordText, currentX, y + offsetY);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(wordText, currentX, y + offsetY);
          } else {
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(wordText, currentX, y + offsetY);
          }
          ctx.restore();
        }

        currentX += wordW + 12;
      });

      ctx.restore();
    }
  },

  // =========================================================================
  // 4. VINTAGE 1980s CINEMA
  // =========================================================================
  vintage: {
    id: 'vintage',
    name: 'Vintage 1980s',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    fontFamily: "'Playfair Display', Georgia, serif",
    particleType: 'grain',

    drawBackgroundEffects: (ctx, width, height, time, beatEnergy) => {
      ctx.fillStyle = 'rgba(255, 170, 70, 0.12)';
      ctx.fillRect(0, 0, width, height);

      const barH = height * 0.07;
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, barH);
      ctx.fillRect(0, height - barH, width, barH);
    },

    drawOverlayBadges: (ctx, width, height, time, currentStanza) => {
      ctx.save();
      ctx.font = '400 12px "Space Grotesk", monospace';
      ctx.fillStyle = 'rgba(255, 220, 150, 0.75)';
      ctx.fillText('1989 ARCHIVE • 35MM FILM • SOUND TRACK', width * 0.08, height * 0.05);
      ctx.restore();
    },

    drawLyricLine: (ctx, line, x, y, width, height, time, lineProgress, isCurrent) => {
      ctx.save();
      const fontSize = Math.round(height * 0.044);
      ctx.font = `italic 600 ${fontSize}px "Playfair Display", serif`;

      const words = line.words || autoSplitLineWords(line.text, line.start, line.end);
      let currentX = x;

      words.forEach((w) => {
        const wordW = ctx.measureText(w.text).width;

        if (time >= w.start) {
          const wAge = time - w.start;
          const pop = Math.min(1, wAge / 0.24);
          const ease = 1 - Math.pow(1 - pop, 3);
          const alphaRamp = Math.min(1, wAge / 0.06);
          const offsetY = (1 - ease) * 12;

          ctx.save();
          ctx.globalAlpha = ctx.globalAlpha * alphaRamp;
          ctx.shadowColor = 'rgba(0,0,0,0.85)';
          ctx.shadowBlur = 10;
          ctx.fillStyle = (wAge < 0.6) ? '#ffffff' : '#fff8e7';
          ctx.fillText(w.text, currentX, y + offsetY);
          ctx.restore();
        }

        currentX += wordW + 12;
      });

      ctx.restore();
    }
  },

  // =========================================================================
  // 5. KARAOKE POP GLOW
  // =========================================================================
  karaoke: {
    id: 'karaoke',
    name: 'Karaoke Pop',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    fontFamily: "'Montserrat', sans-serif",
    particleType: 'pop',

    drawBackgroundEffects: (ctx, width, height, time, beatEnergy) => {
      const grad = ctx.createRadialGradient(width/2, height/2, width*0.1, width/2, height/2, width*0.6);
      grad.addColorStop(0, 'rgba(147, 51, 234, 0.16)');
      grad.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    },

    drawOverlayBadges: (ctx, width, height, time, currentStanza) => {
      ctx.save();
      const noteX = width * 0.9;
      const noteY = height * 0.15 + Math.sin(time * 3) * 6;
      ctx.font = '24px "Montserrat", sans-serif';
      ctx.fillStyle = '#a855f7';
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 14;
      ctx.fillText('♪', noteX, noteY);
      ctx.restore();
    },

    drawLyricLine: (ctx, line, x, y, width, height, time, lineProgress, isCurrent) => {
      ctx.save();
      const fontSize = Math.round(height * 0.048);
      ctx.font = `800 ${fontSize}px "Montserrat", sans-serif`;

      const words = line.words || autoSplitLineWords(line.text, line.start, line.end);
      let currentX = x;

      words.forEach((w) => {
        const wordW = ctx.measureText(w.text).width;

        // Base dimmed text
        ctx.shadowColor = 'rgba(0,0,0,0.85)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(255,255,255,0.40)';
        ctx.fillText(w.text, currentX, y);

        // Word-by-word karaoke progressive gradient fill
        if (time >= w.start) {
          const wDur = Math.max(0.2, (w.end || (w.start + 0.6)) - w.start);
          const wProg = Math.min(1, Math.max(0, (time - w.start) / wDur));
          const easeProg = 1 - Math.pow(1 - wProg, 2.2);

          ctx.save();
          ctx.beginPath();
          ctx.rect(currentX - 2, y - fontSize, (wordW + 4) * easeProg, fontSize + 12);
          ctx.clip();

          const grad = ctx.createLinearGradient(currentX, 0, currentX + wordW, 0);
          grad.addColorStop(0, '#f43f5e');
          grad.addColorStop(0.5, '#a855f7');
          grad.addColorStop(1, '#06b6d4');

          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 18;
          ctx.fillStyle = grad;
          ctx.fillText(w.text, currentX, y);
          ctx.restore();
        }

        currentX += wordW + 12;
      });

      ctx.restore();
    }
  }
};

/**
 * Auto-split line into micro-timed words with rhythmic distribution
 */
function autoSplitLineWords(lineText, lineStart, lineEnd) {
  const rawWords = lineText.split(/\s+/).filter(w => w.length > 0);
  const total = rawWords.length;
  if (total === 0) return [];

  const lineDur = Math.max(0.6, lineEnd - lineStart);
  const wordDur = (lineDur - 0.15) / total;

  return rawWords.map((word, idx) => {
    const cleanWord = word.replace(/[.,!?;:…"']/g, '');
    const isUpperKey = cleanWord === cleanWord.toUpperCase() && cleanWord.length > 1;
    const isHighlight = [
      'EM', 'ANH', 'CÔ GÁI', 'CÔ', 'GÁI', 'NGUỒN SỐNG', 'NGUỒN', 'SỐNG',
      'LÙI BƯỚC', 'LÙI', 'BƯỚC', 'GIỌT LỆ NÀO', 'GIỌT', 'LỆ', 'NÀO',
      'NÓI RA', 'NÓI', 'RA', 'ĐÔI MẮT', 'ĐÔI', 'MẮT', 'HẾT', 'TẤT', 'CẢ'
    ].includes(cleanWord);

    return {
      text: word,
      start: lineStart + (idx * wordDur),
      end: lineStart + ((idx + 1) * wordDur),
      isUpperKey: isUpperKey,
      isHighlight: isHighlight
    };
  });
}
