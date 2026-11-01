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

  importProjectFile(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.project) {
          callback(null, json.project);
        } else {
          callback(null, json);
        }
      } catch (err) {
        callback(err, null);
      }
    };
    reader.onerror = (err) => callback(err, null);
    reader.readAsText(file);
  }

  // === SANITIZATION HELPER ===
  sanitizeStateForStorage(state) {
    // Avoid saving massive raw binary blobs to localStorage
    const cleanImages = (state.images || []).map(img => {
      if (typeof img === 'string') return img;
      if (img.src && img.src.startsWith('data:') && img.src.length > 500000) {
        // Thumbnail or compressed representation
        return img.src.substring(0, 500000);
      }
      return img.src || '';
    });

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
