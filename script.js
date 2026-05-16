const cfg = window.RYOTAQC_CONTENT || {};

const q = (selector, root = document) => root.querySelector(selector);
const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
const asArray = (value) => (Array.isArray(value) ? value : []);

const getCurrentPageKey = () => document.body?.dataset?.page || "home";

const getMaintenanceDevContext = () => {
  const maintenance = cfg.site?.maintenance || {};
  const dev = maintenance.devAccess || {};

  const queryParam = dev.queryParam || "dev_key";
  const viewParam = dev.viewParam || "dev_view";
  const logoutParam = dev.logoutParam || "dev_logout";
  const storageKey = dev.storageKey || "ryotaqc_dev_access";
  const viewStorageKey = `${storageKey}_view`;
  const token = dev.token || "";
  const defaultUnlockedView = dev.defaultUnlockedView === "maintenance" ? "maintenance" : "site";

  const url = new URL(window.location.href);

  const setLocal = (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (_err) {}
  };

  const getLocal = (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (_err) {
      return null;
    }
  };

  const removeLocal = (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (_err) {}
  };

  const setSession = (key, value) => {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (_err) {}
  };

  const getSession = (key) => {
    try {
      return window.sessionStorage.getItem(key);
    } catch (_err) {
      return null;
    }
  };

  const removeSession = (key) => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (_err) {}
  };

  if (url.searchParams.get(logoutParam) === "1") {
    removeLocal(storageKey);
    removeSession(viewStorageKey);
    url.searchParams.delete(logoutParam);
  }

  let canBypass = false;
  const host = window.location.hostname;
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(host) || host.startsWith("127.");

  if (dev.allowLocalhost && isLocalHost) {
    canBypass = true;
    setLocal(storageKey, "1");
  }

  const unlockValue = url.searchParams.get(queryParam);
  if (token && unlockValue && unlockValue === token) {
    canBypass = true;
    setLocal(storageKey, "1");
    url.searchParams.delete(queryParam);
  }

  if (getLocal(storageKey) === "1") {
    canBypass = true;
  }

  const requestedView = url.searchParams.get(viewParam);
  if (requestedView === "site" || requestedView === "maintenance") {
    setSession(viewStorageKey, requestedView);
    url.searchParams.delete(viewParam);
  }

  if (canBypass && !getSession(viewStorageKey)) {
    setSession(viewStorageKey, defaultUnlockedView);
  }

  const devView = canBypass ? getSession(viewStorageKey) || defaultUnlockedView : "maintenance";
  const showNormalSite = canBypass && devView === "site";

  const cleanUrl = `${url.pathname}${url.search}${url.hash}`;
  const oldUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (cleanUrl !== oldUrl) {
    window.history.replaceState({}, "", cleanUrl);
  }

  return {
    canBypass,
    showNormalSite,
    goSiteLabel: dev.goSiteLabel || "Go Site",
    backLabel: dev.backLabel || "Back Maintenance",
    setView: (mode) => {
      if (!canBypass) {
        return;
      }
      setSession(viewStorageKey, mode === "maintenance" ? "maintenance" : "site");
      window.location.reload();
    }
  };
};

const renderTopNote = () => {
  const topNote = q("#top-note");
  if (!topNote) {
    return;
  }

  const noteText = cfg.site?.topNote || "";
  if (!String(noteText).trim()) {
    topNote.innerHTML = "";
    topNote.style.display = "none";
    return;
  }

  topNote.style.display = "block";
  topNote.innerHTML = `
    <div class="top-note-inner">
      <span>${noteText}</span>
    </div>
  `;
};

