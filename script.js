const cfg = window.RYOTAQC_CONTENT;

if (!cfg || !cfg.panels || !cfg.site) {
  throw new Error("content.js belum valid. Pastikan window.RYOTAQC_CONTENT tersedia.");
}

const q = (selector, root = document) => root.querySelector(selector);

const icons = {
  arrowLeft: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M14.5 5.5L8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  arrowRight: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M9.5 5.5L16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  menu: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 7.5h16M9 12h11M4 16.5h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  close: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  spark: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2l1.9 5.2L19 9l-5.1 1.8L12 16l-1.9-5.2L5 9l5.1-1.8L12 2z" fill="currentColor"/>
    </svg>
  `,
  node: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
    </svg>
  `,
  external: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 8h8v8M16 8l-8 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  dot: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="5" fill="currentColor"/>
    </svg>
  `
};

const panelIconByType = {
  intro: icons.node,
  split: icons.spark,
  strips: icons.spark,
  cards: icons.node,
  focus: icons.dot,
  steps: icons.spark,
  links: icons.node,
  calculator: icons.dot,
  cta: icons.spark
};

const renderPanelMetaIcon = (type) => `<span class="panel-meta-icon" aria-hidden="true">${panelIconByType[type] || icons.spark}</span>`;

const createTopbar = () => {
  const topbar = q("#topbar");
  const links = cfg.site.topLinks
    .map((item) => `<a class="top-nav-link" href="${item.target}">${item.label}</a>`)
    .join("");

  topbar.innerHTML = `
    <div class="topbar-left">
      <button class="circle-btn icon-btn js-prev-panel" type="button" aria-label="Section sebelumnya">${icons.arrowLeft}</button>
      <button class="circle-btn icon-btn js-next-panel" type="button" aria-label="Section berikutnya">${icons.arrowRight}</button>
      <a class="pill-btn" href="#panel-intro">${cfg.site.brandPill}</a>
    </div>
    <nav class="topbar-center" aria-label="Primary">${links}</nav>
    <div class="topbar-right">
      <button class="pill-btn menu-pill js-menu-toggle" type="button" aria-label="Open menu">
        <span class="menu-pill-label">${cfg.site.menuLabel}</span>
        <span class="menu-icon-wrap">${icons.menu}</span>
      </button>
    </div>
  `;
};

const createOverlayMenu = () => {
  const overlay = document.createElement("aside");
  overlay.className = "menu-overlay";
  overlay.id = "menu-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const items = cfg.site.topLinks
    .map(
      (item, idx) => `
        <a class="overlay-link overlay-mega-link" href="${item.target}">
          <span class="overlay-link-index">${String(idx + 1).padStart(2, "0")}</span>
          <span class="overlay-link-text">${item.label}</span>
          <span class="overlay-link-arrow">${icons.arrowRight}</span>
        </a>
      `
    )
    .join("");

  overlay.innerHTML = `
    <div class="overlay-inner">
      <div class="overlay-head">
        <p>${cfg.site.title}</p>
        <button class="pill-btn overlay-close js-menu-close" type="button" aria-label="Close menu">
          <span>menu close</span>
          <span class="menu-icon-wrap">${icons.close}</span>
        </button>
      </div>
      <div class="overlay-links">${items}</div>
      <div class="overlay-foot">
        <p>Made by RyotaQC</p>
        <p>SOP Battery / QC & Maintenance</p>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const openBtn = q(".js-menu-toggle");
  const openLabel = q(".menu-pill-label", openBtn || document);
  const closeBtn = q(".js-menu-close", overlay);
  const megaLinks = [...overlay.querySelectorAll(".overlay-mega-link")];
  let openTl = null;

  const open = () => {
    overlay.classList.add("open", "entering");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    if (openLabel) {
      openLabel.textContent = "menu close";
    }

    if (window.gsap) {
      if (openTl) {
        openTl.kill();
      }
      openTl = gsap.timeline();
      openTl.fromTo(
        ".overlay-mega-link",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.42, stagger: 0.06, ease: "power3.out" },
        0
      );
      openTl.fromTo(".overlay-foot", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.15);
    }
  };

  const close = () => {
    overlay.classList.remove("open", "entering");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    if (openLabel) {
      openLabel.textContent = cfg.site.menuLabel;
    }
  };

  openBtn?.addEventListener("click", () => {
    if (overlay.classList.contains("open")) {
      close();
      return;
    }
    open();
  });
  closeBtn?.addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  megaLinks.forEach((link) => {
    link.addEventListener("click", close);
  });
};

