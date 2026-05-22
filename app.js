'use strict';

/* ─── Static data ─── */
const WEEKS = [
  { id: 'semaine-1', label: 'Semaine 1', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'semaine-2', label: 'Semaine 2', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 'semaine-3', label: 'Semaine 3', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'semaine-4', label: 'Semaine 4', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
];

const DAYS = [
  { id: 'lundi',    label: 'Lundi',    color: '#6366f1', abbr: 'LUN' },
  { id: 'mardi',    label: 'Mardi',    color: '#8b5cf6', abbr: 'MAR' },
  { id: 'mercredi', label: 'Mercredi', color: '#06b6d4', abbr: 'MER' },
  { id: 'jeudi',    label: 'Jeudi',    color: '#10b981', abbr: 'JEU' },
  { id: 'vendredi', label: 'Vendredi', color: '#f59e0b', abbr: 'VEN' },
  { id: 'samedi',   label: 'Samedi',   color: '#ec4899', abbr: 'SAM' },
  { id: 'dimanche', label: 'Dimanche', color: '#ef4444', abbr: 'DIM' },
];

const FOLDER_COLORS = [
  '#6366f1','#8b5cf6','#ec4899','#ef4444',
  '#f59e0b','#10b981','#06b6d4','#3b82f6',
];

function getFileType(mime) {
  if (!mime) return { icon: '📎', label: 'Fichier', bg: '#94a3b820', color: '#64748b' };
  if (mime === 'application/pdf')           return { icon: '📄', label: 'PDF',    bg: '#fee2e2', color: '#ef4444' };
  if (mime.includes('word') || mime.includes('document'))
                                            return { icon: '📝', label: 'Word',   bg: '#dbeafe', color: '#3b82f6' };
  if (mime.includes('excel') || mime.includes('sheet'))
                                            return { icon: '📊', label: 'Excel',  bg: '#d1fae5', color: '#10b981' };
  if (mime.includes('powerpoint') || mime.includes('presentation'))
                                            return { icon: '📑', label: 'PPT',    bg: '#fef3c7', color: '#f59e0b' };
  if (mime === 'text/plain')                return { icon: '📃', label: 'Texte',  bg: '#ede9fe', color: '#8b5cf6' };
  if (mime.includes('zip') || mime.includes('rar') || mime.includes('7z'))
                                            return { icon: '🗜️', label: 'Archive', bg: '#f3e8ff', color: '#a855f7' };
  if (mime.startsWith('image/'))            return { icon: '🖼️', label: 'Image',  bg: '#fce7f3', color: '#ec4899' };
  if (mime.startsWith('video/'))            return { icon: '🎬', label: 'Vidéo',  bg: '#ede9fe', color: '#7c3aed' };
  if (mime.startsWith('audio/'))            return { icon: '🎵', label: 'Audio',  bg: '#fef3c7', color: '#d97706' };
  return { icon: '📎', label: 'Fichier', bg: '#f1f5f9', color: '#64748b' };
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function fmtSize(b) {
  if (b < 1024)           return b + ' o';
  if (b < 1024 * 1024)   return (b / 1024).toFixed(1) + ' Ko';
  if (b < 1024 ** 3)     return (b / 1024 ** 2).toFixed(1) + ' Mo';
  return (b / 1024 ** 3).toFixed(1) + ' Go';
}

/* ─── IndexedDB wrapper ─── */
class DB {
  constructor() { this.db = null; }

  open() {
    return new Promise((res, rej) => {
      const req = indexedDB.open('EpaFilesDB', 1);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('folders')) {
          db.createObjectStore('folders', { keyPath: 'id' })
            .createIndex('dayKey', 'dayKey');
        }
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id' })
            .createIndex('folderId', 'folderId');
        }
      };
      req.onsuccess = e => { this.db = e.target.result; res(); };
      req.onerror = () => rej(req.error);
    });
  }

  _q(store, mode, fn) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store, mode);
      const st = tx.objectStore(store);
      const req = fn(st);
      req.onsuccess = () => res(req.result);
      req.onerror  = () => rej(req.error);
    });
  }

  get  = (store, key)    => this._q(store, 'readonly',  s => s.get(key));
  put  = (store, data)   => this._q(store, 'readwrite', s => s.put(data));
  del  = (store, key)    => this._q(store, 'readwrite', s => s.delete(key));
  idx  = (store, ix, k)  => this._q(store, 'readonly',  s => s.index(ix).getAll(k));

  async getFolders(dayKey)   { return this.idx('folders', 'dayKey', dayKey); }
  async getFolder(id)        { return this.get('folders', id); }
  async saveFolder(f)        { return this.put('folders', f); }
  async deleteFolder(id)     { return this.del('folders', id); }

  async getFiles(folderId)   { return this.idx('files', 'folderId', folderId); }
  async getFile(id)          { return this.get('files', id); }
  async saveFile(f)          { return this.put('files', f); }
  async deleteFile(id)       { return this.del('files', id); }

  async nukeFolderFiles(folderId) {
    const files = await this.getFiles(folderId);
    for (const f of files) await this.deleteFile(f.id);
    await this.deleteFolder(folderId);
  }
}