const renderHeader = (pageKey) => {
  const header = q("#site-header");
  if (!header) {
    return;
  }

  const nav = asArray(cfg.site?.nav);

  header.innerHTML = `
    <div class="header-inner">
      <a class="site-logo" href="index.html" aria-label="Beranda ${cfg.site?.title || "RyotaQC"}">
        <span class="logo-dot"></span>
        <div>
          <strong>${cfg.site?.logoText || "RYOTAQC"}</strong>
          <small>${cfg.site?.subtitle || "Portal"}</small>
        </div>
      </a>

      <nav class="main-nav" aria-label="Navigasi utama">
        ${nav
          .map(
            (item) => `
          <a href="${item.href}" class="${item.key === pageKey ? "active" : ""}">${item.label}</a>
        `
          )
          .join("")}
      </nav>

      <button class="menu-toggle" type="button" data-open-menu>${cfg.site?.menuLabel || "Menu"}</button>
    </div>

    <div class="mobile-backdrop" data-close-menu></div>

    <aside class="mobile-drawer" aria-label="Menu mobile">
      <div class="drawer-head">
        <strong>Menu</strong>
        <button type="button" class="drawer-close" data-close-menu aria-label="Tutup menu">x</button>
      </div>
      <div class="drawer-links">
        ${nav
          .map(
            (item) => `
          <a href="${item.href}" class="${item.key === pageKey ? "active" : ""}" data-mobile-link>${item.label}</a>
        `
          )
          .join("")}
      </div>
    </aside>
  `;

  q("[data-open-menu]", header)?.addEventListener("click", () => {
    document.body.classList.add("menu-open");
  });

  qa("[data-close-menu]", header).forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    });
  });

  qa("[data-mobile-link]", header).forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    });
  });
};

const renderFooter = (maintenanceMode = false) => {
  const footer = q("#site-footer");
  if (!footer) {
    return;
  }

  if (maintenanceMode) {
    footer.innerHTML = `
      <span>${cfg.site?.title || "RyotaQC"}</span>
      <span>Maintenance Mode</span>
    `;
    return;
  }

  footer.innerHTML = `
    <span>${cfg.footer?.left || "RyotaQC"}</span>
    <span>${cfg.footer?.right || "Portal"}</span>
  `;
};

const renderPostCard = (item) => `
  <article class="post-card">
    ${
      item.image
        ? `<figure><img src="${item.image}" alt="${item.imageAlt || item.title || "Gambar"}" loading="lazy" /></figure>`
        : ""
    }
    <div class="post-body">
      <div class="post-meta">
        <span>${item.category || "Article"}</span>
        <time>${item.date || "-"}</time>
      </div>
      <h3>${item.title || "Judul"}</h3>
      <p>${item.excerpt || ""}</p>
    </div>
  </article>
`;

const renderSoftwareRow = (item) => `
  <article class="software-row">
    <a class="software-thumb" href="${item.href || "#"}">
      <img src="${item.image || ""}" alt="${item.imageAlt || item.title || "Software image"}" loading="lazy" />
    </a>
    <div class="software-main">
      <h3><a href="${item.href || "#"}">${item.title || "Software Title"}</a></h3>
      <div class="software-meta">
        <span class="software-meta-bar" aria-hidden="true"></span>
        <a href="${item.categoryLink || "#"}">${item.category || "SOFTWARE"}</a>
        <span>/ ${item.date || "-"}</span>
        <a href="${item.commentsLink || "#"}">/ ${item.comments || "NO COMMENT"}</a>
      </div>
      <p>${item.excerpt || ""}</p>
    </div>
  </article>
`;

const renderSidebar = () => {
  const sidebar = cfg.site?.sidebar || {};
  const categories = asArray(sidebar.categories);
  const popular = asArray(sidebar.popular);

  return `
    <aside class="sidebar">
      <section class="side-card">
        <h4>${sidebar.aboutTitle || "Tentang"}</h4>
        <p>${sidebar.aboutBody || ""}</p>
      </section>

      <section class="side-card">
        <h4>${sidebar.categoriesTitle || "Kategori"}</h4>
        <div class="chip-list">
          ${categories.map((cat) => `<span>${cat}</span>`).join("")}
        </div>
      </section>

      <section class="side-card">
        <h4>${sidebar.popularTitle || "Populer"}</h4>
        <ol>
          ${popular.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </section>
    </aside>
  `;
};