const renderIntro = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme} intro-panel home-panel" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <div class="home-right-dot" aria-hidden="true"></div>
    <button class="home-sound-btn" type="button" aria-label="Toggle sound">
      <span></span>
    </button>
    <article class="home-stage">
      <p class="home-download-tag top anim-target">Download this video</p>
      <section class="home-browser anim-target">
        <header class="home-browser-head">
          <span></span><span></span><span></span>
        </header>
        <div class="home-browser-nav">
          <strong>${panel.brand || "RYOTAQC"}</strong>
          <div>
            <span>HOME</span>
            <span>PRICING</span>
            <span>ABOUT US</span>
            <span>CONTACTS</span>
          </div>
          <a href="#panel-driver">Get in touch</a>
        </div>
        <div class="home-browser-body">
          <article class="home-copy">
            <h1 class="anim-target">${panel.heroTitle || "WE'LL CREATE YOUR PERFECT QC FLOW"}</h1>
            <p class="anim-target">${panel.heroSub || "Start achieving your laptop QC goals. Join us today."}</p>
          </article>
          <div class="home-visual">
            <figure class="hero-athlete anim-target">
              <span class="hero-head"></span>
              <span class="hero-body"></span>
              <span class="hero-arm hero-arm-left"></span>
              <span class="hero-arm hero-arm-right"></span>
            </figure>
            <aside class="home-metric black anim-target">
              <small>Daily runtime burn</small>
              <strong>230 bpm</strong>
              <div>
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </aside>
            <aside class="home-metric white anim-target">
              <small>Heartrate</small>
              <strong>230 bpm</strong>
            </aside>
          </div>
        </div>
        <footer class="home-browser-foot"></footer>
      </section>
      <p class="home-caption anim-target">${panel.caption || "Here, animation gives a pumping vibe to a fitness website."}</p>
      <p class="home-download-tag bottom anim-target">Download audio from this page</p>
    </article>
  </section>
`;

const renderSplit = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme} split-panel" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <div class="split-stage">
      <article>
        <h2 class="split-title anim-target">${panel.titleLines.map((line) => `<span>${line}</span>`).join("")}</h2>
        <p class="panel-body anim-target">${panel.body}</p>
      </article>
      <figure class="visual-frame morph-frame anim-target parallax-layer">
        <img class="panel-image" src="${panel.image}" alt="${panel.imageAlt}" loading="lazy" />
      </figure>
    </div>
  </section>
`;

const renderStrips = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <p class="panel-kicker anim-target">${cfg.site.introTag}</p>
    <div class="strip-wrap">
      ${panel.words.map((word) => `<div class="word-strip anim-target">${word}</div>`).join("")}
    </div>
    <p class="strip-caption anim-target">${panel.caption}</p>
  </section>
`;

const renderCards = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <div class="cards-heading">
      <p class="panel-kicker anim-target">${panel.kicker}</p>
      <h2 class="panel-heading anim-target">${panel.heading}</h2>
    </div>
    <div class="cards-track">
      ${panel.cards
        .map(
          (card) => `
            <article class="motion-card anim-target">
              <figure class="motion-card-media parallax-layer">
                <img class="panel-image" src="${card.image}" alt="${card.imageAlt}" loading="lazy" />
              </figure>
              <div class="card-title-row">
                <span class="card-title-icon">${icons.spark}</span>
                <h3>${card.title}</h3>
              </div>
              <p>${card.text}</p>
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderFocus = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <div class="focus-grid">
      <article>
        <p class="panel-kicker anim-target">${panel.kicker}</p>
        <h2 class="panel-heading anim-target">${panel.heading}</h2>
        <p class="panel-body anim-target">${panel.body}</p>
      </article>
      <figure class="visual-frame morph-frame anim-target parallax-layer">
        <img class="panel-image" src="${panel.image}" alt="${panel.imageAlt}" loading="lazy" />
      </figure>
    </div>
  </section>
`;

const renderSteps = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <div class="steps-grid">
      <article>
        <p class="panel-kicker anim-target">${panel.kicker}</p>
        <h2 class="panel-heading anim-target">${panel.heading}</h2>
        <ol class="step-list">
          ${panel.steps
            .map(
              (step) => `
                <li class="step-item anim-target">
                  <span class="step-icon">${icons.dot}</span>
                  <span>${step}</span>
                </li>
              `
            )
            .join("")}
        </ol>
      </article>
      <figure class="visual-frame morph-frame anim-target parallax-layer">
        <img class="panel-image" src="${panel.image}" alt="${panel.imageAlt}" loading="lazy" />
      </figure>
    </div>
  </section>
`;

