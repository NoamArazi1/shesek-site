/* =========================================================================
   Shesek — main.js
   ========================================================================= */
(function () {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const L = window.SITE, I = window.I18N;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = { lang: "en" };   // English-only site
  const t = (k) => (I[state.lang] && I[state.lang][k]) || k;

  /* ---------- inline SVG icons ---------- */
  const ICON = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.6c0-.4.3-.6.7-.6z"/></svg>',
    spotify:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.7.7 0 01-1 .23c-2.6-1.6-5.9-1.95-9.8-1.06a.7.7 0 11-.3-1.37c4.25-.97 7.9-.56 10.8 1.2.34.2.45.64.3 1zm1.2-2.9a.87.87 0 01-1.2.29c-3-1.84-7.55-2.37-11.1-1.3a.87.87 0 11-.5-1.67c4.05-1.22 9.06-.62 12.5 1.49.42.25.55.8.3 1.19zm.1-3c-3.6-2.13-9.5-2.33-12.9-1.29a1.04 1.04 0 11-.6-2c3.95-1.2 10.45-.96 14.6 1.5a1.04 1.04 0 11-1.06 1.79z"/></svg>',
    apple:     '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.5c-.03-2.6 2.13-3.85 2.22-3.91-1.21-1.77-3.1-2.02-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.46 7.84 1.3 10.41.86 1.26 1.88 2.67 3.22 2.62 1.29-.05 1.78-.83 3.34-.83 1.56 0 2 .83 3.37.81 1.39-.03 2.27-1.28 3.12-2.55.98-1.46 1.39-2.87 1.41-2.94-.03-.01-2.7-1.04-2.73-4.13zM14.6 4.84c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-2.99 1.54-.66.76-1.23 1.98-1.08 3.15 1.14.09 2.3-.58 3.01-1.44z"/></svg>',
    youtube:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 002 8.2 31 31 0 002 12a31 31 0 00.1 3.8 3 3 0 002.1 2.1c1.9.6 7.8.6 7.8.6s6 0 7.9-.6a3 3 0 002.1-2.1A31 31 0 0022 12a31 31 0 00-.1-3.8zM10 15V9l5.2 3z"/></svg>'
  };
  const PLATFORMS = [
    ["instagram", "instagram"], ["spotify", "spotify"], ["youtube", "youtube"],
    ["apple", "apple"], ["facebook", "facebook"]
  ];

  function socialLinks() {
    return PLATFORMS.map(([key, icon]) => {
      const href = L.links[key];
      if (!href) return "";
      return `<a href="${href}" target="_blank" rel="noopener" aria-label="${key}">${ICON[icon]}</a>`;
    }).join("");
  }

  /* ---------- render static (language-independent / data-i18n driven) ---------- */
  function renderStatic() {
    $("#heroSocial").innerHTML = socialLinks();
    $("#footerSocial").innerHTML = socialLinks();

    // spotify
    const sp = L.spotify;
    const h = sp.type === "album" ? 420 : 380;
    $("#spotifyWrap").innerHTML =
      `<iframe loading="lazy" height="${h}" allow="encrypted-media" allowfullscreen
        src="https://open.spotify.com/embed/${sp.type}/${sp.id}?utm_source=generator&theme=0"></iframe>`;

    // featured video (top of music). file:// can't embed YouTube → thumbnail that opens a tab.
    const vf = $("#videoFeature"), vid = L.featuredVideo;
    if (vf && vid) {
      if (location.protocol === "file:") {
        vf.innerHTML =
          `<a class="video-link" href="https://youtu.be/${vid}" target="_blank" rel="noopener"
              style="background-image:url('https://img.youtube.com/vi/${vid}/maxresdefault.jpg')">
             <span class="video-play" aria-hidden="true">►</span>
           </a>`;
      } else {
        vf.innerHTML =
          `<iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${vid}"
             allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      }
    }

    // music links
    const ml = [
      ["spotify", "music.spotify"], ["apple", "music.apple"], ["youtube", "music.youtube"]
    ].filter(([k]) => L.links[k]);
    $("#musicLinks").innerHTML = ml.map(([k, key]) =>
      `<a class="music-link" href="${L.links[k]}" target="_blank" rel="noopener">${ICON[k]}<span data-i18n="${key}"></span></a>`
    ).join("");

    // gallery
    $("#galleryGrid").innerHTML = L.gallery.map((g, i) => {
      if (g.type === "video") {
        const thumb = `https://img.youtube.com/vi/${g.id}/hqdefault.jpg`;
        return `<div class="gallery-item is-video" data-idx="${i}"><img src="${thumb}" alt="${g.caption || ""}" loading="lazy"></div>`;
      }
      return `<div class="gallery-item" data-idx="${i}"><img src="${g.src}" alt="${g.caption || ""}" loading="lazy"></div>`;
    }).join("");

    // merch cards (front ⇄ back on hover / tap)
    $("#merchCards").innerHTML = L.merch.map(m => {
      const back = m.imgBack ? `<img class="merch-back" src="${m.imgBack}" alt="" loading="lazy">` : "";
      const flip = m.imgBack ? `<span class="merch-flip" aria-hidden="true">⇄</span>` : "";
      return `<div class="merch-card">
        <div class="merch-img">
          <img class="merch-front" src="${m.img}" alt="${m.name[state.lang]}" loading="lazy"
               onerror="this.parentNode.innerHTML='<span class=&quot;merch-ph&quot;>${t("merch.soon")}</span>'">
          ${back}${flip}
        </div>
        <div class="merch-meta">
          <span class="merch-name">${m.name[state.lang]}</span>
          <span class="merch-price">₪${m.price}</span>
        </div>
      </div>`;
    }).join("");
    $("#merchCards").addEventListener("click", e => {
      const card = e.target.closest(".merch-card");
      if (card) card.classList.toggle("flipped");
    });

    // contact links
    $("#footerEmail").href = "mailto:" + L.links.email;
    $("#footerEmail").textContent = L.links.email;
    $("#footerPhone").href = "tel:" + L.links.phone;
    $("#footerPhone").textContent = L.links.phoneDisplay;
    $("#bookingLink").href = "mailto:" + L.links.email + "?subject=Booking%20Shesek";
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- render language-dependent ---------- */
  function renderLang() {
    // shows
    const list = $("#showsList");
    if (!L.shows.length) {
      list.innerHTML = `<p class="shows-empty">${t("shows.empty")}</p>`;
    } else {
      list.innerHTML = L.shows.map(s => {
        const d = new Date(s.date + "T00:00:00");
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const tickets = s.tickets
          ? `<a class="btn btn-ghost" href="${s.tickets}" target="_blank" rel="noopener">${t("shows.tickets")}</a>`
          : `<span></span>`;
        return `<div class="show-row">
          <span class="show-date">${dd}.${mm}.${String(d.getFullYear()).slice(2)}</span>
          <span class="show-info"><span class="show-venue">${s.venue[state.lang]}</span> <span class="show-city">${s.city[state.lang]}</span></span>
          ${tickets}
        </div>`;
      }).join("");
    }

    // merch select
    const itemSel = $("#of-item"), sizeSel = $("#of-size");
    if (itemSel) {
      itemSel.innerHTML = L.merch.map((m, i) => `<option value="${m.name.en}">${m.name[state.lang]} — ₪${m.price}</option>`).join("");
      const fillSizes = () => {
        const m = L.merch[Math.max(0, itemSel.selectedIndex)] || L.merch[0];
        sizeSel.innerHTML = (m.sizes || []).map(s => `<option>${s}</option>`).join("");
      };
      itemSel.onchange = fillSizes;
      fillSizes();
    }
  }

  /* ---------- apply translations ---------- */
  function applyI18n() {
    const html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === "he" ? "rtl" : "ltr";
    html.classList.toggle("lang-he", state.lang === "he");
    html.classList.toggle("lang-en", state.lang === "en");

    renderLang();

    $$("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
  }

  function toggleLang() {
    state.lang = state.lang === "he" ? "en" : "he";
    localStorage.setItem("shesek-lang", state.lang);
    applyI18n();
  }

  /* ---------- nav scroll state ---------- */
  function onScroll() {
    $("#nav").classList.toggle("scrolled", window.scrollY > 40);
    drawSpine();
  }

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    const shot = location.search.indexOf("shot") !== -1;
    if (reduce || shot) { $$(".reveal").forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(e => io.observe(e));
  }

  /* ---------- ink spine ---------- */
  const spinePath = $(".spine-path");
  function buildSpine() {
    const H = 1000, amp = 26, cx = 50, pts = [];
    for (let y = 0; y <= H; y += 10) {
      const x = cx + amp * Math.sin(y / 70) * Math.cos(y / 230);
      pts.push(`${x.toFixed(1)} ${y}`);
    }
    spinePath.setAttribute("d", "M " + pts.join(" L "));
    const len = spinePath.getTotalLength();
    spinePath.style.strokeDasharray = len;
    spinePath.dataset.len = len;
    drawSpine();
  }
  function drawSpine() {
    if (!spinePath.dataset.len) return;
    const len = +spinePath.dataset.len;
    const max = document.body.scrollHeight - window.innerHeight;
    const prog = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    spinePath.style.strokeDashoffset = len * (1 - prog);
  }

  /* ---------- hero background slideshow (cross-fade) ---------- */
  function initHeroSlides() {
    const wrap = $("#heroSlides");
    const slides = (L.heroSlides || []);
    if (!wrap || !slides.length) return;
    wrap.innerHTML = slides.map((src, i) =>
      `<div class="hero-slide${i === 0 ? " active" : ""}" style="background-image:url('${src}')"></div>`
    ).join("");
    const els = $$(".hero-slide", wrap);
    if (els.length < 2 || reduce || location.search.indexOf("shot") !== -1) return;
    let i = 0;
    setInterval(() => {
      els[i].classList.remove("active");
      i = (i + 1) % els.length;
      els[i].classList.add("active");
    }, 5200);
  }

  /* ---------- hero waveform ---------- */
  function initWave() {
    const cv = $("#heroWave");
    const ctx = cv.getContext("2d");
    let w, h, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const layers = [
      { amp: 0.10, freq: 1.4, speed: 0.018, alpha: 0.55, off: 0 },
      { amp: 0.07, freq: 2.3, speed: 0.026, alpha: 0.30, off: 2 },
      { amp: 0.045, freq: 3.6, speed: 0.012, alpha: 0.18, off: 4 }
    ];
    function wave(p) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const nx = x / w;
        const env = Math.sin(nx * Math.PI);            // taper at edges
        const y = h / 2 + Math.sin(nx * Math.PI * 2 * p.freq + p.phase) * h * p.amp * env;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(224,151,58,${p.alpha})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    let raf;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      layers.forEach(l => { l.phase = (l.phase || l.off) + l.speed; wave(l); });
      raf = requestAnimationFrame(frame);
    }
    if (reduce) { layers.forEach(l => { l.phase = l.off; wave(l); }); }
    else frame();
  }

  /* ---------- lightbox ---------- */
  function initLightbox() {
    const box = $("#lightbox"), content = $("#lightboxContent");
    function open(item) {
      if (item.type === "video") {
        // YouTube refuses to embed from file:// (error 153) — open it directly instead.
        if (location.protocol === "file:") { window.open("https://youtu.be/" + item.id, "_blank", "noopener"); return; }
        content.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
      } else {
        content.innerHTML = `<img src="${item.src}" alt="${item.caption || ""}">`;
      }
      box.classList.add("open"); box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("open"); box.setAttribute("aria-hidden", "true");
      content.innerHTML = ""; document.body.style.overflow = "";
    }
    $("#galleryGrid").addEventListener("click", e => {
      const tile = e.target.closest(".gallery-item");
      if (!tile) return;
      open(L.gallery[+tile.dataset.idx]);
    });
    $("#lightboxClose").addEventListener("click", close);
    box.addEventListener("click", e => { if (e.target === box) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* ---------- forms ---------- */
  function handleForm(form, endpoint, msgEl, successKey, btnTextKey) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = form.querySelector("button[type=submit]");
      const orig = btn.textContent;
      btn.disabled = true; btn.textContent = t("form.submit.sending");
      msgEl.textContent = ""; msgEl.className = "form-msg";

      const done = (ok) => {
        btn.disabled = false; btn.textContent = orig;
        msgEl.textContent = ok ? t(successKey) : t("form.error");
        msgEl.className = "form-msg " + (ok ? "ok" : "err");
        if (ok) form.reset();
      };

      // preview mode — endpoint not configured yet
      if (!endpoint || endpoint.includes("REPLACE")) {
        console.warn("[Shesek] Form endpoint not configured — simulating success. Set it in data.js → forms.");
        setTimeout(() => done(true), 600);
        return;
      }
      try {
        const res = await fetch(endpoint, {
          method: "POST", body: new FormData(form), headers: { Accept: "application/json" }
        });
        done(res.ok);
      } catch (_) { done(false); }
    });
  }

  /* ---------- init ---------- */
  function init() {
    if (location.search.indexOf("shot") !== -1) document.documentElement.classList.add("shot");
    renderStatic();
    applyI18n();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", drawSpine);
    buildSpine();
    initReveal();
    initHeroSlides();
    initWave();
    initLightbox();
    handleForm($("#orderForm"), L.forms.order, $("#orderMsg"), "form.success.order");
    handleForm($("#newsForm"), L.forms.newsletter, $("#newsMsg"), "news.success");
    handleForm($("#heroNewsForm"), L.forms.newsletter, $("#heroNewsMsg"), "news.success");
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