const renderHomePage = () => {
  const page = cfg.pages?.home || {};
  const sections = asArray(page.sections);

  const sectionBlocks = sections.length
    ? sections
        .map(
          (section) => `
        <section class="software-section">
          <header class="software-section-head">
            <h2>${section.title || "Software Terbaru"}</h2>
            <div class="software-head-nav" aria-hidden="true">
              <button type="button" class="software-nav-btn">${section.sliderPrevLabel || "\u00AB"}</button>
              <button type="button" class="software-nav-btn">${section.sliderNextLabel || "\u00BB"}</button>
            </div>
          </header>
          <div class="software-divider"></div>
          <div class="software-list">
            ${asArray(section.items).map((item) => renderSoftwareRow(item)).join("")}
          </div>
        </section>
      `
        )
        .join("")
    : `
      <section class="software-section">
        <header class="software-section-head">
          <h2>${page.sectionTitle || "Software Terbaru"}</h2>
          <div class="software-head-nav" aria-hidden="true">
            <button type="button" class="software-nav-btn">${page.sliderPrevLabel || "\u00AB"}</button>
            <button type="button" class="software-nav-btn">${page.sliderNextLabel || "\u00BB"}</button>
          </div>
        </header>
        <div class="software-divider"></div>
        <div class="software-list">
          ${asArray(page.softwareItems).map((item) => renderSoftwareRow(item)).join("")}
        </div>
      </section>
    `;

  return `
    <div class="home-sections">
      ${sectionBlocks}
    </div>
  `;
};

const renderArticlesPage = () => {
  const page = cfg.pages?.articles || {};

  return `
    <section class="page-head">
      <h1>${page.pageTitle || "Artikel"}</h1>
      <p>${page.intro || ""}</p>
    </section>

    <div class="portal-grid">
      <div class="content-column">
        <section class="content-block">
          <div class="post-grid">
            ${asArray(page.items).map((item) => renderPostCard(item)).join("")}
          </div>
        </section>
      </div>
      ${renderSidebar()}
    </div>
  `;
};

const renderInformationPage = () => {
  const page = cfg.pages?.information || {};

  return `
    <section class="page-head">
      <h1>${page.pageTitle || "Information"}</h1>
      <p>${page.intro || ""}</p>
    </section>

    <div class="portal-grid">
      <div class="content-column">
        <section class="content-block info-list">
          ${asArray(page.list)
            .map(
              (item) => `
            <article class="info-card">
              <span>${item.badge || "Info"}</span>
              <h3>${item.title || ""}</h3>
              <p>${item.detail || ""}</p>
            </article>
          `
            )
            .join("")}
        </section>
      </div>
      ${renderSidebar()}
    </div>
  `;
};

const renderToolsPage = () => {
  const page = cfg.pages?.tools || {};

  return `
    <section class="page-head">
      <h1>${page.pageTitle || "Tools"}</h1>
      <p>${page.intro || ""}</p>
    </section>

    <div class="portal-grid">
      <div class="content-column">
        <section class="content-block tool-list">
          ${asArray(page.items)
            .map(
              (item) => `
            <article class="tool-card">
              <div>
                <h3>${item.name || "Tool"}</h3>
                <p>${item.desc || ""}</p>
              </div>
              <div class="tool-meta">
                <span>${item.status || "Planned"}</span>
                <a href="${item.link || "#"}">Open</a>
              </div>
            </article>
          `
            )
            .join("")}
        </section>
      </div>
      ${renderSidebar()}
    </div>
  `;
};

