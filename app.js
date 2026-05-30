'use strict';

/* --- Traductions --- */
const I18N = {
  fr: {
    tagline:         'Organisez votre apprentissage',
    install:         '⬇️ Installer',
    back:            '← Retour',
    choose_mode:     'Choisissez votre espace',

    mode_custom:      'Personnaliser',
    mode_custom_desc: 'Créez vos propres dossiers et importez vos fichiers',
    mode_standard:    'Standard',
    mode_standard_desc: 'Importez vos fichiers directement',
    mode_period:      'Par période',
    mode_period_desc: 'Organisez par semaine et par jour',

    select_week:     'Choisissez une semaine',
    select_day:      'Sélectionnez un jour',
    days_of_week:    'Jours de la semaine',
    week:            'Semaine',

    no_folder:       'Aucun dossier',
    no_folder_hint:  'Appuyez sur + pour créer votre premier dossier',
    new_folder:      'Nouveau dossier',
    folder_name_lbl: 'Nom du dossier',
    folder_ph:       'Ex : Cours de mathématiques',
    color:           'Couleur',
    cancel:          'Annuler',
    create:          'Créer',
    delete:          'Supprimer',
    rename:          'Renommer',
    rename_folder:   'Renommer le dossier',
    rename_file:     'Renommer le fichier',
    rename_ph:       'Nouveau nom…',
    renamed_ok:      n => `Renommé en « ${n} »`,
    save:            'Enregistrer',

    empty_folder:    'Dossier vide',
    empty_hint:      'Appuyez sur + pour importer vos fichiers<br>(PDF, photos, vidéos, documents…)',
    empty_standard:  'Aucun fichier',
    empty_standard_hint: 'Appuyez sur + pour importer vos fichiers',

    folders:         n => `${n} dossier${n !== 1 ? 's' : ''}`,
    files:           n => `${n} fichier${n !== 1 ? 's' : ''}`,

    folder_created:  n => `Dossier « ${n} » créé`,
    folder_deleted:  'Dossier supprimé',
    file_deleted:    'Fichier supprimé',
    imported:        n => `${n} fichier${n > 1 ? 's' : ''} importé${n > 1 ? 's' : ''}`,
    not_found:       'Fichier introuvable',
    open_error:      "Erreur lors de l'ouverture",
    quota_error:     f => `Stockage insuffisant pour ${f}`,
    file_error:      f => `Erreur : ${f}`,
    confirm_folder:  n => `Supprimer le dossier « ${n} » et tous ses fichiers ?`,
    confirm_file:    n => `Supprimer « ${n} » ?`,
    name_required:   'Entrez un nom pour le dossier',

    ios_title:       'Installer EpaFiles',
    ios_hint:        'Appuyez sur <b>⬆️ Partager</b> puis <b>« Sur l\'écran d\'accueil »</b>',
    update_title:    'Mise à jour disponible',
    update_hint:     "Une nouvelle version d'EpaFiles est prête",
    update_btn:      'Mettre à jour',
    installed:       'EpaFiles installé avec succès !',

    days:  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'],
    abbrs: ['LUN','MAR','MER','JEU','VEN','SAM','DIM'],
  },
  en: {
    tagline:         'Organize your learning',
    install:         '⬇️ Install',
    back:            '← Back',
    choose_mode:     'Choose your space',

    mode_custom:      'Customize',
    mode_custom_desc: 'Create your own folders and import files',
    mode_standard:    'Standard',
    mode_standard_desc: 'Import your files directly',
    mode_period:      'By period',
    mode_period_desc: 'Organize by week and day',

    select_week:     'Choose a week',
    select_day:      'Select a day',
    days_of_week:    'Days of the week',
    week:            'Week',

    no_folder:       'No folders',
    no_folder_hint:  'Tap + to create your first folder',
    new_folder:      'New folder',
    folder_name_lbl: 'Folder name',
    folder_ph:       'Ex: Math class',
    color:           'Color',
    cancel:          'Cancel',
    create:          'Create',
    delete:          'Delete',
    rename:          'Rename',
    rename_folder:   'Rename folder',
    rename_file:     'Rename file',
    rename_ph:       'New name…',
    renamed_ok:      n => `Renamed to "${n}"`,
    save:            'Save',

    empty_folder:    'Empty folder',
    empty_hint:      'Tap + to import your files<br>(PDF, photos, videos, documents…)',
    empty_standard:  'No files',
    empty_standard_hint: 'Tap + to import your files',

    folders:         n => `${n} folder${n !== 1 ? 's' : ''}`,
    files:           n => `${n} file${n !== 1 ? 's' : ''}`,

    folder_created:  n => `Folder "${n}" created`,
    folder_deleted:  'Folder deleted',
    file_deleted:    'File deleted',
    imported:        n => `${n} file${n > 1 ? 's' : ''} imported`,
    not_found:       'File not found',
    open_error:      'Error opening file',
    quota_error:     f => `Not enough storage for ${f}`,
    file_error:      f => `Error: ${f}`,
    confirm_folder:  n => `Delete folder "${n}" and all its files?`,
    confirm_file:    n => `Delete "${n}"?`,
    name_required:   'Enter a folder name',

    ios_title:       'Install EpaFiles',
    ios_hint:        'Tap <b>⬆️ Share</b> then <b>"Add to Home Screen"</b>',
    update_title:    'Update available',
    update_hint:     'A new version of EpaFiles is ready',
    update_btn:      'Update',
    installed:       'EpaFiles installed successfully!',

    days:  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    abbrs: ['MON','TUE','WED','THU','FRI','SAT','SUN'],
  },
};

