/**
 * LYRICSTUDIO PRO - APPLICATION CONTROLLER & UI BINDINGS
 * With TRUE WORD-BY-WORD lyric synchronization matching the reference video.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const canvas = document.getElementById('renderCanvas');
  const coreAudio = document.getElementById('coreAudio');
  const stageWrapper = document.getElementById('stageWrapper');
  const stagePlayOverlay = document.getElementById('stagePlayOverlay');
  const btnBigPlay = document.getElementById('btnBigPlay');

  // Controls
  const btnPlayPause = document.getElementById('btnPlayPause');
  const ctrlPlayIcon = document.getElementById('ctrlPlayIcon');
  const ctrlPauseIcon = document.getElementById('ctrlPauseIcon');
  const btnRestart = document.getElementById('btnRestart');
  const btnMuteToggle = document.getElementById('btnMuteToggle');
  const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');
  const btnStartExport = document.getElementById('btnStartExport');
  const btnQuickExport = document.getElementById('btnQuickExport');

  // Timeline
  const timelineTrackWrap = document.getElementById('timelineTrackWrap');
  const timelineFill = document.getElementById('timelineFill');
  const timelineThumb = document.getElementById('timelineThumb');
  const timelineDots = document.getElementById('timelineDots');
  const labelCurrentTime = document.getElementById('labelCurrentTime');
  const labelTotalTime = document.getElementById('labelTotalTime');
  const lyricLiveTicker = document.getElementById('lyricLiveTicker');
  const liveWaveBars = document.querySelectorAll('#liveWave span');

  // Media inputs & dropzones
  const audioDropzone = document.getElementById('audioDropzone');
  const audioFileInput = document.getElementById('audioFileInput');
  const audioNameDisplay = document.getElementById('audioNameDisplay');
  const audioDurationDisplay = document.getElementById('audioDurationDisplay');
  const btnReplaceAudio = document.getElementById('btnReplaceAudio');
  const chipSampleGanhHao = document.getElementById('chipSampleGanhHao');
  const chipSample1 = document.getElementById('chipSample1');
  const chipSample2 = document.getElementById('chipSample2');
  const btnLoadDemoGanhHao = document.getElementById('btnLoadDemoGanhHao');
  const btnLoadDemo1 = document.getElementById('btnLoadDemo1');
  const btnLoadDemo2 = document.getElementById('btnLoadDemo2');

  const imageDropzone = document.getElementById('imageDropzone');
  const imageFileInput = document.getElementById('imageFileInput');
  const imageThumbsGrid = document.getElementById('imageThumbsGrid');
  const selectTransition = document.getElementById('selectTransition');
  const btnAddGanhHaoPack = document.getElementById('btnAddGanhHaoPack');
  const btnAddPortraitPack = document.getElementById('btnAddPortraitPack');
  const btnAddSunsetPack = document.getElementById('btnAddSunsetPack');
  const btnAddCyberPack = document.getElementById('btnAddCyberPack');

  // Templates & Aspects
  const templateCards = document.querySelectorAll('.template-card');
  const aspectBtns = document.querySelectorAll('.aspect-btn');

  // Lyrics
  const rawLyricsInput = document.getElementById('rawLyricsInput');
  const btnAutoSyncLyrics = document.getElementById('btnAutoSyncLyrics');
  const lyricsSyncList = document.getElementById('lyricsSyncList');

  // Export Modal
  const exportModalBackdrop = document.getElementById('exportModalBackdrop');
  const exportProgressBarFill = document.getElementById('exportProgressBarFill');
  const exportProgressPct = document.getElementById('exportProgressPct');
  const exportTimeReadout = document.getElementById('exportTimeReadout');
  const btnCancelExport = document.getElementById('btnCancelExport');

  // History & Auto-Save Elements
  const autoSaveIndicator = document.getElementById('autoSaveIndicator');
  const autoSaveText = document.getElementById('autoSaveText');
  const btnOpenHistory = document.getElementById('btnOpenHistory');
  const historyCountBadge = document.getElementById('historyCountBadge');
  const btnSaveSnapshot = document.getElementById('btnSaveSnapshot');
  const historyModalBackdrop = document.getElementById('historyModalBackdrop');
  const btnCloseHistoryModal = document.getElementById('btnCloseHistoryModal');
  const historyListContainer = document.getElementById('historyListContainer');
  const btnHistoryNewProject = document.getElementById('btnHistoryNewProject');
  const btnImportProjectJson = document.getElementById('btnImportProjectJson');
  const importProjectJsonFileInput = document.getElementById('importProjectJsonFileInput');
  const btnClearHistory = document.getElementById('btnClearHistory');

  // Initialize Core Engines
  const engine = new LyricEngine(canvas);
  const exporter = new VideoExporter(engine, coreAudio);
  const historyManager = new ProjectHistoryManager();

  let isPlaying = false;
  let animId = null;
  let activeImageObjects = [];
  let currentProjectState = {
    audioName: '',
    audioUrl: '',
    audioDuration: 70.0,
    images: [],
    template: 'finnxiii',
    transition: 'kenburns',
    aspectRatio: '16-9',
    lyricsRaw: '',
    parsedStanzas: []
  };

  // === AUTHENTIC REFERENCE PRESET (FINNXIII "PHÍA SAU MỘT CÔ GÁI" WORD-BY-WORD) ===
  const DEMO_PRESET_1_WORDS_DATA = [
    {
      id: 'stanza_0',
      start: 8.2,
      end: 21.2,
      text: "nhiều khi ANH mong được một lần NÓI RA hết tất cả thay vì",
      indent: 0,
      lines: [
        {
          text: "nhiều khi ANH",
          start: 8.2,
          end: 11.4,
          indent: 0,
          words: [
            { text: "nhiều", start: 8.2, end: 8.7 },
            { text: "khi", start: 8.7, end: 9.3 },
            { text: "ANH", start: 9.3, end: 11.4, isUpperKey: true, isHighlight: true }
          ]
        },
        {
          text: "mong được một lần",
          start: 11.6,
          end: 14.0,
          indent: 1,
          words: [
            { text: "mong", start: 11.6, end: 12.2 },
            { text: "được", start: 12.2, end: 12.8 },
            { text: "một", start: 12.8, end: 13.4 },
            { text: "lần", start: 13.4, end: 14.0 }
          ]
        },
        {
          text: "NÓI RA",
          start: 14.1,
          end: 15.6,
          indent: 2,
          words: [
            { text: "NÓI", start: 14.1, end: 14.7, isUpperKey: true },
            { text: "RA", start: 14.7, end: 15.6, isUpperKey: true }
          ]
        },
        {
          text: "hết tất cả",
          start: 15.8,
          end: 18.2,
          indent: 3,
          words: [
            { text: "hết", start: 15.8, end: 16.3, isHighlight: true },
            { text: "tất", start: 16.3, end: 16.9, isHighlight: true },
            { text: "cả", start: 16.9, end: 18.0, isHighlight: true }
          ]
        },
        {
          text: "thay vì",
          start: 18.5,
          end: 21.0,
          indent: 4,
          words: [
            { text: "thay", start: 18.5, end: 19.3 },
            { text: "vì", start: 19.3, end: 21.0 }
          ]
        }
      ]
    },
    {
      id: 'stanza_1',
      start: 21.6,
      end: 31.4,
      text: "thay vì ngồi lặng im nghe EM kể về ANH TA bằng đôi mắt LẤP LÁNH",
      indent: 0,
      lines: [
        {
          text: "thay vì ngồi",
          start: 21.6,
          end: 23.6,
          indent: 0,
          words: [
            { text: "thay", start: 21.6, end: 22.1 },
            { text: "vì", start: 22.1, end: 22.6 },
            { text: "ngồi", start: 22.6, end: 23.5 }
          ]
        },
        {
          text: "lặng im nghe",
          start: 23.8,
          end: 25.2,
          indent: 1,
          words: [
            { text: "lặng", start: 23.8, end: 24.3 },
            { text: "im", start: 24.3, end: 24.8 },
            { text: "nghe", start: 24.8, end: 25.2 }
          ]
        },
        {
          text: "EM kể về ANH TA",
          start: 25.3,
          end: 27.5,
          indent: 2,
          words: [
            { text: "EM", start: 25.3, end: 25.8, isUpperKey: true },
            { text: "kể", start: 25.8, end: 26.2 },
            { text: "về", start: 26.2, end: 26.6 },
            { text: "ANH", start: 26.6, end: 27.0, isUpperKey: true },
            { text: "TA", start: 27.0, end: 27.5, isUpperKey: true }
          ]
        },
        {
          text: "bằng đôi mắt",
          start: 27.7,
          end: 29.6,
          indent: 3,
          words: [
            { text: "bằng", start: 27.7, end: 28.2 },
            { text: "đôi", start: 28.2, end: 28.8, isHighlight: true },
            { text: "mắt", start: 28.8, end: 29.6, isHighlight: true }
          ]
        },
        {
          text: "LẤP",
          start: 29.7,
          end: 30.3,
          indent: 4,
          words: [
            { text: "LẤP", start: 29.7, end: 30.3, isUpperKey: true }
          ]
        },
        {
          text: "LÁNH",
          start: 30.3,
          end: 31.4,
          indent: 4,
          words: [
            { text: "LÁNH", start: 30.3, end: 31.4, isUpperKey: true }
          ]
        }
      ]
    },
    {
      id: 'stanza_2',
      start: 31.8,
      end: 41.2,
      text: "đôi lúc EM tránh ÁNH MẮT của ANH, vì dường như lúc nào em cũng hiểu thấu lòng anh",
      indent: 0,
      lines: [
        {
          text: "đôi lúc EM",
          start: 31.8,
          end: 34.2,
          indent: 0,
          words: [
            { text: "đôi", start: 32.0, end: 32.4 },
            { text: "lúc", start: 32.4, end: 32.8 },
            { text: "EM", start: 32.8, end: 34.2, isUpperKey: true, isHighlight: true }
          ]
        },
        {
          text: "tránh ÁNH MẮT của ANH,",
          start: 34.2,
          end: 37.8,
          indent: 1,
          words: [
            { text: "tránh", start: 34.2, end: 34.7 },
            { text: "ÁNH", start: 34.7, end: 35.3, isUpperKey: true },
            { text: "MẮT", start: 35.3, end: 36.2, isUpperKey: true },
            { text: "của", start: 36.3, end: 36.7 },
            { text: "ANH,", start: 36.7, end: 37.8, isUpperKey: true }
          ]
        },
        {
          text: "vì dường như lúc nào",
          start: 38.0,
          end: 39.5,
          indent: 2,
          words: [
            { text: "vì", start: 38.0, end: 38.3 },
            { text: "dường", start: 38.3, end: 38.6 },
            { text: "như", start: 38.6, end: 38.9 },
            { text: "lúc", start: 38.9, end: 39.2 },
            { text: "nào", start: 39.2, end: 39.5 }
          ]
        },
        {
          text: "em cũng hiểu thấu lòng anh",
          start: 39.5,
          end: 41.2,
          indent: 3,
          words: [
            { text: "em", start: 39.6, end: 40.0 },
            { text: "cũng", start: 40.0, end: 40.3 },
            { text: "hiểu", start: 40.3, end: 40.6 },
            { text: "thấu", start: 40.6, end: 40.9 },
            { text: "lòng", start: 40.9, end: 41.1 },
            { text: "anh", start: 41.1, end: 41.4 }
          ]
        }
      ]
    },
    {
      id: 'stanza_3',
      start: 41.5,
      end: 49.8,
      text: "không thể NGẮT LỜI, càng không thể để GIỌT LỆ NÀO được rơi...",
      indent: 0,
      lines: [
        {
          text: "không thể",
          start: 41.5,
          end: 42.4,
          indent: 0,
          words: [
            { text: "không", start: 41.6, end: 42.1 },
            { text: "thể", start: 42.1, end: 42.4 }
          ]
        },
        {
          text: "NGẮT LỜI,",
          start: 42.5,
          end: 44.2,
          indent: 1,
          words: [
            { text: "NGẮT", start: 42.5, end: 43.1, isUpperKey: true },
            { text: "LỜI,", start: 43.1, end: 44.2, isUpperKey: true }
          ]
        },
        {
          text: "càng không thể để",
          start: 44.5,
          end: 46.1,
          indent: 2,
          words: [
            { text: "càng", start: 44.5, end: 44.9 },
            { text: "không", start: 44.9, end: 45.3 },
            { text: "thể", start: 45.3, end: 45.7 },
            { text: "để", start: 45.7, end: 46.1 }
          ]
        },
        {
          text: "GIỌT LỆ NÀO",
          start: 46.2,
          end: 48.0,
          indent: 3,
          words: [
            { text: "GIỌT", start: 46.2, end: 46.7, isUpperKey: true, isHighlight: true },
            { text: "LỆ", start: 46.7, end: 47.2, isUpperKey: true, isHighlight: true },
            { text: "NÀO", start: 47.2, end: 48.0, isUpperKey: true, isHighlight: true }
          ]
        },
        {
          text: "được rơi...",
          start: 48.1,
          end: 49.8,
          indent: 4,
          words: [
            { text: "được", start: 48.1, end: 48.6 },
            { text: "rơi...", start: 48.6, end: 49.8 }
          ]
        }
      ]
    },
    {
      id: 'stanza_4',
      start: 50.0,
      end: 59.3,
      text: "nên ANH lùi bước về sau, để thấy em RÕ HƠN",
      indent: 0,
      lines: [
        {
          text: "nên ANH",
          start: 50.0,
          end: 51.5,
          indent: 0,
          words: [
            { text: "nên", start: 50.1, end: 50.6 },
            { text: "ANH", start: 50.6, end: 51.5, isUpperKey: true, isHighlight: true }
          ]
        },
        {
          text: "lùi bước",
          start: 51.6,
          end: 53.5,
          indent: 1,
          words: [
            { text: "lùi", start: 51.6, end: 52.3 },
            { text: "bước", start: 52.3, end: 53.5 }
          ]
        },
        {
          text: "về sau",
          start: 53.6,
          end: 55.4,
          indent: 2,
          words: [
            { text: "về", start: 53.6, end: 54.1 },
            { text: "sau,", start: 54.1, end: 55.4 }
          ]
        },
        {
          text: "để thấy em",
          start: 55.8,
          end: 57.0,
          indent: 3,
          words: [
            { text: "để", start: 55.8, end: 56.2 },
            { text: "thấy", start: 56.2, end: 56.6 },
            { text: "em", start: 56.6, end: 57.0 }
          ]
        },
        {
          text: "RÕ HƠN",
          start: 57.1,
          end: 59.3,
          indent: 4,
          words: [
            { text: "RÕ", start: 57.1, end: 57.7, isUpperKey: true },
            { text: "HƠN", start: 57.7, end: 59.3, isUpperKey: true }
          ]
        }
      ]
    },
    {
      id: 'stanza_5',
      start: 59.4,
      end: 70.0,
      text: "để có thể ngắm em từ xa âu yếm hơn... CẢ NGUỒN SỐNG bỗng chốc thu bé lại vừa bằng một CÔ GÁI",
      indent: 0,
      lines: [
        {
          text: "để có thể ngắm",
          start: 59.4,
          end: 61.0,
          indent: 0,
          words: [
            { text: "để", start: 59.5, end: 59.8 },
            { text: "có", start: 59.8, end: 60.1 },
            { text: "thể", start: 60.1, end: 60.4 },
            { text: "ngắm", start: 60.4, end: 61.0 }
          ]
        },
        {
          text: "em từ xa âu yếm hơn",
          start: 61.1,
          end: 63.4,
          indent: 1,
          words: [
            { text: "em", start: 61.1, end: 61.4 },
            { text: "từ", start: 61.4, end: 61.8 },
            { text: "xa", start: 61.8, end: 62.1 },
            { text: "âu", start: 62.1, end: 62.5 },
            { text: "yếm", start: 62.5, end: 62.8 },
            { text: "hơn", start: 62.8, end: 63.4 }
          ]
        },
        {
          text: "CẢ NGUỒN SỐNG",
          start: 63.5,
          end: 65.4,
          indent: 2,
          words: [
            { text: "CẢ", start: 63.5, end: 64.0, isUpperKey: true },
            { text: "NGUỒN", start: 64.0, end: 64.5, isUpperKey: true },
            { text: "SỐNG", start: 64.5, end: 65.4, isUpperKey: true }
          ]
        },
        {
          text: "bỗng chốc thu bé lại",
          start: 65.5,
          end: 67.4,
          indent: 3,
          words: [
            { text: "bỗng", start: 65.5, end: 65.8 },
            { text: "chốc", start: 65.8, end: 66.2 },
            { text: "thu", start: 66.2, end: 66.6 },
            { text: "bé", start: 66.6, end: 67.0 },
            { text: "lại", start: 67.0, end: 67.4 }
          ]
        },
        {
          text: "vừa bằng một",
          start: 67.4,
          end: 68.6,
          indent: 4,
          words: [
            { text: "vừa", start: 67.4, end: 67.8 },
            { text: "bằng", start: 67.8, end: 68.2 },
            { text: "một", start: 68.2, end: 68.6 }
          ]
        },
        {
          text: "CÔ GÁI",
          start: 68.6,
          end: 70.0,
          indent: 4,
          words: [
            { text: "CÔ", start: 68.6, end: 69.1, isUpperKey: true, isHighlight: true },
            { text: "GÁI", start: 69.1, end: 70.0, isUpperKey: true, isHighlight: true }
          ]
        }
      ]
    }
  ];

  const DEMO_PRESET_1 = {
    audioUrl: 'assets/samples/audio.mp3',
    audioName: 'Phía Sau Một Cô Gái - Soobin Hoàng Sơn (Official Lyric Video)',
    duration: 70.0,
    images: [
      'assets/samples/hd_portrait.jpg',
      'assets/samples/bg_clean_720p.jpg',
      'assets/samples/hd_whiteshirt.jpg'
    ],
    template: 'finnxiii',
    transition: 'kenburns',
    aspectRatio: '16-9',
    lyricsRaw: `[00:08.20] nhiều khi ANH
[00:11.60] mong được một lần
[00:14.10] NÓI RA
[00:15.80] hết tất cả
[00:18.50] thay vì
[00:21.60] thay vì ngồi
[00:23.80] lặng im nghe
[00:25.30] EM kể về ANH TA
[00:27.70] bằng đôi mắt
[00:29.70] LẤP
[00:30.30] LÁNH
[00:31.80] đôi lúc EM
[00:34.20] tránh ÁNH MẮT của ANH,
[00:38.00] vì dường như lúc nào
[00:39.50] em cũng hiểu thấu lòng anh
[00:41.50] không thể
[00:42.50] NGẮT LỜI,
[00:44.50] càng không thể để
[00:46.20] GIỌT LỆ NÀO
[00:48.10] được rơi...
[00:50.00] nên ANH
[00:51.60] lùi bước
[00:53.60] về sau
[00:55.80] để thấy em
[00:57.10] RÕ HƠN
[00:59.40] để có thể ngắm
[01:01.10] em từ xa âu yếm hơn
[01:03.50] CẢ NGUỒN SỐNG
[01:05.50] bỗng chốc thu bé lại
[01:07.40] vừa bằng một
[01:08.60] CÔ GÁI`,
    parsedStanzas: DEMO_PRESET_1_WORDS_DATA
  };

  const DEMO_PRESET_2 = {
    audioUrl: 'assets/samples/sample_lofi.mp3',
    audioName: 'Lofi Chill Rhodes Beat (24s Relaxing Loop)',
    duration: 24.0,
    images: [
      'assets/samples/bg_sunset.jpg',
      'assets/samples/bg_cyberpunk.jpg'
    ],
    template: 'lofi',
    transition: 'zoom',
    aspectRatio: '16-9',
    lyricsRaw: `[00:02.00] Những giọt mưa rơi êm trên hiên vắng
[00:08.00] Ly cà phê thơm ngát buổi hoàng hôn
[00:14.00] Lắng nghe nhịp tim khẽ rung lên từng nốt
[00:19.00] Một ngày bình yên trôi qua nhẹ nhàng`
  };

  const DEMO_PRESET_GANH_HAO = (window.DEMO_PRESET_GANH_HAO) ? {
    audioUrl: window.DEMO_PRESET_GANH_HAO.audioUrl,
    audioName: `${window.DEMO_PRESET_GANH_HAO.audioTitle} - ${window.DEMO_PRESET_GANH_HAO.audioArtist}`,
    audioDuration: window.DEMO_PRESET_GANH_HAO.audioDuration || 353.23,
    duration: window.DEMO_PRESET_GANH_HAO.audioDuration || 353.23,
    images: window.DEMO_PRESET_GANH_HAO.imageUrls,
    template: 'finnxiii',
    transition: 'kenburns',
    aspectRatio: '16-9',
    songMeta: window.DEMO_PRESET_GANH_HAO.songMeta,
    parsedStanzas: window.DEMO_PRESET_GANH_HAO.wordsData
  } : null;

  // === AUTO-SAVE STATUS LISTENER ===
  historyManager.onAutoSaveStatusChange = (status, text) => {
    if (autoSaveIndicator && autoSaveText) {
      autoSaveIndicator.className = `autosave-pill ${status}`;
      autoSaveText.textContent = text;
    }
  };

  function triggerStateUpdate() {
    currentProjectState.audioName = audioNameDisplay.textContent;
    currentProjectState.audioUrl = coreAudio.src;
    currentProjectState.audioDuration = coreAudio.duration || engine.totalDuration || 70.0;
    currentProjectState.images = activeImageObjects.map(img => img.src);
    currentProjectState.template = engine.currentTemplate.id;
    currentProjectState.transition = engine.transitionType;
    currentProjectState.aspectRatio = engine.aspectRatio;
    currentProjectState.lyricsRaw = rawLyricsInput.value;
    currentProjectState.parsedStanzas = engine.lyricsData;

    historyManager.queueAutoSave(currentProjectState);
    updateHistoryBadge();
  }

  function updateHistoryBadge() {
    const list = historyManager.getHistory();
    if (historyCountBadge) {
      historyCountBadge.textContent = list.length;
    }
  }

  // === LOAD PROJECT STATE ===
  function applyProjectState(state) {
    currentProjectState = Object.assign({}, currentProjectState, state);

    // 1. Audio
    if (state.audioUrl) {
      coreAudio.src = state.audioUrl;
      audioNameDisplay.textContent = state.audioName || 'File âm thanh';
      const dur = state.audioDuration || state.duration || 353.23;
      audioDurationDisplay.textContent = `${formatTime(dur)} • Audio Ready`;
      labelTotalTime.textContent = formatTime(dur);
      engine.setDuration(dur);
    }

    // 2. Images
    if (state.images && state.images.length > 0) {
      loadImagesFromUrls(state.images);
    }

    // 3. Template
    if (state.template) {
      selectTemplate(state.template);
    }

    // 4. Transition
    if (state.transition) {
      selectTransition.value = state.transition;
      engine.transitionType = state.transition;
    }

    // 5. Aspect Ratio
    if (state.aspectRatio) {
      setAspectRatio(state.aspectRatio);
    }

    // 6. Lyrics: if explicit parsedStanzas are present (like preset 1 word-timing), use them directly!
    if (state.parsedStanzas && state.parsedStanzas.length > 0) {
      engine.setLyrics(state.parsedStanzas);
      renderLyricsListUI(state.parsedStanzas);
      buildTimelineDots(state.parsedStanzas, state.audioDuration || 70.0);
      if (state.lyricsRaw) rawLyricsInput.value = state.lyricsRaw;
    } else if (state.lyricsRaw) {
      rawLyricsInput.value = state.lyricsRaw;
      parseAndBuildLyrics(state.lyricsRaw, state.audioDuration || 70.0);
    }

    coreAudio.currentTime = 0;
    updateProgressUI(0);
    renderCurrentFrame();
  }

  function loadImagesFromUrls(urls) {
    activeImageObjects = [];
    imageThumbsGrid.innerHTML = '';
    let loadedCount = 0;

    urls.forEach((url, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === urls.length) {
          engine.setImages(activeImageObjects);
          renderCurrentFrame();
        }
      };
      activeImageObjects.push(img);

      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `
        <img src="${url}" alt="Slide ${idx + 1}">
        <span class="thumb-order-badge">${idx + 1}</span>
        <button class="thumb-del-btn" title="Xóa ảnh">&times;</button>
      `;
      thumb.querySelector('.thumb-del-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        removeImage(idx);
      });
      imageThumbsGrid.appendChild(thumb);
    });

    engine.setImages(activeImageObjects);
    triggerStateUpdate();
  }

  function removeImage(index) {
    activeImageObjects.splice(index, 1);
    engine.setImages(activeImageObjects);
    renderThumbnails();
    renderCurrentFrame();
    triggerStateUpdate();
  }

  function renderThumbnails() {
    imageThumbsGrid.innerHTML = '';
    activeImageObjects.forEach((img, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `
        <img src="${img.src}">
        <span class="thumb-order-badge">${idx + 1}</span>
        <button class="thumb-del-btn" title="Xóa ảnh">&times;</button>
      `;
      thumb.querySelector('.thumb-del-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        removeImage(idx);
      });
      imageThumbsGrid.appendChild(thumb);
    });
  }

  // === LYRICS PARSER & AUTO-SYNC (WORD-BY-WORD TIMING GENERATOR) ===
  function parseAndBuildLyrics(rawText, totalDur) {
    const paragraphs = rawText.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
    const parsedStanzas = [];
    const hasLrcTimestamps = /\[\d{2}:\d{2}/.test(rawText);

    if (paragraphs.length > 1) {
      paragraphs.forEach((pText, sIdx) => {
        const rawLines = pText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let stanzaStart = 0;
        let stanzaEnd = totalDur;
        const lineObjects = [];

        rawLines.forEach((l, lIdx) => {
          let lineStart = 0;
          let lineText = l;
          const match = l.match(/\[(\d{2}):(\d{2}(?:\.\d+)?)\](.*)/);
          if (match) {
            lineStart = parseFloat(match[1]) * 60 + parseFloat(match[2]);
            lineText = match[3].trim();
          } else {
            lineStart = (totalDur / (paragraphs.length * 3)) * (sIdx * 3 + lIdx);
          }
          if (lIdx === 0) stanzaStart = lineStart;

          let lineEnd = lineStart + 3.0;
          lineObjects.push({ text: lineText, start: lineStart, end: lineEnd, indent: lIdx });
        });

        for (let j = 0; j < lineObjects.length; j++) {
          if (j < lineObjects.length - 1) {
            lineObjects[j].end = lineObjects[j + 1].start;
          } else {
            lineObjects[j].end = lineObjects[j].start + 3.5;
          }
        }
        stanzaEnd = lineObjects[lineObjects.length - 1].end + 0.4;

        const finalLines = lineObjects.map(lo => {
          const rawWords = lo.text.split(/\s+/).filter(w => w.length > 0);
          const dur = Math.max(0.4, lo.end - lo.start);
          const wDur = (dur - 0.15) / Math.max(1, rawWords.length);
          const wList = rawWords.map((word, wIdx) => {
            const cleanWord = word.replace(/[.,!?;:…"']/g, '');
            const isUpperKey = cleanWord === cleanWord.toUpperCase() && cleanWord.length > 1;
            const isHighlight = [
              'EM', 'ANH', 'CÔ GÁI', 'CÔ', 'GÁI', 'NGUỒN SỐNG', 'NGUỒN', 'SỐNG',
              'LÙI BƯỚC', 'LÙI', 'BƯỚC', 'GIỌT LỆ NÀO', 'GIỌT', 'LỆ', 'NÀO',
              'NÓI RA', 'NÓI', 'RA', 'ĐÔI MẮT', 'ĐÔI', 'MẮT', 'HẾT', 'TẤT', 'CẢ',
              'NẮM TAY', 'NẮM', 'TAY', 'mắt', 'đôi'
            ].includes(cleanWord);
            return {
              text: word,
              start: Math.round((lo.start + wIdx * wDur) * 100) / 100,
              end: Math.round((lo.start + (wIdx + 1) * wDur) * 100) / 100,
              isUpperKey,
              isHighlight
            };
          });
          return {
            text: lo.text,
            start: lo.start,
            end: lo.end,
            indent: lo.indent,
            words: wList
          };
        });

        parsedStanzas.push({
          id: `stanza_${sIdx}`,
          start: stanzaStart,
          end: stanzaEnd,
          text: rawLines.map(l => l.replace(/\[\d{2}:\d{2}(?:\.\d+)?\]/, '').trim()).join(' '),
          indent: 0,
          lines: finalLines
        });
      });
    } else {
      const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (hasLrcTimestamps) {
        for (let i = 0; i < lines.length; i++) {
          const match = lines[i].match(/\[(\d{2}):(\d{2}(?:\.\d+)?)\](.*)/);
          if (match) {
            const min = parseFloat(match[1]);
            const sec = parseFloat(match[2]);
            const startTime = min * 60 + sec;
            const text = match[3].trim();

            let endTime = startTime + 5.5;
            if (i < lines.length - 1) {
              const nextMatch = lines[i + 1].match(/\[(\d{2}):(\d{2}(?:\.\d+)?)\]/);
              if (nextMatch) {
                endTime = parseFloat(nextMatch[1]) * 60 + parseFloat(nextMatch[2]);
              }
            }
            parsedStanzas.push(createTimedStanza(text, startTime, endTime, i));
          }
        }
      } else {
        const introPad = Math.min(8.0, totalDur * 0.12);
        const availableDur = Math.max(10, totalDur - introPad - 2.0);
        const lineDur = availableDur / lines.length;

        lines.forEach((lineText, i) => {
          const start = introPad + (i * lineDur);
          const end = start + lineDur;
          parsedStanzas.push(createTimedStanza(lineText, start, end, i));
        });
      }
    }

    engine.setLyrics(parsedStanzas);
    renderLyricsListUI(parsedStanzas);
    buildTimelineDots(parsedStanzas, totalDur);
    triggerStateUpdate();
  }

  function createTimedStanza(text, start, end, idx) {
    const rawWords = text.split(/\s+/).filter(w => w.length > 0);
    const totalWords = rawWords.length;
    const dur = Math.max(0.6, end - start);
    const wordDur = (dur - 0.20) / Math.max(1, totalWords);

    const wordList = rawWords.map((word, wIdx) => {
      const cleanWord = word.replace(/[.,!?;:…"']/g, '');
      const isUpperKey = cleanWord === cleanWord.toUpperCase() && cleanWord.length > 1;
      const isHighlight = [
        'EM', 'ANH', 'CÔ GÁI', 'CÔ', 'GÁI', 'NGUỒN SỐNG', 'NGUỒN', 'SỐNG',
        'LÙI BƯỚC', 'LÙI', 'BƯỚC', 'GIỌT LỆ NÀO', 'GIỌT', 'LỆ', 'NÀO',
        'NÓI RA', 'NÓI', 'RA', 'ĐÔI MẮT', 'ĐÔI', 'MẮT', 'HẾT', 'TẤT', 'CẢ'
      ].includes(cleanWord);
      return {
        text: word,
        start: Math.round((start + (wIdx * wordDur)) * 100) / 100,
        end: Math.round((start + ((wIdx + 1) * wordDur)) * 100) / 100,
        isUpperKey: isUpperKey,
        isHighlight: isHighlight
      };
    });

    // If text has > 8 words, intelligently format into 2 staircase lines
    let stanzaLines = [];
    if (totalWords > 8) {
      const splitPoint = Math.ceil(totalWords / 2);
      const words1 = wordList.slice(0, splitPoint);
      const words2 = wordList.slice(splitPoint);
      const splitTime = words2[0] ? words2[0].start : (start + dur * 0.5);

      stanzaLines = [
        {
          text: rawWords.slice(0, splitPoint).join(' '),
          start: start,
          end: splitTime,
          indent: 0,
          words: words1
        },
        {
          text: rawWords.slice(splitPoint).join(' '),
          start: splitTime,
          end: end,
          indent: 1,
          words: words2
        }
      ];
    } else {
      stanzaLines = [
        {
          text: text,
          start: start,
          end: end,
          indent: idx % 3,
          words: wordList
        }
      ];
    }

    return {
      id: `stanza_${idx}`,
      start: Math.round(start * 100) / 100,
      end: Math.round(end * 100) / 100,
      text: text,
      indent: idx % 3,
      lines: stanzaLines
    };
  }

  function renderLyricsListUI(stanzas) {
    lyricsSyncList.innerHTML = '';
    stanzas.forEach((s) => {
      const row = document.createElement('div');
      row.className = 'lyric-item-row';
      row.id = `row_${s.id}`;
      row.innerHTML = `
        <span class="lyric-item-time">${formatTime(s.start)}</span>
        <span class="lyric-item-text">${s.text}</span>
      `;
      row.addEventListener('click', () => {
        applySeek(s.start, true);
        if (!isPlaying) playVideo();
      });
      lyricsSyncList.appendChild(row);
    });
  }

  function buildTimelineDots(stanzas, duration) {
    timelineDots.innerHTML = '';
    stanzas.forEach(s => {
      const dot = document.createElement('div');
      dot.className = 'timeline-dot';
      dot.style.left = `${(s.start / duration) * 100}%`;
      dot.title = `${formatTime(s.start)}: ${s.text}`;
      timelineDots.appendChild(dot);
    });
  }

  // === TEMPLATE SWITCHER ===
  function selectTemplate(templateId) {
    templateCards.forEach(c => {
      if (c.dataset.template === templateId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
    engine.setTemplate(templateId);
    renderCurrentFrame();
    triggerStateUpdate();
  }

  templateCards.forEach(c => {
    c.addEventListener('click', () => {
      selectTemplate(c.dataset.template);
    });
  });

  // === ASPECT RATIO SWITCHER ===
  function setAspectRatio(ratio) {
    aspectBtns.forEach(b => {
      if (b.dataset.ratio === ratio) b.classList.add('active');
      else b.classList.remove('active');
    });

    stageWrapper.className = `stage-wrapper ratio-${ratio}`;
    engine.updateDimensions(ratio);
    renderCurrentFrame();
  }

  aspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setAspectRatio(btn.dataset.ratio);
      triggerStateUpdate();
    });
  });

  selectTransition.addEventListener('change', (e) => {
    engine.transitionType = e.target.value;
    renderCurrentFrame();
    triggerStateUpdate();
  });

  btnAutoSyncLyrics.addEventListener('click', () => {
    const text = rawLyricsInput.value.trim();
    if (!text) {
      alert('Vui lòng dán lời bài hát vào ô văn bản trước!');
      return;
    }
    const dur = coreAudio.duration || engine.totalDuration || 60.0;
    parseAndBuildLyrics(text, dur);
  });

  // === HISTORY & SNAPSHOTS CONTROLLER ===
  function openHistoryModal() {
    renderHistoryList();
    historyModalBackdrop.classList.add('active');
  }

  function closeHistoryModal() {
    historyModalBackdrop.classList.remove('active');
  }

  function renderHistoryList() {
    const list = historyManager.getHistory();
    historyListContainer.innerHTML = '';

    if (list.length === 0) {
      historyListContainer.innerHTML = `
        <div class="history-empty-placeholder">
          <p>Chưa có bản nháp nào được lưu trong lịch sử.</p>
          <p style="font-size:0.75rem; margin-top:4px">Bấm nút "Lưu Bản Nháp" ở thanh trên để ghi lại tiến trình của bạn!</p>
        </div>
      `;
      return;
    }

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'history-card';
      const thumbSrc = item.thumbnail || (item.state.images && item.state.images[0]) || 'assets/samples/bg_clean_720p.jpg';

      card.innerHTML = `
        <div class="history-card-left">
          <img src="${thumbSrc}" class="history-thumb" alt="Preview">
          <div class="history-meta">
            <div class="history-title">${item.name}</div>
            <div class="history-details">
              <span>🕒 ${item.formattedTime}</span>
              <span class="history-tag">${item.template.toUpperCase()}</span>
              <span>${item.aspectRatio}</span>
            </div>
          </div>
        </div>
        <div class="history-card-actions">
          <button class="btn-history-restore" title="Khôi phục trạng thái này">Khôi Phục</button>
          <button class="btn-history-del" title="Xóa bản nháp">&times;</button>
        </div>
      `;

      card.querySelector('.btn-history-restore').addEventListener('click', () => {
        applyProjectState(item.state);
        closeHistoryModal();
      });

      card.querySelector('.btn-history-del').addEventListener('click', () => {
        historyManager.deleteSnapshot(item.id);
        renderHistoryList();
        updateHistoryBadge();
      });

      historyListContainer.appendChild(card);
    });
  }

  btnOpenHistory.addEventListener('click', openHistoryModal);
  btnCloseHistoryModal.addEventListener('click', closeHistoryModal);
  historyModalBackdrop.addEventListener('click', (e) => {
    if (e.target === historyModalBackdrop) closeHistoryModal();
  });

  btnSaveSnapshot.addEventListener('click', () => {
    const thumbDataUrl = canvas.toDataURL('image/jpeg', 0.5);
    const projectName = prompt('Nhập tên bản nháp cần lưu:', `Dự án ${currentProjectState.template.toUpperCase()} (${new Date().toLocaleTimeString()})`);
    if (projectName !== null) {
      historyManager.saveSnapshot(projectName.trim(), currentProjectState, thumbDataUrl);
      updateHistoryBadge();
      alert('💾 Đã lưu bản nháp thành công vào lịch sử!');
    }
  });

  btnHistoryNewProject.addEventListener('click', () => {
    if (confirm('Tạo dự án mới? Trạng thái hiện tại đã được lưu vào bản nháp tự động.')) {
      applyProjectState(DEMO_PRESET_1);
      closeHistoryModal();
    }
  });

  btnImportProjectJson.addEventListener('click', () => importProjectJsonFileInput.click());
  importProjectJsonFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      historyManager.importProjectFile(file, (err, project) => {
        if (err) {
          alert('Không thể đọc file dự án JSON: ' + err.message);
        } else {
          applyProjectState(project);
          closeHistoryModal();
          alert('🎉 Đã nạp dự án từ file thành công!');
        }
      });
    }
  });

  btnClearHistory.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử bản nháp đã lưu?')) {
      historyManager.clearAllHistory();
      renderHistoryList();
      updateHistoryBadge();
    }
  });

  // === PLAYBACK CONTROLS & SUB-FRAME AUDIO CLOCK SMOOTHING ===
  let lastAudioTime = 0;
  let lastPerfTimestamp = performance.now();
  let smoothPlayTime = 0;

  function getSmoothedAudioTime() {
    if (!isPlaying || coreAudio.paused) {
      smoothPlayTime = coreAudio.currentTime;
      lastAudioTime = coreAudio.currentTime;
      lastPerfTimestamp = performance.now();
      return smoothPlayTime;
    }

    const now = performance.now();
    const dt = (now - lastPerfTimestamp) / 1000;
    lastPerfTimestamp = now;

    // Detect if browser coreAudio.currentTime stepped forward or seeked
    if (coreAudio.currentTime !== lastAudioTime) {
      // If deviation is greater than 60ms (seek or lag hitch), hard snap
      if (Math.abs(coreAudio.currentTime - smoothPlayTime) > 0.06) {
        smoothPlayTime = coreAudio.currentTime;
      } else {
        // Softly converge towards audio clock to eliminate hardware stepping
        smoothPlayTime += (coreAudio.currentTime - smoothPlayTime) * 0.45;
      }
      lastAudioTime = coreAudio.currentTime;
    }

    // High-resolution monotonic advance
    smoothPlayTime += dt * (coreAudio.playbackRate || 1.0);

    // Bound checks
    if (smoothPlayTime < 0) smoothPlayTime = 0;
    if (coreAudio.duration && smoothPlayTime > coreAudio.duration) {
      smoothPlayTime = coreAudio.duration;
    }

    return smoothPlayTime;
  }

  function renderCurrentFrame(explicitTime) {
    const t = (explicitTime !== undefined) ? explicitTime : (coreAudio.currentTime || 0);
    engine.renderFrame(t);
  }

  function loop() {
    if (isPlaying) {
      if (!isDragging) {
        const t = getSmoothedAudioTime();
        engine.renderFrame(t);
        updateProgressUI(t);

        const energy = engine.beatEnergy;
        liveWaveBars.forEach((bar, i) => {
          const height = Math.max(3, Math.min(20, (energy * 20) + Math.sin(t * 10 + i) * 6));
          bar.style.height = `${height}px`;
        });

        highlightActiveLyricRow(t);
      }
      animId = requestAnimationFrame(loop);
    }
  }

  function playVideo() {
    engine.initAudioContext(coreAudio);
    coreAudio.play().then(() => {
      isPlaying = true;
      smoothPlayTime = coreAudio.currentTime;
      lastAudioTime = coreAudio.currentTime;
      lastPerfTimestamp = performance.now();

      stagePlayOverlay.classList.add('hidden');
      ctrlPlayIcon.style.display = 'none';
      ctrlPauseIcon.style.display = 'block';
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(loop);
    }).catch(err => console.warn('Play gesture needed:', err));
  }

  function pauseVideo() {
    coreAudio.pause();
    isPlaying = false;
    smoothPlayTime = coreAudio.currentTime;
    ctrlPlayIcon.style.display = 'block';
    ctrlPauseIcon.style.display = 'none';
    cancelAnimationFrame(animId);
  }

  function togglePlay() {
    if (isPlaying) pauseVideo();
    else playVideo();
  }

  btnPlayPause.addEventListener('click', togglePlay);
  btnBigPlay.addEventListener('click', playVideo);
  stagePlayOverlay.addEventListener('click', (e) => {
    if (e.target === stagePlayOverlay) playVideo();
  });

  btnRestart.addEventListener('click', () => {
    applySeek(0, true);
    playVideo();
  });

  btnMuteToggle.addEventListener('click', () => {
    coreAudio.muted = !coreAudio.muted;
    btnMuteToggle.style.opacity = coreAudio.muted ? '0.4' : '1';
  });

  btnFullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      stageWrapper.requestFullscreen().catch(e => alert(e.message));
    } else {
      document.exitFullscreen();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      togglePlay();
    }
  });

  // === HIGH-PRECISION SCRUBBING & TIMELINE SEEKING ===
  let isDragging = false;
  let wasPlayingBeforeDrag = false;
  let lastSeekThrottleTime = 0;

  function getTimeFromPointerEvent(e) {
    const rect = timelineTrackWrap.getBoundingClientRect();
    const clientX = (e.clientX !== undefined)
      ? e.clientX
      : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / Math.max(1, rect.width)));
    const dur = (coreAudio && coreAudio.duration && !isNaN(coreAudio.duration) && coreAudio.duration > 0)
      ? coreAudio.duration
      : (engine.totalDuration || 353.23);
    return ratio * dur;
  }

  function applySeek(targetTime, commitAudio = true) {
    const dur = (coreAudio && coreAudio.duration && !isNaN(coreAudio.duration) && coreAudio.duration > 0)
      ? coreAudio.duration
      : (engine.totalDuration || 353.23);
    targetTime = Math.max(0, Math.min(targetTime, dur));

    updateProgressUI(targetTime);
    renderCurrentFrame(targetTime);
    highlightActiveLyricRow(targetTime);

    if (commitAudio) {
      coreAudio.currentTime = targetTime;
      smoothPlayTime = targetTime;
      lastAudioTime = targetTime;
      lastPerfTimestamp = performance.now();
    }
  }

  function onScrubStart(e) {
    if (e.button !== undefined && e.button !== 0) return;
    isDragging = true;
    wasPlayingBeforeDrag = isPlaying;
    timelineTrackWrap.classList.add('dragging');

    if (wasPlayingBeforeDrag) {
      coreAudio.pause();
    }

    if (timelineTrackWrap.setPointerCapture && e.pointerId !== undefined) {
      try { timelineTrackWrap.setPointerCapture(e.pointerId); } catch (_) {}
    }

    const targetTime = getTimeFromPointerEvent(e);
    applySeek(targetTime, true);
    if (e.cancelable) e.preventDefault();
  }

  function onScrubMove(e) {
    if (!isDragging) return;
    const targetTime = getTimeFromPointerEvent(e);

    // Instant 60FPS visual scrub feedback
    updateProgressUI(targetTime);
    renderCurrentFrame(targetTime);
    highlightActiveLyricRow(targetTime);

    // Throttle audio seek requests during dragging (every 65ms) to prevent decoder churn
    const now = performance.now();
    if (now - lastSeekThrottleTime > 65) {
      coreAudio.currentTime = targetTime;
      smoothPlayTime = targetTime;
      lastAudioTime = targetTime;
      lastPerfTimestamp = performance.now();
      lastSeekThrottleTime = now;
    }
    if (e.cancelable) e.preventDefault();
  }

  function onScrubEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    timelineTrackWrap.classList.remove('dragging');

    if (timelineTrackWrap.releasePointerCapture && e.pointerId !== undefined) {
      try { timelineTrackWrap.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    const targetTime = getTimeFromPointerEvent(e);
    applySeek(targetTime, true);

    if (wasPlayingBeforeDrag) {
      playVideo();
    }
    if (e.cancelable) e.preventDefault();
  }

  // Pointer events support desktop mouse, tablet stylus, and touch natively
  timelineTrackWrap.addEventListener('pointerdown', onScrubStart);
  timelineTrackWrap.addEventListener('pointermove', onScrubMove);
  timelineTrackWrap.addEventListener('pointerup', onScrubEnd);
  timelineTrackWrap.addEventListener('pointercancel', onScrubEnd);

  // Window-level safety listeners in case pointer leaves element or window
  window.addEventListener('pointerup', (e) => { if (isDragging) onScrubEnd(e); });
  window.addEventListener('mouseup', (e) => { if (isDragging) onScrubEnd(e); });
  window.addEventListener('touchend', (e) => { if (isDragging) onScrubEnd(e); });

  // Native audio sync events
  coreAudio.addEventListener('seeked', () => {
    if (!isDragging) {
      smoothPlayTime = coreAudio.currentTime;
      lastAudioTime = coreAudio.currentTime;
      lastPerfTimestamp = performance.now();
      updateProgressUI(coreAudio.currentTime);
      renderCurrentFrame(coreAudio.currentTime);
      highlightActiveLyricRow(coreAudio.currentTime);
    }
  });

  coreAudio.addEventListener('timeupdate', () => {
    if (!isPlaying && !isDragging) {
      updateProgressUI(coreAudio.currentTime);
      renderCurrentFrame(coreAudio.currentTime);
      highlightActiveLyricRow(coreAudio.currentTime);
    }
  });

  function updateProgressUI(t) {
    const dur = (coreAudio && coreAudio.duration && !isNaN(coreAudio.duration) && coreAudio.duration > 0)
      ? coreAudio.duration
      : (engine.totalDuration || 352.8);
    const pct = Math.min(100, Math.max(0, (t / dur) * 100));
    timelineFill.style.width = `${pct}%`;
    timelineThumb.style.left = `${pct}%`;
    labelCurrentTime.textContent = formatTime(t);
    labelTotalTime.textContent = formatTime(dur);
  }

  coreAudio.addEventListener('loadedmetadata', () => {
    if (coreAudio.duration && !isNaN(coreAudio.duration) && coreAudio.duration > 0) {
      engine.setDuration(coreAudio.duration);
      audioDurationDisplay.textContent = `${formatTime(coreAudio.duration)} • Audio Ready`;
      labelTotalTime.textContent = formatTime(coreAudio.duration);
      updateProgressUI(coreAudio.currentTime || 0);
    }
  });

  function highlightActiveLyricRow(t) {
    const stanzas = engine.lyricsData;
    let found = null;
    stanzas.forEach(s => {
      const row = document.getElementById(`row_${s.id}`);
      if (t >= s.start && t <= s.end) {
        found = s;
        if (row) row.classList.add('active');
      } else {
        if (row) row.classList.remove('active');
      }
    });

    if (found) {
      lyricLiveTicker.textContent = found.text;
    } else {
      lyricLiveTicker.textContent = '... [Dạo Nhạc Slideshow] ...';
    }
  }

  function formatTime(sec) {
    if (isNaN(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // === FILE UPLOADS: AUDIO & IMAGES ===
  audioDropzone.addEventListener('click', () => audioFileInput.click());
  btnReplaceAudio.addEventListener('click', () => audioFileInput.click());

  audioFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleAudioFile(file);
  });

  function handleAudioFile(file) {
    const url = URL.createObjectURL(file);
    coreAudio.src = url;
    audioNameDisplay.textContent = file.name;
    audioDurationDisplay.textContent = 'Đang giải mã âm thanh...';

    coreAudio.onloadedmetadata = () => {
      const dur = coreAudio.duration;
      audioDurationDisplay.textContent = `${formatTime(dur)} • ${(file.size / (1024*1024)).toFixed(1)} MB`;
      engine.setDuration(dur);
      updateProgressUI(0);

      const raw = rawLyricsInput.value.trim();
      if (raw) parseAndBuildLyrics(raw, dur);
      triggerStateUpdate();
    };
  }

  imageDropzone.addEventListener('click', () => imageFileInput.click());
  imageFileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) handleImageFiles(files);
  });

  function handleImageFiles(files) {
    let loaded = 0;
    const newImgs = [];

    files.forEach(f => {
      const img = new Image();
      img.src = URL.createObjectURL(f);
      img.onload = () => {
        loaded++;
        newImgs.push(img);
        if (loaded === files.length) {
          activeImageObjects = activeImageObjects.concat(newImgs);
          engine.setImages(activeImageObjects);
          renderThumbnails();
          renderCurrentFrame();
          triggerStateUpdate();
        }
      };
    });
  }

  // Preset handlers
  function selectPresetGanhHao() {
    if (chipSampleGanhHao) chipSampleGanhHao.classList.add('active');
    if (chipSample1) chipSample1.classList.remove('active');
    if (chipSample2) chipSample2.classList.remove('active');
    if (DEMO_PRESET_GANH_HAO) {
      window.CURRENT_SONG_META = window.DEMO_PRESET_GANH_HAO.songMeta;
      applyProjectState(DEMO_PRESET_GANH_HAO);
    }
  }

  function selectPreset1() {
    if (chipSample1) chipSample1.classList.add('active');
    if (chipSampleGanhHao) chipSampleGanhHao.classList.remove('active');
    if (chipSample2) chipSample2.classList.remove('active');
    window.CURRENT_SONG_META = {
      topMeta: 'SOOBIN HOÀNG SƠN  •  NEW SINGLE  •  1989s PRODUCTION',
      subMeta: 'FINNXIII  |  1989s PRODUCTION',
      cardLines: [
        { text: 'P H Í A', size: 14, weight: '700' },
        { text: 'S A U', size: 14, weight: '700' },
        { text: 'M Ộ T', size: 14, weight: '700' },
        { text: '- C Ô', size: 13, weight: '600' },
        { text: 'G Á I', size: 17, weight: '900' }
      ]
    };
    applyProjectState(DEMO_PRESET_1);
  }

  function selectPreset2() {
    if (chipSample2) chipSample2.classList.add('active');
    if (chipSampleGanhHao) chipSampleGanhHao.classList.remove('active');
    if (chipSample1) chipSample1.classList.remove('active');
    window.CURRENT_SONG_META = null;
    applyProjectState(DEMO_PRESET_2);
  }

  chipSampleGanhHao?.addEventListener('click', selectPresetGanhHao);
  btnLoadDemoGanhHao?.addEventListener('click', selectPresetGanhHao);

  chipSample1?.addEventListener('click', selectPreset1);
  btnLoadDemo1?.addEventListener('click', selectPreset1);

  chipSample2?.addEventListener('click', selectPreset2);
  btnLoadDemo2?.addEventListener('click', selectPreset2);

  btnAddGanhHaoPack?.addEventListener('click', () => {
    if (window.DEMO_PRESET_GANH_HAO && window.DEMO_PRESET_GANH_HAO.imageUrls) {
      loadImagesFromUrls(window.DEMO_PRESET_GANH_HAO.imageUrls);
    }
  });

  btnAddPortraitPack.addEventListener('click', () => {
    loadImagesFromUrls([
      'assets/samples/hd_portrait.jpg',
      'assets/samples/bg_clean_720p.jpg',
      'assets/samples/hd_whiteshirt.jpg'
    ]);
  });
  btnAddSunsetPack.addEventListener('click', () => {
    loadImagesFromUrls([
      'assets/samples/bg_sunset.jpg',
      'assets/samples/bg_clean_720p.jpg'
    ]);
  });
  btnAddCyberPack.addEventListener('click', () => {
    loadImagesFromUrls([
      'assets/samples/bg_cyberpunk.jpg',
      'assets/samples/hd_portrait.jpg'
    ]);
  });

  // === EXPORT VIDEO 60FPS ===
  function startVideoExport() {
    exportModalBackdrop.classList.add('active');
    exportProgressBarFill.style.width = '0%';
    exportProgressPct.textContent = '0%';

    exporter.onProgress = (pct, curr, total) => {
      exportProgressBarFill.style.width = `${pct}%`;
      exportProgressPct.textContent = `${pct}%`;
      exportTimeReadout.textContent = `${formatTime(curr)} / ${formatTime(total)}`;
    };

    exporter.onComplete = (blob, filename) => {
      setTimeout(() => {
        exportModalBackdrop.classList.remove('active');
        alert(`🎉 Xuất video thành công!\nFile đã được tải về: ${filename}`);
      }, 500);
    };

    exporter.onError = (err) => {
      exportModalBackdrop.classList.remove('active');
      alert(`Lỗi khi xuất video: ${err.message || err}`);
    };

    exporter.startExport({ fps: 60 });
  }

  btnStartExport.addEventListener('click', startVideoExport);
  btnQuickExport.addEventListener('click', startVideoExport);

  btnCancelExport.addEventListener('click', () => {
    exporter.cancelExport();
    exportModalBackdrop.classList.remove('active');
  });

  coreAudio.addEventListener('ended', () => {
    pauseVideo();
    coreAudio.currentTime = 0;
    updateProgressUI(0);
  });

  // Default initial load: Đêm Gành Hào (Còn Thương Sắc Hoa Chung Tình)
  if (DEMO_PRESET_GANH_HAO) {
    selectPresetGanhHao();
  } else {
    selectPreset1();
  }
  updateHistoryBadge();

  // Test time parameter for snapshot inspections & verification
  const urlParams = new URLSearchParams(window.location.search);
  const testT = urlParams.get('testTime');
  if (testT !== null) {
    const tVal = parseFloat(testT);
    stagePlayOverlay.classList.add('hidden');
    setTimeout(() => {
      coreAudio.currentTime = tVal;
      engine.renderFrame(tVal);
      updateProgressUI(tVal);
    }, 350);
  }
});
