const cfg = window.RYOTAQC_CONTENT || {};
const q = (sel, root = document) => root.querySelector(sel);
const qa = (sel, root = document) => [...root.querySelectorAll(sel)];

const normalizeList = (value) => (Array.isArray(value) ? value : []);

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

const renderHeader = () => {
  const header = q("#site-header");
  if (!header) {
    return;
  }

  const menu = normalizeList(cfg.site?.menu);

  header.innerHTML = `
    <div class="header-shell">
      <a class="brand" href="#beranda">
        <span class="brand-dot"></span>
        <div>
          <strong>${cfg.site?.title || "RyotaQC"}</strong>
          <small>${cfg.site?.badge || "Update Center"}</small>
        </div>
      </a>

      <button class="menu-button" type="button" data-open-menu>${cfg.site?.menuLabel || "Menu"}</button>
    </div>

    <div class="menu-backdrop" data-close-menu></div>

    <nav class="menu-drawer" aria-label="Menu Utama">
      <div class="menu-drawer-head">
        <span>Menu</span>
        <button class="menu-close" type="button" data-close-menu aria-label="Tutup menu">x</button>
      </div>
      <div class="menu-list">
        ${menu
          .map(
            (item) => `
          <a href="#${item.id}" data-menu-link>
            <span>${item.label}</span>
            <small>Open</small>
          </a>
        `
          )
          .join("")}
      </div>
    </nav>
  `;

  q("[data-open-menu]", header)?.addEventListener("click", () => {
    document.body.classList.add("menu-open");
  });

  qa("[data-close-menu]", header).forEach((el) => {
    el.addEventListener("click", () => document.body.classList.remove("menu-open"));
  });

  qa("[data-menu-link]", header).forEach((el) => {
    el.addEventListener("click", () => {
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
    <span>${cfg.footer?.left || cfg.site?.title || "RyotaQC"}</span>
    <span>${cfg.footer?.right || "All rights reserved"}</span>
  `;
};

const renderHero = () => {
  const hero = cfg.site?.hero || {};
  return `
    <section id="beranda" class="section hero-section reveal">
      <div class="hero-card">
        <p class="hero-kicker">${hero.kicker || "Simple. Modern. Fast."}</p>
        <h1>${hero.title || "Portal Utama RyotaQC"}</h1>
        <p>${hero.subtitle || "Website RyotaQC versi baru."}</p>

        <div class="hero-actions">
          <a class="btn btn-primary" href="${hero.primaryButton?.target || "#information"}">${hero.primaryButton?.label || "Information"}</a>
          <a class="btn btn-ghost" href="${hero.secondaryButton?.target || "#tools"}">${hero.secondaryButton?.label || "Tools"}</a>
        </div>
      </div>

      <div class="hero-glow" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  `;
};

const renderBeranda = () => {
  const block = cfg.sections?.beranda || {};
  const highlights = normalizeList(block.highlights);

  return `
    <section class="section reveal">
      <div class="section-head">
        <h2>${block.title || "Beranda"}</h2>
        <p>${block.description || ""}</p>
      </div>
      <div class="grid-3">
        ${highlights
          .map(
            (item) => `
          <article class="card">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </article>
        `
          )
          .join("")}
      </div>
    </section>
  `;
};

const renderInformation = () => {
  const block = cfg.sections?.information || {};
  const items = normalizeList(block.items);

  return `
    <section id="information" class="section reveal">
      <div class="section-head">
        <h2>${block.title || "Information"}</h2>
        <p>${block.description || ""}</p>
      </div>
      <div class="grid-3">
        ${items
          .map(
            (item) => `
          <article class="card card-highlight">
            <span class="tag">${item.tag}</span>
            <h3>${item.heading}</h3>
            <p>${item.body}</p>
          </article>
        `
          )
          .join("")}
      </div>
    </section>
  `;
};

const renderTools = () => {
  const block = cfg.sections?.tools || {};
  const items = normalizeList(block.items);

  return `
    <section id="tools" class="section reveal">
      <div class="section-head">
        <h2>${block.title || "Tools"}</h2>
        <p>${block.description || ""}</p>
      </div>
      <div class="tool-list">
        ${items
          .map(
            (item) => `
          <article class="card tool-item">
            <div>
              <h3>${item.name}</h3>
              <p>${item.desc}</p>
            </div>
            <div class="tool-meta">
              <span class="pill">${item.status || "Planned"}</span>
              <a href="${item.link || "#"}">Open</a>
            </div>
          </article>
        `
          )
          .join("")}
      </div>
    </section>
  `;
};

const renderQuiz = () => {
  const block = cfg.sections?.quiz || {};

  return `
    <section id="quiz" class="section reveal">
      <div class="section-head">
        <h2>${block.title || "Quiz"}</h2>
        <p>${block.description || ""}</p>
      </div>
      <article class="card card-center">
        <a class="btn btn-primary" href="${block.ctaLink || "#"}">${block.ctaLabel || "Mulai Quiz"}</a>
      </article>
    </section>
  `;
};

const renderFaq = () => {
  const block = cfg.sections?.faq || {};
  const items = normalizeList(block.items);

  return `
    <section id="faq" class="section reveal">
      <div class="section-head">
        <h2>${block.title || "Faq"}</h2>
        <p>${block.description || ""}</p>
      </div>
      <div class="faq-list">
        ${items
          .map(
            (item) => `
          <details class="faq-item card">
            <summary>${item.q}</summary>
            <p>${item.a}</p>
          </details>
        `
          )
          .join("")}
      </div>
    </section>
  `;
};

const renderAbout = () => {
  const block = cfg.sections?.about || {};
  const contacts = normalizeList(block.contacts);

  return `
    <section id="about" class="section reveal">
      <div class="section-head">
        <h2>${block.title || "About Me"}</h2>
        <p>${block.description || ""}</p>
      </div>
      <article class="card about-card">
        <div class="about-main">
          <h3>${block.name || "RyotaQC"}</h3>
          <span>${block.role || "Creator"}</span>
          <p>${block.bio || ""}</p>
        </div>
        <ul>
          ${contacts.map((item) => `<li><strong>${item.label}:</strong> ${item.value}</li>`).join("")}
        </ul>
      </article>
    </section>
  `;
};

const renderMainSite = () => {
  document.body.classList.remove("maintenance-mode", "menu-open");
  document.body.classList.add("site-mode");

  renderHeader();

  const app = q("#app");
  if (!app) {
    return;
  }

  app.innerHTML = `
    ${renderHero()}
    ${renderBeranda()}
    ${renderInformation()}
    ${renderTools()}
    ${renderQuiz()}
    ${renderFaq()}
    ${renderAbout()}
  `;

  renderFooter(false);
  setupRevealAnimation();
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
    <button class="btn btn-ghost" type="button" data-dev-back-maint>${devContext.backLabel || "Back Maintenance"}</button>
  `;

  dock.querySelector("[data-dev-back-maint]")?.addEventListener("click", () => {
    devContext.setView("maintenance");
  });

  document.body.appendChild(dock);
};

const renderMaintenanceMode = (devContext) => {
  document.body.classList.remove("site-mode", "menu-open");
  document.body.classList.add("maintenance-mode");

  const header = q("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="header-shell">
        <a class="brand" href="#">
          <span class="brand-dot"></span>
          <div>
            <strong>${cfg.site?.title || "RyotaQC"}</strong>
            <small>Maintenance</small>
          </div>
        </a>
      </div>
    `;
  }

  const app = q("#app");
  if (!app) {
    return;
  }

  const maintenance = cfg.site?.maintenance || {};

  app.innerHTML = `
    <section class="maintenance-wrap reveal">
      <article class="maintenance-card">
        ${
          devContext?.canBypass
            ? `
          <div class="maintenance-devbar">
            <span>Developer Access</span>
            <button class="btn btn-ghost" type="button" data-maint-go-site>${devContext.goSiteLabel || "Go Site"}</button>
          </div>
        `
            : ""
        }

        <h1>${maintenance.title || "Website Sedang Maintenance"}</h1>
        <p>${maintenance.message || "Website sedang dalam pengembangan."}</p>

        <figure class="maintenance-image">
          <img src="${maintenance.image || "assets/images/step-maintenance-repair.webp"}" alt="${maintenance.imageAlt || "Maintenance"}" loading="lazy" />
        </figure>

        <section class="maintenance-game card">
          <div class="maintenance-game-head">
            <h2>${maintenance.gameTitle || "Tap Tap Shoot Basketball"}</h2>
            <button class="btn btn-ghost" type="button" data-game-reset>Reset</button>
          </div>
          <canvas id="maintenance-game-canvas" class="maintenance-game-canvas" aria-label="Mini game basket"></canvas>
          <div class="maintenance-game-stats">
            <span data-game-score>Score: 0</span>
            <span data-game-shots>Shots: 0</span>
            <span data-game-best>Best: 0</span>
          </div>
          <p class="maintenance-game-hint">Tap atau klik area game untuk menembak bola ke ring.</p>
        </section>
      </article>
    </section>
  `;

  q("[data-maint-go-site]")?.addEventListener("click", () => {
    devContext?.setView("site");
  });

  renderFooter(true);
  setupRevealAnimation();
  setupMaintenanceGame();
};

const setupRevealAnimation = () => {
  const targets = qa(".reveal");
  if (!targets.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  targets.forEach((el) => obs.observe(el));
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
    width: 90,
    height: 10,
    dir: 1,
    speed: 1.5
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
  let raf = null;
  let dpr = 1;
  let width = 0;
  let height = 0;
  let shooterX = 0;
  let shooterY = 0;

  const paint = () => {
    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "#10244a");
    bg.addColorStop(1, "#0a0f1d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(0, height - 44, width, 44);

    ctx.fillStyle = "#f2f6ff";
    ctx.font = "600 18px Sora";
    ctx.fillText("Tap to Shoot", 14, 28);

    ctx.fillStyle = "#ff8f3f";
    ctx.fillRect(rim.x, rim.y, rim.width, rim.height);

    ctx.strokeStyle = "#dce7ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rim.x + 8, rim.y + rim.height);
    ctx.lineTo(rim.x + 8, rim.y + rim.height + 26);
    ctx.lineTo(rim.x + rim.width - 8, rim.y + rim.height + 26);
    ctx.lineTo(rim.x + rim.width - 8, rim.y + rim.height);
    ctx.stroke();

    ctx.fillStyle = "#7be0ff";
    ctx.beginPath();
    ctx.arc(shooterX, shooterY, 8, 0, Math.PI * 2);
    ctx.fill();

    if (ball.active) {
      ctx.fillStyle = "#ff8f3f";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(0,0,0,0.24)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ball.x - 4, ball.y + 1, ball.r * 0.4, -0.9, 1.2);
      ctx.stroke();
    }
  };

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

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.max(window.devicePixelRatio || 1, 1);
    width = Math.max(320, Math.floor(rect.width));
    height = Math.max(280, Math.floor(rect.height));

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    shooterX = width * 0.5;
    shooterY = height - 24;

    rim.y = height * 0.18;
    rim.x = Math.max(18, Math.min(width - rim.width - 18, width * 0.5 - rim.width * 0.5));

    if (!ball.active) {
      resetBall();
    }

    paint();
  };

  const shoot = (pointerX) => {
    if (ball.active) {
      return;
    }

    const targetX = typeof pointerX === "number" ? pointerX : width * 0.5;
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

    paint();
    raf = requestAnimationFrame(tick);
  };

  const pointerHandler = (event) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in event && event.touches?.length ? event.touches[0].clientX : event.clientX;
    shoot(clientX - rect.left);
  };

  canvas.addEventListener("click", pointerHandler);
  canvas.addEventListener("touchstart", pointerHandler, { passive: true });

  resetBtn?.addEventListener("click", () => {
    state.score = 0;
    state.shots = 0;
    updateStats();
    resetBall();
    paint();
  });

  window.addEventListener("resize", resize);

  updateStats();
  resize();
  raf = requestAnimationFrame(tick);

  window.addEventListener("beforeunload", () => {
    if (raf) {
      cancelAnimationFrame(raf);
    }
  });
};

const init = () => {
  const maintenanceEnabled = Boolean(cfg.site?.maintenance?.enabled);
  const devContext = getMaintenanceDevContext();

  if (maintenanceEnabled && !devContext.showNormalSite) {
    renderMaintenanceMode(devContext);
    return;
  }

  renderMainSite();
  renderDeveloperSiteDock(devContext);
};

init();