/* --- Données statiques --- */
const WEEKS = [
  { id: 'semaine-1', num: 1, gradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
  { id: 'semaine-2', num: 2, gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  { id: 'semaine-3', num: 3, gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { id: 'semaine-4', num: 4, gradient: 'linear-gradient(135deg,#43e97b,#38f9d7)' },
];

const DAYS = [
  { id: 'lundi',    color: '#6366f1' },
  { id: 'mardi',    color: '#8b5cf6' },
  { id: 'mercredi', color: '#06b6d4' },
  { id: 'jeudi',    color: '#10b981' },
  { id: 'vendredi', color: '#f59e0b' },
  { id: 'samedi',   color: '#ec4899' },
  { id: 'dimanche', color: '#ef4444' },
];

const FOLDER_COLORS = [
  '#6366f1','#8b5cf6','#ec4899','#ef4444',
  '#f59e0b','#10b981','#06b6d4','#3b82f6',
];

const MODES = [
  {
    id: 'custom',
    icon: '📁',
    gradient: 'linear-gradient(135deg,#7C3AED,#6366f1)',
    titleKey: 'mode_custom',
    descKey:  'mode_custom_desc',
  },
  {
    id: 'standard',
    icon: '📋',
    gradient: 'linear-gradient(135deg,#10b981,#06b6d4)',
    titleKey: 'mode_standard',
    descKey:  'mode_standard_desc',
  },
  {
    id: 'period',
    icon: '📅',
    gradient: 'linear-gradient(135deg,#f59e0b,#ec4899)',
    titleKey: 'mode_period',
    descKey:  'mode_period_desc',
  },
];

const STANDARD_FOLDER_ID = 'epafiles-standard-main';

function getFileType(mime) {
  if (!mime) return { icon: '📎', label: 'Fichier', bg: '#94a3b820', color: '#64748b' };
  if (mime === 'application/pdf')                              return { icon: '📄', label: 'PDF',     bg: '#fee2e2', color: '#ef4444' };
  if (mime.includes('word') || mime.includes('document'))     return { icon: '📝', label: 'Word',    bg: '#dbeafe', color: '#3b82f6' };
  if (mime.includes('excel') || mime.includes('sheet'))       return { icon: '📊', label: 'Excel',   bg: '#d1fae5', color: '#10b981' };
  if (mime.includes('powerpoint')||mime.includes('presentation')) return { icon: '📑', label: 'PPT', bg: '#fef3c7', color: '#f59e0b' };
  if (mime === 'text/plain')                                   return { icon: '📃', label: 'Texte',   bg: '#ede9fe', color: '#8b5cf6' };
  if (mime.includes('zip')||mime.includes('rar')||mime.includes('7z')) return { icon: '🗜️', label: 'Archive', bg: '#f3e8ff', color: '#a855f7' };
  if (mime.startsWith('image/'))  return { icon: '🖼️', label: 'Image',  bg: '#fce7f3', color: '#ec4899' };
  if (mime.startsWith('video/'))  return { icon: '🎬', label: 'Vidéo',  bg: '#ede9fe', color: '#7c3aed' };
  if (mime.startsWith('audio/'))  return { icon: '🎵', label: 'Audio',  bg: '#fef3c7', color: '#d97706' };
  return { icon: '📎', label: 'Fichier', bg: '#f1f5f9', color: '#64748b' };
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

function fmtSize(b) {
  if (b < 1024)        return b + ' o';
  if (b < 1024*1024)   return (b/1024).toFixed(1) + ' Ko';
  if (b < 1024**3)     return (b/1024**2).toFixed(1) + ' Mo';
  return (b/1024**3).toFixed(1) + ' Go';
}

/* --- IndexedDB --- */
class DB {
  constructor() { this.db = null; }

  open() {
    return new Promise((res, rej) => {
      const req = indexedDB.open('EpaFilesDB', 1);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('folders'))
          db.createObjectStore('folders', { keyPath: 'id' }).createIndex('dayKey', 'dayKey');
        if (!db.objectStoreNames.contains('files'))
          db.createObjectStore('files', { keyPath: 'id' }).createIndex('folderId', 'folderId');
      };
      req.onsuccess = e => { this.db = e.target.result; res(); };
      req.onerror   = () => rej(req.error);
    });
  }

  _q(store, mode, fn) {
    return new Promise((res, rej) => {
      const req = fn(this.db.transaction(store, mode).objectStore(store));
      req.onsuccess = () => res(req.result);
      req.onerror   = () => rej(req.error);
    });
  }

  get  = (s, k)    => this._q(s, 'readonly',  st => st.get(k));
  put  = (s, d)    => this._q(s, 'readwrite', st => st.put(d));
  del  = (s, k)    => this._q(s, 'readwrite', st => st.delete(k));
  idx  = (s, ix, k)=> this._q(s, 'readonly',  st => st.index(ix).getAll(k));

  getFolders(dayKey) { return this.idx('folders','dayKey',dayKey); }
  getFolder(id)      { return this.get('folders', id); }
  saveFolder(f)      { return this.put('folders', f); }
  deleteFolder(id)   { return this.del('folders', id); }

  getFiles(folderId) { return this.idx('files','folderId',folderId); }
  getFile(id)        { return this.get('files', id); }
  saveFile(f)        { return this.put('files', f); }
  deleteFile(id)     { return this.del('files', id); }

  async nukeFolderFiles(folderId) {
    const files = await this.getFiles(folderId);
    for (const f of files) await this.deleteFile(f.id);
    await this.deleteFolder(folderId);
  }

  async ensureStandardFolder() {
    let f = await this.getFolder(STANDARD_FOLDER_ID);
    if (!f) {
      f = { id: STANDARD_FOLDER_ID, dayKey: 'standard', name: 'Standard', color: '#10b981', createdAt: Date.now() };
      await this.saveFolder(f);
    }
    return f;
  }
}

/* --- App --- */
class EpaApp {
  constructor() {
    this.db    = new DB();
    this.state = { view: 'splash', weekId: null, dayId: null, folderId: null, parentView: null };
    this.pwaPrompt = null;
    this.$app  = null;
    this.lang  = localStorage.getItem('epa_lang') || 'fr';
  }

  t(key, arg) {
    const v = I18N[this.lang]?.[key] ?? I18N.fr[key];
    return typeof v === 'function' ? v(arg) : (v ?? '');
  }

  setLang(lang) { this.lang = lang; localStorage.setItem('epa_lang', lang); this.render(); }

  async init() {
    this.$app = document.getElementById('app');
    await this.db.open();
    await this.db.ensureStandardFolder();

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault(); this.pwaPrompt = e;
      document.getElementById('install-btn')?.classList.remove('hidden');
    });
    window.addEventListener('appinstalled', () => {
      this.toast(this.t('installed'), 'success'); this.pwaPrompt = null;
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape')
        document.querySelectorAll('.modal:not(.hidden)').forEach(m => m.classList.add('hidden'));
    });
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
      navigator.serviceWorker.addEventListener('message', e => {
        if (e.data?.type === 'APP_UPDATED') this.showUpdateBanner();
      });
    }
    const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    if (isIOS && !window.navigator.standalone) setTimeout(() => this.showIOSInstallBanner(), 3500);

    window.addEventListener('popstate', e => {
      if (e.state?.appState) { this.state = e.state.appState; this.render(); window.scrollTo({top:0,behavior:'instant'}); }
    });

    this.renderSplash();
    setTimeout(() => this.navigate('home'), 2200);
  }

  navigate(view, params = {}) {
    this.state = { ...this.state, view, ...params };
    const method = view === 'home' ? 'replaceState' : 'pushState';
    history[method]({ appState: { ...this.state } }, '');
    this.render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  async render() {
    switch (this.state.view) {
      case 'home':       await this.renderHome();       break;
      case 'custom':     await this.renderCustom();     break;
      case 'standard':   await this.renderStandard();   break;
      case 'week':       await this.renderWeek();       break;
      case 'day':        await this.renderDay();        break;
      case 'dayfolders': await this.renderDayFolders(); break;
      case 'folder':     await this.renderFolder();     break;
    }
  }

  /* ═══════════════════════════════════════════
     SPLASH
  ═══════════════════════════════════════════ */
  renderSplash() {
    this.$app.innerHTML = `
      <div class="splash">
        <div class="splash-orb-1"></div>
        <div class="splash-orb-2"></div>
        <div class="splash-content">
          <div class="splash-logo animate-bounce-in">${this.logo()}</div>
          <h1 class="splash-title animate-fade-up" style="animation-delay:.3s">EpaFiles</h1>
          <p class="splash-sub animate-fade-up" style="animation-delay:.5s">${this.t('tagline')}</p>
        </div>
        <div class="splash-loader"><div class="loader-bar"></div></div>
      </div>`;
  }

  /* ═══════════════════════════════════════════
     HOME — 3 modes
  ═══════════════════════════════════════════ */
  async renderHome() {
    // Compter les éléments pour chaque mode
    let customCount = 0;
    const customFolders = await this.db.getFolders('personnaliser');
    for (const f of customFolders) {
      const files = await this.db.getFiles(f.id);
      customCount += files.length;
    }
    const standardFiles = await this.db.getFiles(STANDARD_FOLDER_ID);
    let periodCount = 0;
    for (const w of WEEKS)
      for (const d of DAYS)
        periodCount += (await this.db.getFolders(`${w.id}-${d.id}`)).length;

    const counts = [customFolders.length, standardFiles.length, periodCount];
    const countLabels = [
      this.t('folders', customFolders.length),
      this.t('files', standardFiles.length),
      this.t('folders', periodCount),
    ];

    this.$app.innerHTML = `
      <div class="page home-page">
        <header class="home-header">
          <div class="home-header-content">
            <div class="logo-small">${this.logo()}</div>
            <div>
              <h1 class="app-title">EpaFiles</h1>
              <p class="app-subtitle">${this.t('choose_mode')}</p>
            </div>
          </div>
          <div class="header-right">
            <button id="install-btn" class="install-btn hidden" onclick="app.installPWA()">
              ${this.t('install')}
            </button>
            ${this.langBtn()}
          </div>
        </header>

        <main class="main-content">
          <div class="modes-list">
            ${MODES.map((m, i) => `
              <button class="mode-card animate-slide-up delay-${i}"
                      onclick="app.navigate('${m.id === 'period' ? 'week' : m.id}')"
                      style="--mode-grad:${m.gradient}">
                <div class="mode-icon-wrap">
                  <span class="mode-icon">${m.icon}</span>
                </div>
                <div class="mode-info">
                  <h2 class="mode-title">${this.t(m.titleKey)}</h2>
                  <p class="mode-desc">${this.t(m.descKey)}</p>
                  <span class="mode-count">${countLabels[i]}</span>
                </div>
                <span class="mode-arrow">›</span>
              </button>`).join('')}
          </div>
        </main>

        <footer class="app-footer">EpaFiles · ${this.t('tagline')}</footer>
      </div>`;

    if (this.pwaPrompt) document.getElementById('install-btn')?.classList.remove('hidden');
  }

  /* ═══════════════════════════════════════════
     PERSONNALISER — liste de dossiers libres
  ═══════════════════════════════════════════ */
  async renderCustom() {
    const folders = await this.db.getFolders('personnaliser');
    const counts  = await Promise.all(folders.map(f => this.db.getFiles(f.id).then(a => a.length)));
    const m = MODES[0];

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header" style="background:${m.gradient}">
          <button class="back-btn" onclick="app.navigate('home')">${this.t('back')}</button>
          <div class="header-center">
            <h1>${this.t('mode_custom')}</h1>
            <p>${this.t('mode_custom_desc')}</p>
          </div>
          ${this.langBtn()}
        </header>

        <main class="main-content">
          ${folders.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">📁</div>
              <h3>${this.t('no_folder')}</h3>
              <p>${this.t('no_folder_hint')}</p>
            </div>` : `
            <p class="section-label">${this.t('folders', folders.length)}</p>
            <div class="folders-grid">
              ${folders.map((f, i) => `
                <div class="folder-card animate-slide-up delay-${i%5}"
                     style="--folder-color:${f.color}">
                  <div class="folder-header"
                       onclick="app.navigate('folder',{folderId:'${f.id}',parentView:'custom'})">
                    <div class="folder-icon" style="background:${f.color}22">📁</div>
                    <div>
                      <div class="folder-name">${this.esc(f.name)}</div>
                      <div class="folder-count">${this.t('files', counts[i])}</div>
                    </div>
                  </div>
                  <div class="folder-actions">
                    <button class="action-btn rename-btn"
                            onclick="event.stopPropagation();app.showRenameModal('folder','${f.id}','${this.escAttr(f.name)}')"
                            title="${this.t('rename')}">✏️</button>
                    <button class="action-btn delete-btn"
                            onclick="app.deleteFolder('${f.id}','${this.escAttr(f.name)}')"
                            title="${this.t('delete')}">🗑️</button>
                  </div>
                </div>`).join('')}
            </div>`}
        </main>

        <button class="fab" onclick="app.showFolderModal('personnaliser')">
          <span style="margin-top:-3px">+</span>
        </button>
      </div>

      <div id="modal-folder" class="modal hidden">
        <div class="modal-overlay" onclick="app.closeModal('modal-folder')"></div>
        <div class="modal-card">
          <div class="modal-handle"></div>
          <h2 class="modal-title">${this.t('new_folder')}</h2>
          <div class="form-group">
            <label for="input-fname">${this.t('folder_name_lbl')}</label>
            <input id="input-fname" type="text" placeholder="${this.t('folder_ph')}"
                   maxlength="60" autocomplete="off" autocapitalize="sentences"
                   onkeydown="if(event.key==='Enter')app.createFolder('personnaliser')">
          </div>
          <div class="form-group">
            <label>${this.t('color')}</label>
            <div class="color-picker">
              ${FOLDER_COLORS.map((c,i)=>`
                <button class="color-option ${i===0?'selected':''}"
                        style="background:${c}" data-color="${c}"
                        onclick="app.pickColor(this)"></button>`).join('')}
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" onclick="app.closeModal('modal-folder')">${this.t('cancel')}</button>
            <button class="btn-primary"   onclick="app.createFolder('personnaliser')">${this.t('create')}</button>
          </div>
        </div>
      </div>`;
  }

  /* ═══════════════════════════════════════════
     STANDARD — fichiers directs
  ═══════════════════════════════════════════ */
  async renderStandard() {
    const files = await this.db.getFiles(STANDARD_FOLDER_ID);
    const m = MODES[1];

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header" style="background:${m.gradient}">
          <button class="back-btn" onclick="app.navigate('home')">${this.t('back')}</button>
          <div class="header-center">
            <h1>${this.t('mode_standard')}</h1>
            <p>${this.t('mode_standard_desc')}</p>
          </div>
          ${this.langBtn()}
        </header>

        <main class="main-content">
          ${files.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">📋</div>
              <h3>${this.t('empty_standard')}</h3>
              <p>${this.t('empty_standard_hint')}</p>
            </div>` : `
            <p class="section-label">${this.t('files', files.length)}</p>
            <div class="files-list">
              ${files.map((f,i) => {
                const ft = getFileType(f.type);
                return `
                  <div class="file-item animate-slide-up delay-${i%5}"
                       onclick="app.openInBrowser('${f.id}')">
                    <div class="file-icon" style="background:${ft.bg};color:${ft.color}">${ft.icon}</div>
                    <div class="file-info">
                      <div class="file-name">${this.esc(f.name)}</div>
                      <div class="file-meta">${ft.label} · ${fmtSize(f.size)}</div>
                    </div>
                    <div class="file-actions" onclick="event.stopPropagation()">
                      <button class="action-btn rename-btn"
                              onclick="app.showRenameModal('file','${f.id}','${this.escAttr(f.name)}')"
                              title="${this.t('rename')}">✏️</button>
                      <button class="action-btn delete-btn"
                              onclick="app.deleteFileStandard('${f.id}','${this.escAttr(f.name)}')"
                              title="${this.t('delete')}">🗑️</button>
                    </div>
                  </div>`;
              }).join('')}
            </div>`}
        </main>

        <input type="file" id="file-input-std" multiple accept="*/*"
               onchange="app.importFilesStandard(event)" style="display:none">
        <button class="fab" onclick="document.getElementById('file-input-std').click()">
          <span style="margin-top:-3px">+</span>
        </button>
      </div>`;
  }

  /* ═══════════════════════════════════════════
     PAR PERIODE — semaine
  ═══════════════════════════════════════════ */
  async renderWeek() {
    const stats = await Promise.all(
      WEEKS.map(async w => {
        let n = 0;
        for (const d of DAYS) n += (await this.db.getFolders(`${w.id}-${d.id}`)).length;
        return n;
      })
    );
    const m = MODES[2];

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header" style="background:${m.gradient}">
          <button class="back-btn" onclick="app.navigate('home')">${this.t('back')}</button>
          <div class="header-center">
            <h1>${this.t('mode_period')}</h1>
            <p>${this.t('select_week')}</p>
          </div>
          ${this.langBtn()}
        </header>

        <main class="main-content">
          <div class="weeks-grid">
            ${WEEKS.map((w,i) => `
              <button class="week-card animate-slide-up delay-${i}"
                      style="background:${w.gradient}"
                      onclick="app.navigate('day',{weekId:'${w.id}'})">
                <div class="week-card-inner">
                  <div class="week-badge">${w.num}</div>
                  <h2 class="week-label">${this.t('week')} ${w.num}</h2>
                  <p class="week-stats">${this.t('folders', stats[i])}</p>
                  <div class="week-arrow">→</div>
                </div>
              </button>`).join('')}
          </div>
        </main>
      </div>`;
  }

  /* ═══════════════════════════════════════════
     PAR PERIODE — jours
  ═══════════════════════════════════════════ */
  async renderDay() {
    const week = WEEKS.find(w => w.id === this.state.weekId);
    if (!week) return this.navigate('home');

    const counts   = await Promise.all(DAYS.map(d => this.db.getFolders(`${week.id}-${d.id}`).then(f => f.length)));
    const dayNames = this.t('days');
    const dayAbbrs = this.t('abbrs');

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header" style="background:${week.gradient}">
          <button class="back-btn" onclick="app.navigate('week')">${this.t('back')}</button>
          <div class="header-center">
            <h1>${this.t('week')} ${week.num}</h1>
            <p>${this.t('select_day')}</p>
          </div>
          ${this.langBtn()}
        </header>

        <main class="main-content">
          <p class="section-label">${this.t('days_of_week')}</p>
          <div class="days-grid">
            ${DAYS.map((d,i) => `
              <button class="day-card animate-slide-up delay-${i%5}"
                      style="--day-color:${d.color}"
                      onclick="app.navigate('dayfolders',{weekId:'${week.id}',dayId:'${d.id}'})">
                <div class="day-abbr">${dayAbbrs[i]}</div>
                <div class="day-name">${dayNames[i]}</div>
                <div class="day-count">${this.t('folders', counts[i])}</div>
              </button>`).join('')}
          </div>
        </main>
      </div>`;
  }

  /* ═══════════════════════════════════════════
     PAR PERIODE — dossiers du jour
  ═══════════════════════════════════════════ */
  async renderDayFolders() {
    const week = WEEKS.find(w => w.id === this.state.weekId);
    const day  = DAYS.find(d => d.id === this.state.dayId);
    if (!week || !day) return this.navigate('home');

    const dayKey  = `${week.id}-${day.id}`;
    const folders = await this.db.getFolders(dayKey);
    const counts  = await Promise.all(folders.map(f => this.db.getFiles(f.id).then(a => a.length)));
    const dayName = this.t('days')[DAYS.findIndex(d => d.id === day.id)];

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header" style="background:${week.gradient}">
          <button class="back-btn" onclick="app.navigate('day',{weekId:'${week.id}'})">${this.t('back')}</button>
          <div class="header-center">
            <h1>${dayName}</h1>
            <p>${this.t('week')} ${week.num}</p>
          </div>
          ${this.langBtn()}
        </header>

        <main class="main-content">
          ${folders.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">📁</div>
              <h3>${this.t('no_folder')}</h3>
              <p>${this.t('no_folder_hint')}</p>
            </div>` : `
            <p class="section-label">${this.t('folders', folders.length)}</p>
            <div class="folders-grid">
              ${folders.map((f, i) => `
                <div class="folder-card animate-slide-up delay-${i % 5}"
                     style="--folder-color:${f.color}">
                  <div class="folder-header"
                       onclick="app.navigate('folder',{folderId:'${f.id}',parentView:'dayfolders',weekId:'${week.id}',dayId:'${day.id}'})">
                    <div class="folder-icon" style="background:${f.color}22">📁</div>
                    <div>
                      <div class="folder-name">${this.esc(f.name)}</div>
                      <div class="folder-count">${this.t('files', counts[i])}</div>
                    </div>
                  </div>
                  <div class="folder-actions">
                    <button class="action-btn rename-btn"
                            onclick="event.stopPropagation();app.showRenameModal('folder','${f.id}','${this.escAttr(f.name)}')"
                            title="${this.t('rename')}">✏️</button>
                    <button class="action-btn delete-btn"
                            onclick="app.deleteFolder('${f.id}','${this.escAttr(f.name)}')"
                            title="${this.t('delete')}">🗑️</button>
                  </div>
                </div>`).join('')}
            </div>`}
        </main>

        <button class="fab" onclick="app.showFolderModal('${dayKey}')">
          <span style="margin-top:-3px">+</span>
        </button>
      </div>

      <div id="modal-folder" class="modal hidden">
        <div class="modal-overlay" onclick="app.closeModal('modal-folder')"></div>
        <div class="modal-card">
          <div class="modal-handle"></div>
          <h2 class="modal-title">${this.t('new_folder')}</h2>
          <div class="form-group">
            <label for="input-fname">${this.t('folder_name_lbl')}</label>
            <input id="input-fname" type="text" placeholder="${this.t('folder_ph')}"
                   maxlength="60" autocomplete="off" autocapitalize="sentences"
                   onkeydown="if(event.key==='Enter')app.createFolder('${dayKey}')">
          </div>
          <div class="form-group">
            <label>${this.t('color')}</label>
            <div class="color-picker">
              ${FOLDER_COLORS.map((c, i) => `
                <button class="color-option ${i === 0 ? 'selected' : ''}"
                        style="background:${c}" data-color="${c}"
                        onclick="app.pickColor(this)"></button>`).join('')}
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" onclick="app.closeModal('modal-folder')">${this.t('cancel')}</button>
            <button class="btn-primary"   onclick="app.createFolder('${dayKey}')">${this.t('create')}</button>
          </div>
        </div>
      </div>`;
  }

  /* ═══════════════════════════════════════════
     DOSSIER — fichiers (Personnaliser & Période)
  ═══════════════════════════════════════════ */
  async renderFolder() {
    const { folderId, parentView, weekId, dayId } = this.state;
    const folder = await this.db.getFolder(folderId);
    if (!folder) return this.navigate('home');

    const files = await this.db.getFiles(folder.id);

    // Détermination du bouton retour
    const backFn = parentView === 'custom'
      ? `app.navigate('custom')`
      : `app.navigate('dayfolders',{weekId:'${weekId}',dayId:'${dayId}'})`;

    // En-tête contextuel
    let headerBg = `linear-gradient(135deg,${folder.color},${folder.color}bb)`;
    let subTitle  = '';
    if (parentView === 'dayfolders') {
      const week = WEEKS.find(w => w.id === weekId);
      const idx  = DAYS.findIndex(d => d.id === dayId);
      subTitle = week ? `${this.t('week')} ${week.num} · ${this.t('days')[idx]}` : '';
      headerBg = week?.gradient ?? headerBg;
    }

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header"
                style="background:${parentView==='day'
                  ? (WEEKS.find(w=>w.id===weekId)?.gradient ?? folder.color)
                  : `linear-gradient(135deg,${folder.color},${folder.color}bb)`}">
          <button class="back-btn" onclick="${backFn}">${this.t('back')}</button>
          <div class="header-center">
            <h1>${this.esc(folder.name)}</h1>
            ${subTitle ? `<p>${subTitle}</p>` : ''}
          </div>
          ${this.langBtn()}
        </header>

        <main class="main-content">
          ${files.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">📎</div>
              <h3>${this.t('empty_folder')}</h3>
              <p>${this.t('empty_hint')}</p>
            </div>` : `
            <p class="section-label">${this.t('files', files.length)}</p>
            <div class="files-list">
              ${files.map((f,i) => {
                const ft = getFileType(f.type);
                return `
                  <div class="file-item animate-slide-up delay-${i%5}"
                       onclick="app.openInBrowser('${f.id}')">
                    <div class="file-icon" style="background:${ft.bg};color:${ft.color}">${ft.icon}</div>
                    <div class="file-info">
                      <div class="file-name">${this.esc(f.name)}</div>
                      <div class="file-meta">${ft.label} · ${fmtSize(f.size)}</div>
                    </div>
                    <div class="file-actions" onclick="event.stopPropagation()">
                      <button class="action-btn rename-btn"
                              onclick="app.showRenameModal('file','${f.id}','${this.escAttr(f.name)}')"
                              title="${this.t('rename')}">✏️</button>
                      <button class="action-btn delete-btn"
                              onclick="app.deleteFile('${f.id}','${this.escAttr(f.name)}')"
                              title="${this.t('delete')}">🗑️</button>
                    </div>
                  </div>`;
              }).join('')}
            </div>`}
        </main>

        <input type="file" id="file-input" multiple accept="*/*"
               onchange="app.importFiles(event,'${folder.id}')" style="display:none">
        <button class="fab" onclick="document.getElementById('file-input').click()">
          <span style="margin-top:-3px">+</span>
        </button>
      </div>

      ${parentView === 'day' ? `
      <div id="modal-folder" class="modal hidden">
        <div class="modal-overlay" onclick="app.closeModal('modal-folder')"></div>
        <div class="modal-card">
          <div class="modal-handle"></div>
          <h2 class="modal-title">${this.t('new_folder')}</h2>
          <div class="form-group">
            <label for="input-fname">${this.t('folder_name_lbl')}</label>
            <input id="input-fname" type="text" placeholder="${this.t('folder_ph')}"
                   maxlength="60" autocomplete="off" autocapitalize="sentences"
                   onkeydown="if(event.key==='Enter')app.createFolder('${dayKey}')">
          </div>
          <div class="form-group">
            <label>${this.t('color')}</label>
            <div class="color-picker">
              ${FOLDER_COLORS.map((c,i)=>`
                <button class="color-option ${i===0?'selected':''}"
                        style="background:${c}" data-color="${c}"
                        onclick="app.pickColor(this)"></button>`).join('')}
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" onclick="app.closeModal('modal-folder')">${this.t('cancel')}</button>
            <button class="btn-primary"   onclick="app.createFolder('${dayKey}')">${this.t('create')}</button>
          </div>
        </div>
      </div>` : ''}`;
  }

  /* ═══════════════════════════════════════════
     ACTIONS — Dossiers
  ═══════════════════════════════════════════ */
  showFolderModal(dayKey) {
    document.getElementById('modal-folder').classList.remove('hidden');
    setTimeout(() => document.getElementById('input-fname')?.focus(), 120);
  }

  pickColor(btn) {
    document.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  async createFolder(dayKey) {
    const name = document.getElementById('input-fname')?.value.trim();
    if (!name) { this.toast(this.t('name_required'), 'error'); return; }
    const color = document.querySelector('.color-option.selected')?.dataset.color || FOLDER_COLORS[0];
    await this.db.saveFolder({ id: uid(), dayKey, name, color, createdAt: Date.now() });
    this.closeModal('modal-folder');
    this.toast(this.t('folder_created', name), 'success');
    if (dayKey === 'personnaliser') await this.renderCustom();
    else await this.renderDayFolders();
  }

  async deleteFolder(id, name) {
    if (!confirm(this.t('confirm_folder', name))) return;
    await this.db.nukeFolderFiles(id);
    this.toast(this.t('folder_deleted'), 'info');
    if (this.state.view === 'custom') await this.renderCustom();
    else await this.renderDayFolders();
  }

  /* ═══════════════════════════════════════════
     ACTIONS — Fichiers
  ═══════════════════════════════════════════ */
  async importFiles(event, folderId) {
    const list = Array.from(event.target.files);
    if (!list.length) return;
    let ok = 0;
    for (const file of list) {
      try {
        const data = await file.arrayBuffer();
        await this.db.saveFile({ id: uid(), folderId, name: file.name, type: file.type || 'application/octet-stream', size: file.size, data, createdAt: Date.now() });
        ok++;
      } catch (e) {
        this.toast(e.name === 'QuotaExceededError' ? this.t('quota_error', file.name) : this.t('file_error', file.name), 'error');
      }
    }
    if (ok) this.toast(this.t('imported', ok), 'success');
    event.target.value = '';
    await this.renderFolder();
  }



  async importFilesStandard(event) {
    const list = Array.from(event.target.files);
    if (!list.length) return;
    let ok = 0;
    for (const file of list) {
      try {
        const data = await file.arrayBuffer();
        await this.db.saveFile({ id: uid(), folderId: STANDARD_FOLDER_ID, name: file.name, type: file.type || 'application/octet-stream', size: file.size, data, createdAt: Date.now() });
        ok++;
      } catch (e) {
        this.toast(this.t('file_error', file.name), 'error');
      }
    }
    if (ok) this.toast(this.t('imported', ok), 'success');
    event.target.value = '';
    await this.renderStandard();
  }

  async openInBrowser(id) {
    const newTab = window.open('', '_blank');
    try {
      const file = await this.db.getFile(id);
      if (!file || !file.data) { newTab?.close(); this.toast(this.t('not_found'), 'error'); return; }
      const url = URL.createObjectURL(new Blob([file.data], { type: file.type }));
      if (newTab) newTab.location.href = url;
      else { const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); document.body.removeChild(a); }
      setTimeout(() => URL.revokeObjectURL(url), 120000);
    } catch { newTab?.close(); this.toast(this.t('open_error'), 'error'); }
  }

  async deleteFile(id, name) {
    if (!confirm(this.t('confirm_file', name))) return;
    await this.db.deleteFile(id);
    this.toast(this.t('file_deleted'), 'info');
    await this.renderFolder();
  }

  async deleteFileStandard(id, name) {
    if (!confirm(this.t('confirm_file', name))) return;
    await this.db.deleteFile(id);
    this.toast(this.t('file_deleted'), 'info');
    await this.renderStandard();
  }

  closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

  /* ═══════════════════════════════════════════
     RENOMMAGE
  ═══════════════════════════════════════════ */
  showRenameModal(type, id, currentName) {
    document.getElementById('rename-modal')?.remove();
    const isFolder = type === 'folder';
    const modal = document.createElement('div');
    modal.id = 'rename-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="app.closeRenameModal()"></div>
      <div class="modal-card">
        <div class="modal-handle"></div>
        <h2 class="modal-title">${isFolder ? '📁' : '📄'} ${this.t(isFolder ? 'rename_folder' : 'rename_file')}</h2>
        <div class="form-group">
          <label>${this.t('folder_name_lbl')}</label>
          <input id="rename-input" type="text" value="${this.esc(currentName)}"
                 placeholder="${this.t('rename_ph')}" maxlength="100" autocomplete="off"
                 onkeydown="if(event.key==='Enter')app.applyRename('${type}','${id}')">
        </div>
        <div class="modal-actions">
          <button class="btn-secondary" onclick="app.closeRenameModal()">${this.t('cancel')}</button>
          <button class="btn-primary"   onclick="app.applyRename('${type}','${id}')">${this.t('save')}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    requestAnimationFrame(() => {
      const input = document.getElementById('rename-input');
      const dot = currentName.lastIndexOf('.');
      input.focus();
      input.setSelectionRange(0, !isFolder && dot > 0 ? dot : currentName.length);
    });
  }

  async applyRename(type, id) {
    const newName = document.getElementById('rename-input')?.value.trim();
    if (!newName) return;
    this.closeRenameModal();
    if (type === 'folder') {
      const f = await this.db.getFolder(id);
      if (f) { await this.db.saveFolder({ ...f, name: newName }); this.toast(this.t('renamed_ok', newName), 'success'); }
      if (this.state.view === 'custom') await this.renderCustom();
      else await this.renderFolder();
    } else {
      const f = await this.db.getFile(id);
      if (f) { await this.db.saveFile({ ...f, name: newName }); this.toast(this.t('renamed_ok', newName), 'success'); }
      if (this.state.view === 'standard') await this.renderStandard();
      else await this.renderFolder();
    }
  }

  closeRenameModal() {
    const m = document.getElementById('rename-modal');
    if (m) { m.classList.add('hidden'); setTimeout(() => m.remove(), 200); }
  }

  /* ═══════════════════════════════════════════
     LANGUE
  ═══════════════════════════════════════════ */
  langBtn() {
    const flag = this.lang === 'fr' ? '🇫🇷' : '🇬🇧';
    return `<button class="lang-btn" onclick="app.showLangSheet()" title="Language">
              <span class="lang-globe">🌐</span>
              <span class="lang-code">${flag} ${this.lang.toUpperCase()}</span>
            </button>`;
  }

  showLangSheet() {
    document.getElementById('lang-sheet')?.remove();
    const s = document.createElement('div');
    s.id = 'lang-sheet';
    s.innerHTML = `
      <div class="lang-overlay" onclick="app.closeLangSheet()"></div>
      <div class="lang-panel">
        <div class="lang-panel-handle"></div>
        <p class="lang-panel-title">🌐 Choisir la langue</p>
        <div class="lang-options">
          <button class="lang-option ${this.lang==='fr'?'active':''}" onclick="app.selectLang('fr')">
            <span class="lang-opt-flag">🇫🇷</span>
            <div class="lang-opt-text"><span class="lang-opt-name">Français</span><span class="lang-opt-sub">French</span></div>
            ${this.lang==='fr'?'<span class="lang-opt-check">✓</span>':''}
          </button>
          <button class="lang-option ${this.lang==='en'?'active':''}" onclick="app.selectLang('en')">
            <span class="lang-opt-flag">🇬🇧</span>
            <div class="lang-opt-text"><span class="lang-opt-name">English</span><span class="lang-opt-sub">Anglais</span></div>
            ${this.lang==='en'?'<span class="lang-opt-check">✓</span>':''}
          </button>
        </div>
      </div>`;
    document.body.appendChild(s);
    requestAnimationFrame(() => s.classList.add('open'));
  }

  selectLang(lang) { this.closeLangSheet(); this.setLang(lang); }
  closeLangSheet() {
    const s = document.getElementById('lang-sheet');
    if (s) { s.classList.remove('open'); setTimeout(() => s.remove(), 320); }
  }

  /* ═══════════════════════════════════════════
     PWA & BANNIERES
  ═══════════════════════════════════════════ */
  async installPWA() {
    if (!this.pwaPrompt) return;
    this.pwaPrompt.prompt();
    const { outcome } = await this.pwaPrompt.userChoice;
    if (outcome === 'accepted') { this.pwaPrompt = null; document.getElementById('install-btn')?.classList.add('hidden'); }
  }

  showIOSInstallBanner() {
    if (document.getElementById('ios-banner')) return;
    const b = document.createElement('div');
    b.id = 'ios-banner'; b.className = 'ios-banner';
    b.innerHTML = `
      <button class="ios-banner-close" onclick="this.parentElement.remove()">✕</button>
      <div class="ios-banner-icon">${this.logo()}</div>
      <div class="ios-banner-text">
        <strong>${this.t('ios_title')}</strong>
        <span>${this.t('ios_hint')}</span>
      </div>
      <div class="ios-banner-arrow">▼</div>`;
    document.body.appendChild(b);
    requestAnimationFrame(() => b.classList.add('show'));
  }

  showUpdateBanner() {
    if (document.getElementById('update-banner')) return;
    const b = document.createElement('div');
    b.id = 'update-banner'; b.className = 'update-banner';
    b.innerHTML = `
      <span class="update-icon">🎉</span>
      <div class="update-text">
        <strong>${this.t('update_title')}</strong>
        <span>${this.t('update_hint')}</span>
      </div>
      <button class="update-btn" onclick="location.reload()">${this.t('update_btn')}</button>
      <button class="update-close" onclick="this.parentElement.remove()">✕</button>`;
    document.body.appendChild(b);
    requestAnimationFrame(() => b.classList.add('show'));
  }

  /* ═══════════════════════════════════════════
     UTILITAIRES
  ═══════════════════════════════════════════ */
  track(event, params = {}) { if (typeof gtag === 'function') gtag('event', event, params); }

  toast(msg, type = 'info') {
    const el = Object.assign(document.createElement('div'), { className: `toast toast-${type}`, textContent: msg });
    document.getElementById('toast-container').appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 3000);
  }

  esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
  escAttr(s) { return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

  logo() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" class="logo-svg" role="img" aria-label="EpaFiles">
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7C3AED"/>
          <stop offset="100%" stop-color="#EC4899"/>
        </linearGradient>
        <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#A78BFA"/>
          <stop offset="100%" stop-color="#F9A8D4"/>
        </linearGradient>
      </defs>
      <path d="M14 12 L64 12 L86 34 L86 112 Q86 118 80 118 L20 118 Q14 118 14 112 Z" fill="url(#lg1)"/>
      <path d="M64 12 L64 34 L86 34 Z" fill="url(#lg2)" opacity="0.65"/>
      <text x="50" y="84" text-anchor="middle" fill="white"
            font-size="50" font-family="Georgia,'Times New Roman',serif" font-weight="bold">π</text>
    </svg>`;
  }
}

const app = new EpaApp();
app.init();