const renderLinks = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <p class="panel-kicker anim-target">${panel.kicker}</p>
    <h2 class="panel-heading anim-target">${panel.heading}</h2>
    <div class="links-grid">
      ${panel.groups
        .map(
          (group) => `
            <article class="link-box anim-target">
              <h3>${group.name}</h3>
              ${group.links
                .map(
                  (link) => `
                    <a href="${link.href}" target="_blank" rel="noopener">
                      <span>${link.label}</span>
                      <span class="link-ext-icon">${icons.external}</span>
                    </a>
                  `
                )
                .join("")}
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderCalculator = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <article class="calc-card">
      <p class="panel-kicker anim-target">${panel.kicker}</p>
      <h2 class="panel-heading anim-target">${panel.heading}</h2>
      <p class="panel-body anim-target">${panel.body}</p>

      <div class="calc-grid">
        <section class="calc-rules anim-target">
          <h3>Aturan Koreksi</h3>
          <div class="calc-rule-table">
            <div class="calc-rule-head">
              <span>Range</span>
              <span>Pengurang</span>
              <span>Contoh</span>
            </div>
            ${panel.rules
              .map(
                (rule) => `
                  <div class="calc-rule-row">
                    <span>${rule.range}</span>
                    <span>${rule.deduction}</span>
                    <span>${rule.example}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>

        <section class="calc-form-wrap anim-target">
          <h3>Input Unit</h3>
          <form class="calc-form" data-calc-form>
            <label>
              Jam Mentah
              <input type="number" min="0" max="24" step="1" value="3" data-calc-input="hours" />
            </label>
            <label>
              Menit Mentah
              <input type="number" min="0" max="59" step="1" value="10" data-calc-input="minutes" />
            </label>
            <label>
              Battery Health (%)
              <input type="number" min="0" max="100" step="1" value="58" data-calc-input="bh" />
            </label>
            <label>
              FCC (mWh)
              <input type="number" min="0" max="120000" step="100" value="28000" data-calc-input="fcc" />
            </label>
            <button class="cta-button" type="submit">${panel.buttonLabel || "Hitung"}</button>
          </form>

          <div class="calc-results">
            <article class="calc-result-card">
              <p>Hasil Mentah</p>
              <strong data-calc-result="raw">3 jam 10 menit</strong>
            </article>
            <article class="calc-result-card">
              <p>Pengurang SOP</p>
              <strong data-calc-result="deduction">30 menit</strong>
            </article>
            <article class="calc-result-card">
              <p>Hasil Final QC</p>
              <strong data-calc-result="final">2 jam 40 menit</strong>
            </article>
            <article class="calc-result-card">
              <p>Tindakan Maintenance</p>
              <strong data-calc-result="maintenance">Lanjut maintenance 1-4</strong>
            </article>
            <article class="calc-result-card wide">
              <p>Rekomendasi Battery</p>
              <strong data-calc-result="battery">Rekomendasi ganti battery (BH rendah + FCC rendah).</strong>
            </article>
          </div>
        </section>
      </div>

      <section class="calc-quick-check anim-target">
        <h3>Quick Check</h3>
        <ul>
          ${panel.quickChecks.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    </article>
  </section>
`;

const renderCta = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <article class="cta-wrap">
      <h2 class="panel-heading anim-target">${panel.heading}</h2>
      <p class="panel-body anim-target">${panel.body}</p>
      <div class="cta-buttons">
        ${panel.buttons
          .map((button) => `<a class="cta-button anim-target" href="${button.href}" target="_blank" rel="noopener">${button.label}</a>`)
          .join("")}
      </div>
    </article>
  </section>
`;

const panelRenderers = {
  intro: renderIntro,
  split: renderSplit,
  strips: renderStrips,
  cards: renderCards,
  focus: renderFocus,
  steps: renderSteps,
  links: renderLinks,
  calculator: renderCalculator,
  cta: renderCta
};

const renderPanels = () => {
  const app = q("#app");
  app.innerHTML = cfg.panels
    .map((panel) => {
      const renderer = panelRenderers[panel.type];
      if (!renderer) {
        return "";
      }
      return renderer(panel);
    })
    .join("");
};

const renderProgressDots = () => {
  const wrap = q("#progress-dots");
  wrap.innerHTML = cfg.panels
    .map(
      (panel, index) => `<button class="progress-dot" data-target="#${panel.id}" data-index="${index}" aria-label="Go to ${panel.id}"></button>`
    )
    .join("");

  wrap.querySelectorAll(".progress-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = q(dot.dataset.target);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};

const createCornerNav = () => {
  const box = document.createElement("div");
  box.className = "corner-nav";
  box.innerHTML = `
    <button class="corner-btn js-prev-panel" type="button" aria-label="Section sebelumnya">${icons.arrowLeft}</button>
    <button class="corner-btn js-next-panel" type="button" aria-label="Section berikutnya">${icons.arrowRight}</button>
  `;
  document.body.appendChild(box);
};

const setupPanelSwitchButtons = () => {
  const panels = [...document.querySelectorAll("[data-panel]")];
  if (!panels.length) {
    return;
  }

  const getActiveIndex = () => {
    const current = panels.findIndex((panel) => panel.classList.contains("active"));
    return current >= 0 ? current : 0;
  };

  const moveTo = (nextIndex) => {
    const bounded = Math.max(0, Math.min(panels.length - 1, nextIndex));
    panels[bounded]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.querySelectorAll(".js-prev-panel").forEach((btn) => {
    btn.addEventListener("click", () => moveTo(getActiveIndex() - 1));
  });

  document.querySelectorAll(".js-next-panel").forEach((btn) => {
    btn.addEventListener("click", () => moveTo(getActiveIndex() + 1));
  });
};

const renderFooter = () => {
  q("#site-footer").innerHTML = `
    <span>${cfg.footer.left}</span>
    <span>${cfg.footer.right}</span>
  `;
};

const renderExternalHome = () => {
  const embed = cfg.site?.homeEmbed || {};
  const embedUrl = embed.url || "https://motion.zajno.com/";

  const topbar = q("#topbar");
  const progress = q("#progress-dots");
  const app = q("#app");
  const footer = q("#site-footer");

  document.body.classList.remove("maintenance-mode", "menu-open", "has-custom-cursor", "home-active");
  document.body.classList.add("external-home-mode");

  if (topbar) {
    topbar.innerHTML = "";
    topbar.style.display = "none";
  }
  if (progress) {
    progress.innerHTML = "";
    progress.style.display = "none";
  }
  if (footer) {
    footer.innerHTML = "";
    footer.style.display = "none";
  }
  if (!app) {
    return;
  }

  app.innerHTML = `
    <section class="external-home-wrap">
      <iframe
        class="external-home-frame"
        src="${embedUrl}"
        title="Motion Homepage"
        loading="eager"
        referrerpolicy="no-referrer-when-downgrade"
        allow="fullscreen; autoplay"
      ></iframe>
    </section>
  `;
};

const getMaintenanceDevContext = () => {
  const maintenance = cfg.site?.maintenance || {};
  const dev = maintenance.devAccess || {};
  const queryParam = dev.queryParam || "dev_key";
  const viewParam = dev.viewParam || "dev_view";
  const logoutParam = dev.logoutParam || "dev_logout";
  const storageKey = dev.storageKey || "ryotaqc_dev_access";
  const viewStorageKey = `${storageKey}_view`;
  const token = dev.token || "";

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
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname) || window.location.hostname.startsWith("127.");

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

  const devView = getSession(viewStorageKey) || "maintenance";
  const showNormalSite = canBypass && devView === "site";

  const cleanUrl = `${url.pathname}${url.search}${url.hash}`;
  if (cleanUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
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
      setSession(viewStorageKey, mode);
      window.location.reload();
    }
  };
};

const renderMaintenanceMode = (devContext = { canBypass: false, showNormalSite: false }) => {
  const maintenance = cfg.site?.maintenance || {};

  document.body.classList.add("maintenance-mode");

  const topbar = q("#topbar");
  const progress = q("#progress-dots");
  const app = q("#app");
  const footer = q("#site-footer");

  if (topbar) {
    topbar.innerHTML = "";
  }

  if (progress) {
    progress.innerHTML = "";
    progress.style.display = "none";
  }

  if (footer) {
    footer.innerHTML = `
      <span>${cfg.site.title}</span>
      <span>Maintenance Mode</span>
    `;
  }

  if (!app) {
    return;
  }

  app.innerHTML = `
    <section class="maintenance-wrap">
      <div class="maintenance-glow" aria-hidden="true"></div>
      <article class="maintenance-card">
        ${
          devContext.canBypass
            ? `
          <div class="maintenance-devbar">
            <span>Developer Mode</span>
            <button class="pill-btn maintenance-dev-toggle" type="button" data-dev-toggle>
              ${devContext.showNormalSite ? devContext.backLabel : devContext.goSiteLabel}
            </button>
          </div>
        `
            : ""
        }
        <p class="maintenance-tag">maintenance mode</p>
        <h1>${maintenance.title || "Website Sedang Dalam Tahap Pengembangan"}</h1>
        <p>${maintenance.message || "Website sedang maintenance untuk update fitur terbaru."}</p>
        <figure class="maintenance-visual">
          <img src="${maintenance.image || "assets/images/step-maintenance-repair.webp"}" alt="${maintenance.imageAlt || "Ilustrasi maintenance"}" loading="lazy" />
        </figure>

        <section class="maintenance-game-card">
          <div class="maintenance-game-head">
            <h2>${maintenance.gameTitle || "Tap Tap Shoot Basketball"}</h2>
            <button class="pill-btn maintenance-reset" type="button" data-game-reset>Reset</button>
          </div>
          <canvas id="maintenance-game-canvas" class="maintenance-game-canvas" aria-label="Mini game basket"></canvas>
          <div class="maintenance-game-stats">
            <span data-game-score>Score: 0</span>
            <span data-game-shots>Shots: 0</span>
            <span data-game-best>Best: 0</span>
          </div>
          <p class="maintenance-game-hint">Tap / klik area game untuk lempar bola ke ring. Bisa dimainkan di desktop dan mobile.</p>
        </section>
      </article>
    </section>
  `;

  if (devContext.canBypass) {
    q("[data-dev-toggle]")?.addEventListener("click", () => {
      const nextMode = devContext.showNormalSite ? "maintenance" : "site";
      devContext.setView(nextMode);
    });
  }

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
    dir: 1,
    speed: 1.7
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

  let width = 0;
  let height = 0;
  let pendingReset = null;

  const updateStats = () => {
    if (scoreEl) scoreEl.textContent = `Score: ${state.score}`;
    if (shotsEl) shotsEl.textContent = `Shots: ${state.shots}`;
    if (bestEl) bestEl.textContent = `Best: ${state.best}`;
  };

  const resetBall = () => {
    ball.x = width * 0.5;
    ball.y = height - 30;
    ball.prevY = ball.y;
    ball.vx = 0;
    ball.vy = 0;
    ball.active = false;
    ball.scored = false;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    width = rect.width;
    height = rect.height;

    rim.y = Math.max(64, height * 0.24);
    rim.width = Math.min(130, Math.max(86, width * 0.23));
    rim.x = clamp(width * 0.58, 20, width - rim.width - 20);

    resetBall();
  };

  const drawCourt = () => {
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "#202531");
    bg.addColorStop(1, "#11151e");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width * 0.5, height + 40, width * 0.55, Math.PI, Math.PI * 2);
    ctx.stroke();
  };

  const drawHoop = () => {
    const boardX = rim.x + rim.width + 8;
    const boardY = rim.y - 32;

    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(boardX, boardY, 10, 72);

    ctx.strokeStyle = "#ff8b26";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(rim.x, rim.y);
    ctx.lineTo(rim.x + rim.width, rim.y);
    ctx.stroke();
  };

  const drawBall = () => {
    ctx.fillStyle = "#f1882d";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(35,24,14,0.65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r * 0.72, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r * 0.72, Math.PI / 2, Math.PI * 1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ball.x - ball.r, ball.y);
    ctx.lineTo(ball.x + ball.r, ball.y);
    ctx.stroke();
  };

  const circlePointHit = (cx, cy, cr, px, py, pr) => {
    const dx = px - cx;
    const dy = py - cy;
    const dist = Math.hypot(dx, dy);
    const overlap = cr + pr - dist;
    if (overlap > 0 && dist > 0) {
      const nx = dx / dist;
      const ny = dy / dist;
      ball.x += nx * overlap;
      ball.y += ny * overlap;
      const dot = ball.vx * nx + ball.vy * ny;
      if (dot < 0) {
        ball.vx -= 1.85 * dot * nx;
        ball.vy -= 1.85 * dot * ny;
      }
    }
  };

  const shootTo = (targetX, targetY) => {
    if (ball.active) {
      return;
    }

    if (pendingReset) {
      clearTimeout(pendingReset);
      pendingReset = null;
    }

    const startX = width * 0.5;
    const startY = height - 30;
    const dx = targetX - startX;
    const dy = Math.min(targetY - startY, -28);
    const distance = Math.max(1, Math.hypot(dx, dy));

    ball.x = startX;
    ball.y = startY;
    ball.prevY = startY;
    ball.vx = (dx / distance) * 10.8;
    ball.vy = (dy / distance) * 10.8;
    ball.active = true;
    ball.scored = false;

    state.shots += 1;
    updateStats();
  };

  const onPointerDown = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    shootTo(x, y);
  };

  const onReset = () => {
    if (pendingReset) {
      clearTimeout(pendingReset);
      pendingReset = null;
    }
    state.score = 0;
    state.shots = 0;
    updateStats();
    resetBall();
  };

  const tick = () => {
    drawCourt();

    rim.x += rim.dir * rim.speed;
    if (rim.x < 18 || rim.x + rim.width > width - 38) {
      rim.dir *= -1;
    }

    if (ball.active) {
      ball.prevY = ball.y;
      ball.vy += 0.34;
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.vx *= 0.994;

      if (ball.x - ball.r < 0) {
        ball.x = ball.r;
        ball.vx *= -0.78;
      } else if (ball.x + ball.r > width) {
        ball.x = width - ball.r;
        ball.vx *= -0.78;
      }

      if (ball.y - ball.r < 0) {
        ball.y = ball.r;
        ball.vy *= -0.72;
      }

      const rimY = rim.y;
      const rimInnerLeft = rim.x + 12;
      const rimInnerRight = rim.x + rim.width - 12;

      circlePointHit(rim.x + 4, rimY, 6, ball.x, ball.y, ball.r);
      circlePointHit(rim.x + rim.width - 4, rimY, 6, ball.x, ball.y, ball.r);

      if (!ball.scored && ball.prevY + ball.r <= rimY && ball.y + ball.r >= rimY && ball.x > rimInnerLeft && ball.x < rimInnerRight && ball.vy > 0) {
        ball.scored = true;
        state.score += 1;
        state.best = Math.max(state.best, state.score);
        updateStats();
      }

      if (ball.y + ball.r > height - 6) {
        ball.y = height - 6 - ball.r;
        ball.vy *= -0.56;
        ball.vx *= 0.9;
        if (Math.abs(ball.vy) < 1.2) {
          ball.active = false;
          pendingReset = setTimeout(() => {
            resetBall();
            pendingReset = null;
          }, 360);
        }
      }
    }

    drawHoop();
    drawBall();

    requestAnimationFrame(tick);
  };

  canvas.addEventListener("pointerdown", onPointerDown);
  resetBtn?.addEventListener("click", onReset);
  window.addEventListener("resize", resize);

  resize();
  updateStats();
  requestAnimationFrame(tick);
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const asInt = (value, fallback = 0) => {
  const num = Number.parseInt(value, 10);
  return Number.isNaN(num) ? fallback : num;
};

const toDurationText = (totalMinutes) => {
  const safe = Math.max(0, totalMinutes);
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  return `${hours} jam ${minutes} menit`;
};

const getSopDeduction = (hours) => {
  if (hours === 3) {
    return 30;
  }
  if (hours === 4) {
    return 45;
  }
  if (hours === 5 || hours === 6) {
    return 60;
  }
  if (hours >= 7) {
    return 120;
  }
  return 0;
};

const setupCalculator = () => {
  const form = q("[data-calc-form]");
  if (!form) {
    return;
  }

  const hoursEl = q('[data-calc-input="hours"]', form);
  const minutesEl = q('[data-calc-input="minutes"]', form);
  const bhEl = q('[data-calc-input="bh"]', form);
  const fccEl = q('[data-calc-input="fcc"]', form);

  const outRaw = q('[data-calc-result="raw"]');
  const outDeduction = q('[data-calc-result="deduction"]');
  const outFinal = q('[data-calc-result="final"]');
  const outMaintenance = q('[data-calc-result="maintenance"]');
  const outBattery = q('[data-calc-result="battery"]');

  const recalc = () => {
    const hours = clamp(asInt(hoursEl?.value, 0), 0, 24);
    const minutes = clamp(asInt(minutesEl?.value, 0), 0, 59);
    const bh = clamp(asInt(bhEl?.value, 0), 0, 100);
    const fcc = Math.max(0, asInt(fccEl?.value, 0));

    const rawMinutes = hours * 60 + minutes;
    const deduction = getSopDeduction(hours);
    const normalizedMinutes = Math.max(0, rawMinutes - deduction);

    const needsMaintenance = normalizedMinutes <= 120;
    const strongReplaceSignal = bh < 60 && fcc < 30000 && normalizedMinutes < 120;
    const replaceWithExceptionCheck = bh < 60 && !(fcc > 30000 && normalizedMinutes > 120);

    let batteryDecision = "Battery masih bisa dipakai dengan monitoring berkala.";
    if (strongReplaceSignal || replaceWithExceptionCheck) {
      batteryDecision = "Wajib ganti battery: kesehatan sudah rendah untuk pemakaian jangka panjang.";
    } else if (bh < 60 && fcc > 30000 && normalizedMinutes > 120) {
      batteryDecision = "Pengecualian: boleh dipertimbangkan dengan catatan QC (FCC tinggi dan hasil test di atas 2 jam).";
    } else if (bh <= 60 && fcc < 30000 && normalizedMinutes < 120) {
      batteryDecision = "Rekomendasi ganti battery: BH/FCC rendah dan hasil test belum aman.";
    }

    if (outRaw) outRaw.textContent = toDurationText(rawMinutes);
    if (outDeduction) outDeduction.textContent = `${deduction} menit`;
    if (outFinal) outFinal.textContent = toDurationText(normalizedMinutes);
    if (outMaintenance) outMaintenance.textContent = needsMaintenance ? "Lanjut maintenance 1-4" : "Lanjut validasi akhir & catat hasil QC";
    if (outBattery) outBattery.textContent = batteryDecision;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    recalc();
  });

  [hoursEl, minutesEl, bhEl, fccEl].forEach((input) => {
    input?.addEventListener("input", recalc);
    input?.addEventListener("change", recalc);
  });

  recalc();
};

const setupHomeReplica = () => {
  const homePanel = q(".home-panel");
  if (!homePanel) {
    return;
  }

  const dot = q(".home-right-dot", homePanel);
  const browser = q(".home-browser", homePanel);
  const caption = q(".home-caption", homePanel);

  if (!window.gsap || !window.ScrollTrigger) {
    const updateDot = () => {
      if (!dot) return;
      const top = homePanel.offsetTop;
      const height = homePanel.offsetHeight || 1;
      const progress = clamp((window.scrollY - top) / height, 0, 1);
      dot.style.transform = `translate3d(0, ${-180 + progress * 360}px, 0)`;
    };
    window.addEventListener("scroll", updateDot, { passive: true });
    updateDot();
    return;
  }

  gsap.to(dot, {
    y: 320,
    ease: "none",
    scrollTrigger: {
      trigger: homePanel,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(dot, {
    scale: 1.12,
    repeat: -1,
    yoyo: true,
    duration: 1.4,
    ease: "sine.inOut"
  });

  gsap.fromTo(
    browser,
    { y: 100, scale: 0.94, rotateX: 10 },
    {
      y: 0,
      scale: 1,
      rotateX: 0,
      ease: "power3.out",
      duration: 1.1
    }
  );

  gsap.fromTo(
    caption,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      delay: 0.5,
      duration: 0.7,
      ease: "power2.out"
    }
  );
};

const setupCustomCursor = () => {
  if (!window.matchMedia("(hover: hover)").matches || window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  const layer = document.createElement("div");
  layer.className = "custom-cursor-layer";
  layer.innerHTML = `
    <div class="cursor-ring"></div>
    <div class="cursor-dot"></div>
  `;
  document.body.appendChild(layer);
  document.body.classList.add("has-custom-cursor");

  const ring = q(".cursor-ring", layer);
  const dot = q(".cursor-dot", layer);

  let visible = false;
  let tx = window.innerWidth * 0.5;
  let ty = window.innerHeight * 0.5;
  let rx = tx;
  let ry = ty;
  let raf = null;

  const render = () => {
    rx += (tx - rx) * 0.22;
    ry += (ty - ry) * 0.22;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    raf = requestAnimationFrame(render);
  };

  const show = () => {
    if (visible) return;
    visible = true;
    layer.classList.add("visible");
  };

  const hide = () => {
    visible = false;
    layer.classList.remove("visible");
  };

  const onMove = (event) => {
    tx = event.clientX;
    ty = event.clientY;
    show();
    if (!raf) {
      raf = requestAnimationFrame(render);
    }
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseenter", show);
  window.addEventListener("mouseleave", hide);

  document.addEventListener("mouseover", (event) => {
    const hit = event.target instanceof Element && event.target.closest("a, button, input, select, textarea, label, .progress-dot");
    layer.classList.toggle("hover", Boolean(hit));
  });

  document.addEventListener("mousedown", () => layer.classList.add("down"));
  document.addEventListener("mouseup", () => layer.classList.remove("down"));
};

const setupSectionObserver = () => {
  const panels = [...document.querySelectorAll("[data-panel]")];
  const dots = [...document.querySelectorAll(".progress-dot")];

  const updateActive = (id) => {
    panels.forEach((panel) => panel.classList.toggle("active", panel.id === id));
    dots.forEach((dot) => dot.classList.toggle("active", dot.dataset.target === `#${id}`));
    document.body.classList.toggle("home-active", id === "panel-intro");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        updateActive(visible.target.id);
      }
    },
    { threshold: [0.2, 0.45, 0.7] }
  );

  panels.forEach((panel) => observer.observe(panel));
  if (panels[0]) {
    updateActive(panels[0].id);
  }
};

const setupGsapMotion = () => {
  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  document.querySelectorAll("[data-panel]").forEach((panel) => {
    const targets = panel.querySelectorAll(".anim-target");
    if (targets.length) {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 72%"
        }
      });
    }

    panel.querySelectorAll(".morph-frame").forEach((frame) => {
      gsap.fromTo(
        frame,
        { clipPath: "inset(20% 14% 20% 14% round 44px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 68%",
            end: "bottom 34%",
            scrub: true
          }
        }
      );
    });

    panel.querySelectorAll(".panel-image").forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1.16 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            end: "bottom 18%",
            scrub: true
          }
        }
      );
    });

    const strips = panel.querySelectorAll(".word-strip");
    strips.forEach((strip, idx) => {
      gsap.fromTo(
        strip,
        { xPercent: idx % 2 === 0 ? -14 : 14 },
        {
          xPercent: idx % 2 === 0 ? 10 : -10,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 980px)", () => {
    const panels = [...document.querySelectorAll("[data-panel]")];

    panels.forEach((panel) => {
      if (panel.classList.contains("home-panel")) {
        const homeText = panel.querySelectorAll(".home-copy .anim-target, .home-caption, .home-download-tag");
        const homeScene = panel.querySelectorAll(".home-browser, .home-metric, .hero-athlete, .home-right-dot");

        const homeTl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "+=240%",
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onToggle: (self) => panel.classList.toggle("is-pinned", self.isActive)
          }
        });

        homeTl.fromTo(panel, { filter: "brightness(0.92)" }, { filter: "brightness(1)", duration: 0.14 }, 0);
        homeTl.fromTo(homeText, { opacity: 0, yPercent: 14 }, { opacity: 1, yPercent: 0, duration: 0.24, stagger: 0.03 }, 0.05);
        homeTl.fromTo(homeScene, { opacity: 0.18, yPercent: 12, scale: 0.92 }, { opacity: 1, yPercent: 0, scale: 1, duration: 0.34, stagger: 0.02 }, 0.08);
        homeTl.to(".home-right-dot", { yPercent: 200, duration: 0.7 }, 0.22);
        homeTl.to(".home-browser", { yPercent: -12, scale: 1.02, duration: 0.26 }, 0.5);
        homeTl.to([...homeText, ...homeScene], { opacity: 0, yPercent: -16, duration: 0.22, stagger: 0.01 }, 0.78);

        return;
      }

      const textTargets = panel.querySelectorAll(".anim-target");
      const sceneTargets = panel.querySelectorAll(
        ".visual-frame, .motion-card, .word-strip, .link-box, .cta-button, .step-item, .calc-card, .calc-rule-table, .calc-form, .calc-result-card"
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          end: "+=180%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onToggle: (self) => panel.classList.toggle("is-pinned", self.isActive)
        }
      });

      tl.fromTo(panel, { filter: "brightness(0.72)" }, { filter: "brightness(1)", duration: 0.16 }, 0);

      if (textTargets.length) {
        tl.fromTo(
          textTargets,
          {
            opacity: 0.08,
            yPercent: 12,
            z: 90,
            rotationX: 12,
            transformOrigin: "50% 100%"
          },
          {
            opacity: 1,
            yPercent: 0,
            z: 0,
            rotationX: 0,
            duration: 0.3,
            stagger: 0.035
          },
          0.05
        );

        tl.to(
          textTargets,
          {
            opacity: 0,
            yPercent: -18,
            duration: 0.26,
            stagger: 0.02
          },
          0.74
        );
      }

      if (sceneTargets.length) {
        tl.fromTo(
          sceneTargets,
          {
            opacity: 0.12,
            scale: 0.9,
            yPercent: 8,
            z: 140,
            filter: "blur(5px)"
          },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            z: 0,
            filter: "blur(0px)",
            duration: 0.32,
            stagger: 0.02
          },
          0.08
        );

        tl.to(
          sceneTargets,
          {
            opacity: 0.2,
            scale: 0.96,
            yPercent: -12,
            duration: 0.28,
            stagger: 0.015
          },
          0.72
        );
      }

      tl.to(panel, { yPercent: -6, scale: 0.985, filter: "brightness(0.82)", duration: 0.28 }, 0.72);
    });
  });
};

const setupMouseParallax = () => {
  if (!window.matchMedia("(hover: hover)").matches) {
    return;
  }

  const layers = [...document.querySelectorAll(".parallax-layer")];
  if (!layers.length) {
    return;
  }

  let raf = null;
  let tx = 0;
  let ty = 0;

  const update = () => {
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 1);
      layer.style.transform = `translate3d(${tx * depth}px, ${ty * depth}px, 0)`;
    });
    raf = null;
  };

  window.addEventListener("mousemove", (event) => {
    const cx = window.innerWidth * 0.5;
    const cy = window.innerHeight * 0.5;

    tx = ((event.clientX - cx) / cx) * 8;
    ty = ((event.clientY - cy) / cy) * 8;

    if (!raf) {
      raf = requestAnimationFrame(update);
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

  if (cfg.site?.homeEmbed?.enabled) {
    renderExternalHome();
    return;
  }

  setupCustomCursor();
  createTopbar();
  createOverlayMenu();
  renderPanels();
  renderProgressDots();
  createCornerNav();
  setupCalculator();
  setupHomeReplica();
  renderFooter();
  setupSectionObserver();
  setupPanelSwitchButtons();
  setupGsapMotion();
  setupMouseParallax();
};

init();