/* ─── App ─── */
class EpaApp {
  constructor() {
    this.db = new DB();
    this.state = { view: 'splash', weekId: null, dayId: null, folderId: null };
    this.pwaPrompt = null;
    this.$app = null;
  }

  async init() {
    this.$app = document.getElementById('app');
    await this.db.open();

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.pwaPrompt = e;
      document.getElementById('install-btn')?.classList.remove('hidden');
    });

    window.addEventListener('appinstalled', () => {
      this.toast('EpaFiles installé avec succès !', 'success');
      this.pwaPrompt = null;
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape')
        document.querySelectorAll('.modal:not(.hidden)').forEach(m => m.classList.add('hidden'));
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});

      // Écoute la notification de mise à jour envoyée par le service worker
      navigator.serviceWorker.addEventListener('message', e => {
        if (e.data?.type === 'APP_UPDATED') this.showUpdateBanner();
      });
    }

    // Sur iOS, afficher le guide d'installation après 3 s si pas encore installé
    const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone === true;
    if (isIOS && !isStandalone) {
      setTimeout(() => this.showIOSInstallBanner(), 3500);
    }

    // Bouton retour du téléphone : restaure la vue précédente dans l'app
    window.addEventListener('popstate', e => {
      if (e.state?.appState) {
        this.state = e.state.appState;
        this.render();
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });

    this.renderSplash();
    setTimeout(() => this.navigate('home'), 2200);
  }

  navigate(view, params = {}) {
    this.state = { ...this.state, view, ...params };
    // home = replaceState (pas d'entrée supplémentaire, retour = quitter l'app)
    // autres vues = pushState (retour = vue précédente)
    const method = view === 'home' ? 'replaceState' : 'pushState';
    history[method]({ appState: { ...this.state } }, '');
    this.render();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  async render() {
    switch (this.state.view) {
      case 'home':   await this.renderHome();   break;
      case 'week':   await this.renderWeek();   break;
      case 'day':    await this.renderDay();    break;
      case 'folder': await this.renderFolder(); break;
    }
  }

  /* ── Splash ── */
  renderSplash() {
    this.$app.innerHTML = `
      <div class="splash">
        <div class="splash-orb-1"></div>
        <div class="splash-orb-2"></div>
        <div class="splash-content">
          <div class="splash-logo animate-bounce-in">${this.logo()}</div>
          <h1 class="splash-title animate-fade-up" style="animation-delay:0.3s">EpaFiles</h1>
          <p class="splash-sub animate-fade-up" style="animation-delay:0.5s">Organisez votre apprentissage</p>
        </div>
        <div class="splash-loader"><div class="loader-bar"></div></div>
      </div>`;
  }

  /* ── Home ── */
  async renderHome() {
    const stats = await Promise.all(
      WEEKS.map(async w => {
        let n = 0;
        for (const d of DAYS) n += (await this.db.getFolders(`${w.id}-${d.id}`)).length;
        return n;
      })
    );

    this.$app.innerHTML = `
      <div class="page home-page">
        <header class="home-header">
          <div class="home-header-content">
            <div class="logo-small">${this.logo()}</div>
            <div>
              <h1 class="app-title">EpaFiles</h1>
              <p class="app-subtitle">Choisissez une semaine</p>
            </div>
          </div>
          <button id="install-btn" class="install-btn hidden" onclick="app.installPWA()">
            ⬇️ Installer
          </button>
        </header>

        <main class="main-content">
          <p class="section-label">Mes semaines</p>
          <div class="weeks-grid">
            ${WEEKS.map((w, i) => `
              <button class="week-card animate-slide-up delay-${i}"
                      style="background:${w.gradient}"
                      onclick="app.navigate('week',{weekId:'${w.id}'})">
                <div class="week-card-inner">
                  <div class="week-badge">${i + 1}</div>
                  <h2 class="week-label">${w.label}</h2>
                  <p class="week-stats">${stats[i]} dossier${stats[i] !== 1 ? 's' : ''}</p>
                  <div class="week-arrow">→</div>
                </div>
              </button>`).join('')}
          </div>
        </main>

        <footer class="app-footer">EpaFiles · Organisez votre apprentissage</footer>
      </div>`;

    if (this.pwaPrompt)
      document.getElementById('install-btn')?.classList.remove('hidden');
  }

  /* ── Week ── */
  async renderWeek() {
    const week = WEEKS.find(w => w.id === this.state.weekId);
    if (!week) return this.navigate('home');

    const counts = await Promise.all(
      DAYS.map(d => this.db.getFolders(`${week.id}-${d.id}`).then(f => f.length))
    );

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header" style="background:${week.gradient}">
          <button class="back-btn" onclick="app.navigate('home')">← Retour</button>
          <div class="header-center">
            <h1>${week.label}</h1>
            <p>Sélectionnez un jour</p>
          </div>
          <div class="header-space"></div>
        </header>

        <main class="main-content">
          <p class="section-label">Jours de la semaine</p>
          <div class="days-grid">
            ${DAYS.map((d, i) => `
              <button class="day-card animate-slide-up delay-${i % 5}"
                      style="--day-color:${d.color}"
                      onclick="app.navigate('day',{dayId:'${d.id}'})">
                <div class="day-abbr">${d.abbr}</div>
                <div class="day-name">${d.label}</div>
                <div class="day-count">${counts[i]} dossier${counts[i] !== 1 ? 's' : ''}</div>
              </button>`).join('')}
          </div>
        </main>
      </div>`;
  }

  /* ── Day ── */
  async renderDay() {
    const week = WEEKS.find(w => w.id === this.state.weekId);
    const day  = DAYS.find(d => d.id === this.state.dayId);
    if (!week || !day) return this.navigate('home');

    const dayKey  = `${week.id}-${day.id}`;
    const folders = await this.db.getFolders(dayKey);
    const counts  = await Promise.all(folders.map(f => this.db.getFiles(f.id).then(a => a.length)));

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header" style="background:${week.gradient}">
          <button class="back-btn" onclick="app.navigate('week',{weekId:'${week.id}'})">← Retour</button>
          <div class="header-center">
            <h1>${day.label}</h1>
            <p>${week.label}</p>
          </div>
          <div class="header-space"></div>
        </header>

        <main class="main-content">
          ${folders.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">📁</div>
              <h3>Aucun dossier</h3>
              <p>Appuyez sur + pour créer votre premier dossier</p>
            </div>` : `
            <p class="section-label">${folders.length} dossier${folders.length !== 1 ? 's' : ''}</p>
            <div class="folders-grid">
              ${folders.map((f, i) => `
                <div class="folder-card animate-slide-up delay-${i % 5}"
                     style="--folder-color:${f.color}">
                  <div class="folder-header"
                       onclick="app.openFolder('${f.id}')">
                    <div class="folder-icon" style="background:${f.color}22">📁</div>
                    <div>
                      <div class="folder-name">${this.esc(f.name)}</div>
                      <div class="folder-count">${counts[i]} fichier${counts[i] !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div class="folder-actions">
                    <button class="action-btn delete-btn"
                            onclick="app.deleteFolder('${f.id}','${this.escAttr(f.name)}')"
                            title="Supprimer">🗑️</button>
                  </div>
                </div>`).join('')}
            </div>`}
        </main>

        <button class="fab" onclick="app.showFolderModal('${dayKey}')" title="Nouveau dossier">
          <span style="margin-top:-3px">+</span>
        </button>
      </div>

      <!-- Create Folder Modal -->
      <div id="modal-folder" class="modal hidden">
        <div class="modal-overlay" onclick="app.closeModal('modal-folder')"></div>
        <div class="modal-card">
          <div class="modal-handle"></div>
          <h2 class="modal-title">Nouveau dossier</h2>
          <div class="form-group">
            <label for="input-fname">Nom du dossier</label>
            <input id="input-fname" type="text" placeholder="Ex : Cours de mathématiques"
                   maxlength="60" autocomplete="off" autocapitalize="sentences"
                   onkeydown="if(event.key==='Enter') app.createFolder('${dayKey}')">
          </div>
          <div class="form-group">
            <label>Couleur</label>
            <div class="color-picker">
              ${FOLDER_COLORS.map((c, i) => `
                <button class="color-option ${i === 0 ? 'selected' : ''}"
                        style="background:${c}"
                        data-color="${c}"
                        onclick="app.pickColor(this)"
                        aria-label="Couleur ${c}"></button>`).join('')}
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" onclick="app.closeModal('modal-folder')">Annuler</button>
            <button class="btn-primary"   onclick="app.createFolder('${dayKey}')">Créer</button>
          </div>
        </div>
      </div>`;
  }

  /* ── Folder ── */
  async renderFolder() {
    const week   = WEEKS.find(w => w.id === this.state.weekId);
    const day    = DAYS.find(d => d.id === this.state.dayId);
    const folder = await this.db.getFolder(this.state.folderId);
    if (!week || !day || !folder) return this.navigate('home');

    const files = await this.db.getFiles(folder.id);

    this.$app.innerHTML = `
      <div class="page">
        <header class="page-header"
                style="background:linear-gradient(135deg,${folder.color},${folder.color}bb)">
          <button class="back-btn" onclick="app.navigate('day',{dayId:'${day.id}'})">← Retour</button>
          <div class="header-center">
            <h1>${this.esc(folder.name)}</h1>
            <p>${week.label} · ${day.label}</p>
          </div>
          <div class="header-space"></div>
        </header>

        <main class="main-content">
          ${files.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">📎</div>
              <h3>Dossier vide</h3>
              <p>Appuyez sur + pour importer vos fichiers<br>(PDF, photos, vidéos, documents…)</p>
            </div>` : `
            <p class="section-label">${files.length} fichier${files.length !== 1 ? 's' : ''}</p>
            <div class="files-list">
              ${files.map((f, i) => {
                const ft = getFileType(f.type);
                return `
                  <div class="file-item animate-slide-up delay-${i % 5}"
                       onclick="app.openInBrowser('${f.id}')">
                    <div class="file-icon" style="background:${ft.bg};color:${ft.color}">${ft.icon}</div>
                    <div class="file-info">
                      <div class="file-name">${this.esc(f.name)}</div>
                      <div class="file-meta">${ft.label} · ${fmtSize(f.size)}</div>
                    </div>
                    <div class="file-actions" onclick="event.stopPropagation()">
                      <button class="action-btn delete-btn"
                              onclick="app.deleteFile('${f.id}','${this.escAttr(f.name)}')"
                              title="Supprimer">🗑️</button>
                    </div>
                  </div>`;
              }).join('')}
            </div>`}
        </main>

        <input type="file" id="file-input" multiple accept="*/*"
               onchange="app.importFiles(event,'${folder.id}')" style="display:none">
        <button class="fab" onclick="document.getElementById('file-input').click()" title="Importer des fichiers">
          <span style="margin-top:-3px">+</span>
        </button>
      </div>`;
  }

  /* ── Actions ── */
  openFolder(id) {
    this.navigate('folder', { folderId: id });
  }

  showFolderModal(dayKey) {
    this._dayKey = dayKey;
    document.getElementById('modal-folder').classList.remove('hidden');
    setTimeout(() => document.getElementById('input-fname')?.focus(), 120);
  }

  pickColor(btn) {
    document.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  async createFolder(dayKey) {
    const name = document.getElementById('input-fname')?.value.trim();
    if (!name) { this.toast('Entrez un nom pour le dossier', 'error'); return; }
    const color = document.querySelector('.color-option.selected')?.dataset.color || FOLDER_COLORS[0];
    await this.db.saveFolder({ id: uid(), dayKey, name, color, createdAt: Date.now() });
    this.closeModal('modal-folder');
    this.toast(`Dossier "${name}" créé`, 'success');
    await this.renderDay();
  }

  async deleteFolder(id, name) {
    if (!confirm(`Supprimer le dossier "${name}" et tous ses fichiers ?`)) return;
    await this.db.nukeFolderFiles(id);
    this.toast('Dossier supprimé', 'info');
    await this.renderDay();
  }

  async importFiles(event, folderId) {
    const list = Array.from(event.target.files);
    if (!list.length) return;
    let ok = 0;
    for (const file of list) {
      try {
        const data = await file.arrayBuffer();
        await this.db.saveFile({
          id: uid(), folderId,
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size,
          data,
          createdAt: Date.now(),
        });
        ok++;
      } catch (e) {
        const msg = e.name === 'QuotaExceededError'
          ? `Stockage insuffisant pour ${file.name}`
          : `Erreur : ${file.name}`;
        this.toast(msg, 'error');
      }
    }
    if (ok) this.toast(`${ok} fichier${ok > 1 ? 's' : ''} importé${ok > 1 ? 's' : ''}`, 'success');
    event.target.value = '';
    await this.renderFolder();
  }


  async openInBrowser(id) {
    const file = await this.db.getFile(id);
    if (!file) return;
    const url = URL.createObjectURL(new Blob([file.data], { type: file.type }));
    window.open(url, '_blank', 'noopener');
    setTimeout(() => URL.revokeObjectURL(url), 120000);
  }

  async downloadFile(id) {
    const file = await this.db.getFile(id);
    if (!file) return;
    const url = URL.createObjectURL(new Blob([file.data], { type: file.type }));
    Object.assign(document.createElement('a'), { href: url, download: file.name }).click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  async deleteFile(id, name) {
    if (!confirm(`Supprimer "${name}" ?`)) return;
    await this.db.deleteFile(id);
    this.toast('Fichier supprimé', 'info');
    await this.renderFolder();
  }

  closeModal(id) {
    document.getElementById(id)?.classList.add('hidden');
  }

  async installPWA() {
    if (!this.pwaPrompt) return;
    this.pwaPrompt.prompt();
    const { outcome } = await this.pwaPrompt.userChoice;
    if (outcome === 'accepted') {
      this.pwaPrompt = null;
      document.getElementById('install-btn')?.classList.add('hidden');
    }
  }

  /* ── Utilities ── */
  toast(msg, type = 'info') {
    const el = Object.assign(document.createElement('div'), {
      className: `toast toast-${type}`,
      textContent: msg,
    });
    document.getElementById('toast-container').appendChild(el);
    requestAnimationFrame(() => { requestAnimationFrame(() => el.classList.add('show')); });
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }

  esc(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  escAttr(s) {
    return String(s).replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  showIOSInstallBanner() {
    if (document.getElementById('ios-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'ios-banner';
    banner.className = 'ios-banner';
    banner.innerHTML = `
      <button class="ios-banner-close" onclick="this.parentElement.remove()">✕</button>
      <div class="ios-banner-icon">${this.logo()}</div>
      <div class="ios-banner-text">
        <strong>Installer EpaFiles</strong>
        <span>Appuyez sur <b>⬆️ Partager</b> puis <b>"Sur l'écran d'accueil"</b></span>
      </div>
      <div class="ios-banner-arrow">▼</div>
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('show'));
  }

  showUpdateBanner() {
    if (document.getElementById('update-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'update-banner';
    banner.className = 'update-banner';
    banner.innerHTML = `
      <span class="update-icon">🎉</span>
      <div class="update-text">
        <strong>Mise à jour disponible</strong>
        <span>Une nouvelle version d'EpaFiles est prête</span>
      </div>
      <button class="update-btn" onclick="location.reload()">Mettre à jour</button>
      <button class="update-close" onclick="this.parentElement.remove()">✕</button>
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('show'));
  }

  logo() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" class="logo-svg" role="img" aria-label="EpaFiles logo">
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
            font-size="50" font-family="Georgia,'Times New Roman',serif"
            font-weight="bold">π</text>
    </svg>`;
  }
}

const app = new EpaApp();
app.init();
