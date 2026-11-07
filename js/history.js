/**
 * LYRICSTUDIO PRO - PROJECT HISTORY & AUTO-SAVE MANAGER
 * Persistent snapshots, local storage drafts, undo/restore, and JSON export/import.
 */

class ProjectHistoryManager {
  constructor() {
    this.STORAGE_KEY_AUTOSAVE = 'LYRICSTUDIO_AUTOSAVE_V1';
    this.STORAGE_KEY_HISTORY = 'LYRICSTUDIO_HISTORY_LIST_V1';
    this.autoSaveTimer = null;
    this.onAutoSaveStatusChange = null;
  }

  // === AUTO-SAVE DRAFT (DEBOUNCED) ===
  queueAutoSave(projectState) {
    if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);

    if (this.onAutoSaveStatusChange) {
      this.onAutoSaveStatusChange('saving', 'Đang lưu tự động...');
    }

    this.autoSaveTimer = setTimeout(() => {
      this.saveAutoSave(projectState);
    }, 1500);
  }

  saveAutoSave(projectState) {
    try {
      const payload = {
        updatedAt: Date.now(),
        state: this.sanitizeStateForStorage(projectState)
      };
      localStorage.setItem(this.STORAGE_KEY_AUTOSAVE, JSON.stringify(payload));
      
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      if (this.onAutoSaveStatusChange) {
        this.onAutoSaveStatusChange('saved', `Đã tự động lưu lúc ${timeStr}`);
      }
    } catch (e) {
      console.warn('Auto-save failed (storage limit or private browsing):', e);
      if (this.onAutoSaveStatusChange) {
        this.onAutoSaveStatusChange('error', 'Không thể lưu bản nháp vào bộ nhớ duyệt web');
      }
    }
  }

  getAutoSave() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_AUTOSAVE);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  // === MANUAL / NAMED SNAPSHOTS HISTORY ===
  saveSnapshot(name, projectState, thumbnailDataUrl = null) {
    try {
      const history = this.getHistory();
      const now = new Date();
      const timeFormatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const newSnapshot = {
        id: `snap_${Date.now()}`,
        name: name || `Bản nháp (${timeFormatted})`,
        timestamp: Date.now(),
        formattedTime: timeFormatted,
        thumbnail: thumbnailDataUrl || '',
        template: projectState.template || 'finnxiii',
        aspectRatio: projectState.aspectRatio || '16-9',
        audioName: projectState.audioName || 'Chưa có bài hát',
        state: this.sanitizeStateForStorage(projectState)
      };

      // Keep up to 25 latest snapshots
      history.unshift(newSnapshot);
      if (history.length > 25) history.pop();

      localStorage.setItem(this.STORAGE_KEY_HISTORY, JSON.stringify(history));
      return newSnapshot;
    } catch (e) {
      console.error('Failed to save snapshot:', e);
      alert('Bộ nhớ trình duyệt đã đầy. Vui lòng xóa bớt các bản nháp cũ trong lịch sử!');
      return null;
    }
  }

  getHistory() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_HISTORY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  deleteSnapshot(id) {
    try {
      let history = this.getHistory();
      history = history.filter(item => item.id !== id);
      localStorage.setItem(this.STORAGE_KEY_HISTORY, JSON.stringify(history));
      return history;
    } catch (e) {
      return [];
    }
  }

  clearAllHistory() {
    localStorage.removeItem(this.STORAGE_KEY_HISTORY);
  }

  // === EXPORT / IMPORT PROJECT AS JSON FILE ===
  exportProjectFile(projectState, filename = null) {
    const safeData = this.sanitizeStateForStorage(projectState);
    const exportObject = {
      app: 'LyricStudio Pro',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      project: safeData
    };

    const jsonStr = JSON.stringify(exportObject, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const fname = filename || `lyric_project_${safeData.template || 'video'}_${Date.now()}.lyricproj`;

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fname;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }, 2000);
  }

  // === VALIDATION & SCHEMA VERIFICATION (SEC-02 & DATA-02) ===
  validateProjectSchema(data) {
    if (!data || typeof data !== 'object') {
      return { valid: false, error: 'Project data must be a valid JSON object' };
    }

    // Unpack project if nested
    const proj = data.project ? data.project : data;

    // Validate images
    const safeImages = [];
    if (Array.isArray(proj.images)) {
      if (proj.images.length > 100) {
        return { valid: false, error: 'Maximum 100 images allowed per project' };
      }
      for (const img of proj.images) {
        const url = (typeof img === 'string') ? img : (img && img.src ? img.src : '');
        if (typeof url === 'string') {
          const trimmed = url.trim();
          // Disallow javascript: or executable protocols
          if (
            trimmed.startsWith('javascript:') ||
            trimmed.startsWith('vbscript:') ||
            trimmed.startsWith('data:text/html')
          ) {
            continue; // skip dangerous protocols
          }
          if (trimmed.length > 0) safeImages.push(trimmed);
        }
      }
    }

    // Validate stanzas
    const safeStanzas = [];
    if (Array.isArray(proj.parsedStanzas)) {
      if (proj.parsedStanzas.length > 2000) {
        return { valid: false, error: 'Maximum 2000 lyric stanzas allowed per project' };
      }
      for (let i = 0; i < proj.parsedStanzas.length; i++) {
        const s = proj.parsedStanzas[i];
        if (!s || typeof s !== 'object') continue;
        const start = typeof s.start === 'number' && !isNaN(s.start) && s.start >= 0 ? s.start : 0;
        const end = typeof s.end === 'number' && !isNaN(s.end) && s.end >= start ? s.end : start + 3;
        const text = typeof s.text === 'string' ? s.text : '';
        const id = s.id ? String(s.id).replace(/[^\w-]/g, '') : `stanza_${i}`;

        // Validate lines if present
        const lines = [];
        if (Array.isArray(s.lines)) {
          for (const l of s.lines) {
            if (!l || typeof l !== 'object') continue;
            lines.push({
              text: typeof l.text === 'string' ? l.text : '',
              start: typeof l.start === 'number' ? l.start : start,
              end: typeof l.end === 'number' ? l.end : end,
              indent: typeof l.indent === 'number' ? l.indent : 0,
              words: Array.isArray(l.words) ? l.words : []
            });
          }
        }

        safeStanzas.push({
          id,
          start,
          end,
          text,
          layout: ['left', 'right', 'center', 'lower'].includes(s.layout) ? s.layout : 'left',
          lines: lines.length > 0 ? lines : [{ text, start, end }]
        });
      }
    }

    const safeDuration = typeof proj.audioDuration === 'number' && proj.audioDuration > 0
      ? proj.audioDuration
      : (typeof proj.duration === 'number' && proj.duration > 0 ? proj.duration : 70.0);

    return {
      valid: true,
      project: {
        audioName: typeof proj.audioName === 'string' ? proj.audioName.slice(0, 200) : '',
        audioUrl: typeof proj.audioUrl === 'string' ? proj.audioUrl : '',
        audioDuration: safeDuration,
        duration: safeDuration,
        images: safeImages,
        template: ['finnxiii', 'lofi', 'cyberpunk', 'classic', 'pop'].includes(proj.template) ? proj.template : 'finnxiii',
        transition: ['kenburns', 'slide', 'zoom', 'diagonal'].includes(proj.transition) ? proj.transition : 'kenburns',
        aspectRatio: ['16-9', '9-16', '1-1'].includes(proj.aspectRatio) ? proj.aspectRatio : '16-9',
        lyricsRaw: typeof proj.lyricsRaw === 'string' ? proj.lyricsRaw : '',
        parsedStanzas: safeStanzas
      }
    };
  }

  importProjectFile(file, callback) {
    if (!file) {
      callback(new Error('No file selected'), null);
      return;
    }
    // Limit file size to 25MB
    if (file.size > 25 * 1024 * 1024) {
      callback(new Error('File quá lớn (vượt quá giới hạn an toàn 25MB)'), null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const rawJson = JSON.parse(e.target.result);
        const validation = this.validateProjectSchema(rawJson);
        if (!validation.valid) {
          callback(new Error(`Tệp dự án không hợp lệ: ${validation.error}`), null);
          return;
        }
        callback(null, validation.project);
      } catch (err) {
        callback(new Error(`Lỗi cú pháp JSON: ${err.message}`), null);
      }
    };
    reader.onerror = (err) => callback(err, null);
    reader.readAsText(file);
  }

  // === SANITIZATION HELPER ===
  sanitizeStateForStorage(state) {
    // Retain clean images without corrupting base64 via substring
    const cleanImages = (state.images || []).map(img => {
      if (typeof img === 'string') {
        // Skip excessively large inline base64 if over 1.5MB to protect localStorage quota
        if (img.startsWith('data:') && img.length > 1500000) {
          console.warn('Image data URI exceeds 1.5MB, skipped from localStorage draft.');
          return '';
        }
        return img;
      }
      if (img && img.src) {
        if (typeof img.src === 'string' && img.src.startsWith('data:') && img.src.length > 1500000) {
          return '';
        }
        return img.src || '';
      }
      return '';
    }).filter(Boolean);

    return {
      audioName: state.audioName || '',
      audioUrl: state.audioUrl || '',
      audioDuration: state.audioDuration || 60,
      images: cleanImages,
      template: state.template || 'finnxiii',
      transition: state.transition || 'kenburns',
      aspectRatio: state.aspectRatio || '16-9',
      lyricsRaw: state.lyricsRaw || '',
      parsedStanzas: state.parsedStanzas || []
    };
  }
}

window.ProjectHistoryManager = ProjectHistoryManager;