const renderDownloadPage = () => {
  const page = cfg.pages?.download || {};

  return `
    <section class="page-head">
      <h1>${page.pageTitle || "Download"}</h1>
      <p>${page.intro || ""}</p>
    </section>

    <div class="portal-grid">
      <div class="content-column">
        <section class="content-block download-list">
          ${asArray(page.items)
            .map(
              (item) => `
            <article class="download-card">
              <h3>${item.title || "Materi"}</h3>
              <p>${item.type || "FILE"} • ${item.size || "-"}</p>
              <a class="primary-btn" href="${item.link || "#"}">Download</a>
            </article>
          `
            )
            .join("")}
        </section>
      </div>
      ${renderSidebar()}
    </div>
  `;
};

const renderQuizPage = () => {
  const page = cfg.pages?.quiz || {};

  return `
    <section class="page-head">
      <h1>${page.pageTitle || "Quiz"}</h1>
      <p>${page.intro || ""}</p>
    </section>

    <div class="portal-grid">
      <div class="content-column">
        <section class="content-block quiz-grid">
          ${asArray(page.cards)
            .map(
              (item) => `
            <article class="quiz-card">
              <span>${item.level || "Level"}</span>
              <h3>${item.title || "Quiz"}</h3>
              <p>${item.desc || ""}</p>
              <a class="primary-btn" href="${item.link || "#"}">${item.button || "Mulai"}</a>
            </article>
          `
            )
            .join("")}
        </section>
      </div>
      ${renderSidebar()}
    </div>
  `;
};

const renderAboutPage = () => {
  const page = cfg.pages?.about || {};
  const profile = page.profile || {};

  return `
    <section class="page-head">
      <h1>${page.pageTitle || "About"}</h1>
      <p>${page.intro || ""}</p>
    </section>

    <div class="portal-grid">
      <div class="content-column">
        <section class="content-block about-wrap">
          <article class="about-card">
            <figure>
              <img src="${profile.avatar || "assets/images/technician-illustration.svg"}" alt="${profile.avatarAlt || "Avatar"}" loading="lazy" />
            </figure>
            <div>
              <h3>${profile.name || "RyotaQC"}</h3>
              <span>${profile.role || "Creator"}</span>
              <p>${profile.bio || ""}</p>
            </div>
          </article>

          <article class="contact-card">
            <h3>Kontak</h3>
            <ul>
              ${asArray(page.contacts)
                .map((item) => `<li><strong>${item.label}:</strong> ${item.value}</li>`)
                .join("")}
            </ul>
          </article>
        </section>
      </div>
      ${renderSidebar()}
    </div>
  `;
};

const renderPageByKey = (pageKey) => {
  switch (pageKey) {
    case "home":
      return renderHomePage();
    case "articles":
      return renderArticlesPage();
    case "information":
      return renderInformationPage();
    case "tools":
      return renderToolsPage();
    case "download":
      return renderDownloadPage();
    case "quiz":
      return renderQuizPage();
    case "about":
      return renderAboutPage();
    default:
      return renderHomePage();
  }
};

const renderSite = (pageKey) => {
  document.body.classList.remove("maintenance-mode");
  document.body.classList.add("site-mode");

  renderTopNote();
  renderHeader(pageKey);

  const app = q("#app");
  if (app) {
    app.innerHTML = renderPageByKey(pageKey);
  }

  renderFooter(false);
};

const renderDeveloperSiteDock = (devContext) => {
  q(".dev-site-dock")?.remove();

  if (!cfg.site?.maintenance?.enabled || !devContext?.canBypass || !devContext?.showNormalSite) {
    return;
  }

  const dock = document.createElement("aside");
  dock.className = "dev-site-dock";
  dock.innerHTML = `
    <span>Developer Mode</span>
    <button type="button" class="primary-btn" data-back-maint>${devContext.backLabel || "Back Maintenance"}</button>
  `;

  dock.querySelector("[data-back-maint]")?.addEventListener("click", () => {
    devContext.setView("maintenance");
  });

  document.body.appendChild(dock);
};

