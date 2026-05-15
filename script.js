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
        ${cfg.site.menuLabel}
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
      (item) => `
        <a class="overlay-link" href="${item.target}">
          <span class="overlay-link-icon">${icons.spark}</span>
          <span>${item.label}</span>
          <span class="overlay-link-arrow">${icons.arrowRight}</span>
        </a>
      `
    )
    .join("");

  overlay.innerHTML = `
    <div class="overlay-inner">
      <div class="overlay-head">
        <p>${cfg.site.title}</p>
        <button class="circle-btn icon-btn js-menu-close" type="button" aria-label="Close menu">${icons.close}</button>
      </div>
      <div class="overlay-links">${items}</div>
    </div>
  `;

  document.body.appendChild(overlay);

  const openBtn = q(".js-menu-toggle");
  const closeBtn = q(".js-menu-close", overlay);

  const open = () => {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  };

  const close = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  overlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });
};

const renderIntro = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme} intro-panel" data-panel>
    ${renderPanelMetaIcon(panel.type)}
    <div class="axis-line"></div>
    <div class="axis-orb" aria-hidden="true"><span></span></div>
    <article class="intro-copy">
      <p class="panel-kicker anim-target">${panel.kicker}</p>
      <h1 class="panel-heading anim-target">${panel.title}</h1>
      <p class="panel-body anim-target">${panel.body}</p>
      <p class="intro-axis-hint anim-target">${panel.axisHint}</p>
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

const setupSectionObserver = () => {
  const panels = [...document.querySelectorAll("[data-panel]")];
  const dots = [...document.querySelectorAll(".progress-dot")];

  const updateActive = (id) => {
    panels.forEach((panel) => panel.classList.toggle("active", panel.id === id));
    dots.forEach((dot) => dot.classList.toggle("active", dot.dataset.target === `#${id}`));
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
  createTopbar();
  createOverlayMenu();
  renderPanels();
  renderProgressDots();
  createCornerNav();
  setupCalculator();
  renderFooter();
  setupSectionObserver();
  setupPanelSwitchButtons();
  setupGsapMotion();
  setupMouseParallax();
};

init();
