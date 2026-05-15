const cfg = window.RYOTAQC_CONTENT;

if (!cfg || !cfg.panels || !cfg.site) {
  throw new Error("content.js belum valid. Pastikan window.RYOTAQC_CONTENT tersedia.");
}

const q = (selector, root = document) => root.querySelector(selector);

const createTopbar = () => {
  const topbar = q("#topbar");
  const links = cfg.site.topLinks
    .map((item) => `<a class="top-nav-link" href="${item.target}">${item.label}</a>`)
    .join("");

  topbar.innerHTML = `
    <div class="topbar-left">
      <button class="circle-btn" type="button" aria-hidden="true">?</button>
      <button class="circle-btn" type="button" aria-hidden="true">?</button>
      <a class="pill-btn" href="#panel-intro">${cfg.site.brandPill}</a>
    </div>
    <nav class="topbar-center" aria-label="Primary">${links}</nav>
    <div class="topbar-right">
      <button class="pill-btn menu-pill" type="button" aria-label="Open menu">${cfg.site.menuLabel} <span>=</span></button>
    </div>
  `;
};

const renderIntro = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme} intro-panel" data-panel>
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
    <p class="panel-kicker anim-target">${cfg.site.introTag}</p>
    <div class="strip-wrap">
      ${panel.words.map((word) => `<div class="word-strip anim-target">${word}</div>`).join("")}
    </div>
    <p class="strip-caption anim-target">${panel.caption}</p>
  </section>
`;

const renderCards = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
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
              <h3>${card.title}</h3>
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
    <div class="steps-grid">
      <article>
        <p class="panel-kicker anim-target">${panel.kicker}</p>
        <h2 class="panel-heading anim-target">${panel.heading}</h2>
        <ol class="step-list">
          ${panel.steps.map((step) => `<li class="step-item anim-target">${step}</li>`).join("")}
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
    <p class="panel-kicker anim-target">${panel.kicker}</p>
    <h2 class="panel-heading anim-target">${panel.heading}</h2>
    <div class="links-grid">
      ${panel.groups
        .map(
          (group) => `
            <article class="link-box anim-target">
              <h3>${group.name}</h3>
              ${group.links.map((link) => `<a href="${link.href}" target="_blank" rel="noopener">${link.label}</a>`).join("")}
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderCta = (panel) => `
  <section id="${panel.id}" class="motion-panel theme-${panel.theme}" data-panel>
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

const renderFooter = () => {
  q("#site-footer").innerHTML = `
    <span>${cfg.footer.left}</span>
    <span>${cfg.footer.right}</span>
  `;
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
  renderPanels();
  renderProgressDots();
  renderFooter();
  setupSectionObserver();
  setupGsapMotion();
  setupMouseParallax();
};

init();