const renderMaintenanceMode = (devContext) => {
  document.body.classList.remove("site-mode", "menu-open");
  document.body.classList.add("maintenance-mode");

  const topNote = q("#top-note");
  if (topNote) {
    topNote.innerHTML = "";
  }

  const header = q("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="header-inner maintenance-head">
        <a class="site-logo" href="index.html" aria-label="${cfg.site?.title || "RyotaQC"}">
          <span class="logo-dot"></span>
          <div>
            <strong>${cfg.site?.logoText || "RYOTAQC"}</strong>
            <small>Maintenance Mode</small>
          </div>
        </a>
      </div>
    `;
  }

  const maintenance = cfg.site?.maintenance || {};
  const app = q("#app");

  if (!app) {
    return;
  }

  app.innerHTML = `
    <section class="maintenance-wrap">
      <article class="maintenance-card">
        ${
          devContext?.canBypass
            ? `
          <div class="maintenance-devbar">
            <span>Developer Access</span>
            <button type="button" class="primary-btn" data-go-site>${devContext.goSiteLabel || "Go Site"}</button>
          </div>
        `
            : ""
        }

        <h1>${maintenance.title || "Website Sedang Maintenance"}</h1>
        <p>${maintenance.message || "Website sedang maintenance."}</p>

        <figure class="maintenance-visual">
          <img src="${maintenance.image || "assets/images/step-maintenance-repair.webp"}" alt="${maintenance.imageAlt || "Maintenance"}" loading="lazy" />
        </figure>

        <section class="maintenance-game">
          <div class="maintenance-game-head">
            <h2>${maintenance.gameTitle || "Tap Tap Shoot Basketball"}</h2>
            <button type="button" class="mini-btn" data-game-reset>Reset</button>
          </div>
          <canvas id="maintenance-game-canvas" class="maintenance-game-canvas" aria-label="Mini game basketball"></canvas>
          <div class="maintenance-stats">
            <span data-game-score>Score: 0</span>
            <span data-game-shots>Shots: 0</span>
            <span data-game-best>Best: 0</span>
          </div>
          <p class="maintenance-hint">Tap/klik untuk melempar bola ke ring. Bisa dimainkan di desktop maupun mobile.</p>
        </section>
      </article>
    </section>
  `;

  q("[data-go-site]")?.addEventListener("click", () => {
    devContext?.setView("site");
  });

  renderFooter(true);
  setupMaintenanceGame();
};

const setupMaintenanceGame = () => {
  const canvas = q("#maintenance-game-canvas");
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const scoreEl = q("[data-game-score]");
  const shotsEl = q("[data-game-shots]");
  const bestEl = q("[data-game-best]");
  const resetBtn = q("[data-game-reset]");

  const state = {
    score: 0,
    shots: 0,
    best: 0
  };

  const rim = {
    x: 0,
    y: 0,
    width: 96,
    height: 10,
    speed: 1.5,
    dir: 1
  };

  const ball = {
    x: 0,
    y: 0,
    prevY: 0,
    vx: 0,
    vy: 0,
    r: 14,
    active: false,
    scored: false
  };

  const gravity = 0.35;
  let rafId = null;
  let width = 0;
  let height = 0;
  let shooterX = 0;
  let shooterY = 0;
  let dpr = 1;

  const updateStats = () => {
    if (scoreEl) scoreEl.textContent = `Score: ${state.score}`;
    if (shotsEl) shotsEl.textContent = `Shots: ${state.shots}`;
    if (bestEl) bestEl.textContent = `Best: ${state.best}`;
  };

  const resetBall = () => {
    ball.active = false;
    ball.scored = false;
    ball.x = shooterX;
    ball.y = shooterY;
    ball.prevY = shooterY;
    ball.vx = 0;
    ball.vy = 0;
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "#1b305f");
    bg.addColorStop(1, "#0c1428");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(0, height - 42, width, 42);

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 17px Outfit";
    ctx.fillText("Tap to Shoot", 16, 28);

    ctx.fillStyle = "#ff8a3d";
    ctx.fillRect(rim.x, rim.y, rim.width, rim.height);

    ctx.strokeStyle = "#d9e6ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rim.x + 8, rim.y + rim.height);
    ctx.lineTo(rim.x + 8, rim.y + rim.height + 26);
    ctx.lineTo(rim.x + rim.width - 8, rim.y + rim.height + 26);
    ctx.lineTo(rim.x + rim.width - 8, rim.y + rim.height);
    ctx.stroke();

    ctx.fillStyle = "#86d4ff";
    ctx.beginPath();
    ctx.arc(shooterX, shooterY, 8, 0, Math.PI * 2);
    ctx.fill();

    if (ball.active) {
      ctx.fillStyle = "#ff8a3d";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ball.x - 4, ball.y + 1, ball.r * 0.4, -0.9, 1.2);
      ctx.stroke();
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.max(window.devicePixelRatio || 1, 1);
    width = Math.max(300, Math.floor(rect.width));
    height = Math.max(280, Math.floor(rect.height));

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    shooterX = width * 0.5;
    shooterY = height - 22;

    rim.y = height * 0.18;
    rim.x = Math.max(14, Math.min(width - rim.width - 14, width * 0.5 - rim.width * 0.5));

    if (!ball.active) {
      resetBall();
    }

    draw();
  };

  const shoot = (targetX) => {
    if (ball.active) {
      return;
    }

    const dx = targetX - shooterX;

    ball.active = true;
    ball.scored = false;
    ball.x = shooterX;
    ball.y = shooterY;
    ball.prevY = shooterY;
    ball.vx = dx / 34;
    ball.vy = -9.4;

    state.shots += 1;
    updateStats();
  };

  const tick = () => {
    rim.x += rim.speed * rim.dir;
    if (rim.x <= 12 || rim.x + rim.width >= width - 12) {
      rim.dir *= -1;
      rim.x = Math.max(12, Math.min(width - rim.width - 12, rim.x));
    }

    if (ball.active) {
      ball.prevY = ball.y;
      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;

      const left = rim.x + 8;
      const right = rim.x + rim.width - 8;
      const scoreLine = rim.y + rim.height + 8;
      const crossing = ball.prevY < scoreLine && ball.y >= scoreLine;

      if (!ball.scored && crossing && ball.x > left && ball.x < right) {
        ball.scored = true;
        state.score += 1;
        state.best = Math.max(state.best, state.score);
        updateStats();
      }

      const out = ball.y - ball.r > height + 20 || ball.x < -40 || ball.x > width + 40;
      if (out) {
        if (!ball.scored) {
          state.score = 0;
          updateStats();
        }
        resetBall();
      }
    }

    draw();
    rafId = requestAnimationFrame(tick);
  };

  const onPointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in event && event.touches?.length ? event.touches[0].clientX : event.clientX;
    shoot(clientX - rect.left);
  };

  canvas.addEventListener("click", onPointer);
  canvas.addEventListener("touchstart", onPointer, { passive: true });

  resetBtn?.addEventListener("click", () => {
    state.score = 0;
    state.shots = 0;
    updateStats();
    resetBall();
    draw();
  });

  window.addEventListener("resize", resize);

  updateStats();
  resize();
  rafId = requestAnimationFrame(tick);

  window.addEventListener("beforeunload", () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  });
};

const init = () => {
  const pageKey = getCurrentPageKey();
  const maintenanceEnabled = Boolean(cfg.site?.maintenance?.enabled);
  const devContext = getMaintenanceDevContext();

  if (maintenanceEnabled && !devContext.showNormalSite) {
    renderMaintenanceMode(devContext);
    return;
  }

  renderSite(pageKey);
  renderDeveloperSiteDock(devContext);
};

init();
