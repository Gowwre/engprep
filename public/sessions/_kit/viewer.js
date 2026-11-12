/* =========================================================
   EngPrep deck viewer
   Navigation, reveal, menu, timer, fullscreen, auto-fit.
   The slides are already in the DOM; this file only drives.
   ========================================================= */

(function () {
  "use strict";

  const stage = document.getElementById("stage");
  const stageWrap = document.getElementById("stage-wrap");
  const sectionLabel = document.getElementById("section-label");
  const slideCounter = document.getElementById("slide-counter");
  const progressBar = document.getElementById("progress-bar");
  const hint = document.getElementById("hint");

  const menu = document.getElementById("menu");
  const menuList = document.getElementById("menu-list");
  const menuClose = document.getElementById("menu-close");
  const menuBtn = document.getElementById("menu-btn");
  const menuFs = document.getElementById("menu-fs");

  const timerBtn = document.getElementById("timer-btn");
  const timerPop = document.getElementById("timer-pop");
  const timerDisplay = document.getElementById("timer-display");
  const timerStart = document.getElementById("timer-start");
  const timerReset = document.getElementById("timer-reset");

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const fsBtn = document.getElementById("fs-btn");

  if (!stage) return;

  const slides = Array.from(stage.children);
  if (!slides.length) return;

  const supportsZoom =
    typeof CSS !== "undefined" && typeof CSS.supports === "function"
      ? CSS.supports("zoom", "0.9")
      : false;

  let current = 0;
  let menuOpen = false;
  const params = new URLSearchParams(window.location.search);

  if (params.has("noanim")) {
    document.documentElement.classList.add("no-anim");
  }

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (character) => {
      switch (character) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        default:
          return "&#39;";
      }
    });

  /* ---------------------------------------------------------------
     Auto-fit
     --------------------------------------------------------------- */

  function fitSlide(slide) {
    if (!slide) return;

    const body = slide.querySelector(".slide-body");
    const fit = slide.querySelector(".slide-fit");
    if (!body || !fit) return;

    fit.style.zoom = "1";
    fit.style.transform = "";
    fit.style.transformOrigin = "";

    const available = body.clientHeight;
    const needed = fit.scrollHeight;
    if (!available || needed <= available + 1) return;

    const scale = Math.max(0.78, available / needed);
    if (supportsZoom) {
      fit.style.zoom = String(scale);
    } else {
      fit.style.transform = `scale(${scale})`;
      fit.style.transformOrigin = "top center";
    }
  }

  /* ---------------------------------------------------------------
     Navigation
     --------------------------------------------------------------- */

  function go(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === current) return;

    slides[current]?.classList.remove("is-active");
    current = next;
    slides[current].classList.add("is-active");
    updateHud();
    fitSlide(slides[current]);
  }

  function updateHud() {
    const slide = slides[current];
    if (!slide) return;

    sectionLabel.textContent = slide.dataset.section || "";
    slideCounter.textContent = `${current + 1} / ${slides.length}`;
    progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;

    menuList.querySelectorAll(".menu-row").forEach((row) => {
      row.classList.toggle("is-current", row.dataset.section === slide.dataset.section);
    });
  }

  function activeSlide() {
    return slides[current];
  }

  function revealCurrent() {
    const slide = activeSlide();
    if (!slide || slide.classList.contains("is-revealed")) return false;

    const revealables = slide.querySelectorAll("[data-reveal]");
    if (!revealables.length) return false;

    slide.classList.add("is-revealed");
    revealables.forEach((element) => {
      element.hidden = false;
    });
    slide.querySelectorAll(".reveal-btn").forEach((button) => {
      button.hidden = true;
    });
    fitSlide(slide);
    return true;
  }

  function onEnter() {
    if (!revealCurrent()) go(current + 1);
  }

  /* ---------------------------------------------------------------
     Menu
     --------------------------------------------------------------- */

  function buildMenu() {
    const sections = [];

    slides.forEach((slide, index) => {
      const name = slide.dataset.section || "";
      let section = sections.find((item) => item.name === name);

      if (!section) {
        section = {
          name,
          start: index,
          end: index,
          summary: slide.dataset.sectionSummary || ""
        };
        sections.push(section);
      } else {
        section.end = index;
      }
    });

    menuList.innerHTML = sections
      .map(
        (section, index) => `<button class="menu-row" type="button" data-index="${
          section.start
        }" data-section="${escapeHtml(section.name)}">
          <span class="menu-no">${String(index + 1).padStart(2, "0")}</span>
          <span class="menu-name">${escapeHtml(section.name)}</span>
          <span class="menu-range">${section.start + 1}–${section.end + 1}</span>
          <span class="menu-desc">${escapeHtml(section.summary)}</span>
        </button>`
      )
      .join("");

    menuList.querySelectorAll(".menu-row").forEach((row) => {
      row.addEventListener("click", () => {
        go(Number(row.dataset.index));
        closeMenu();
      });
    });
  }

  function openMenu() {
    menu.hidden = false;
    menuOpen = true;
    updateHud();
    menuClose.focus();
  }

  function closeMenu() {
    menu.hidden = true;
    menuOpen = false;
  }

  /* ---------------------------------------------------------------
     Timer
     --------------------------------------------------------------- */

  let timerSeconds = 0;
  let timerTotal = 0;
  let timerInterval = null;
  let timerRunning = false;

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainder = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
  }

  function updateTimerUI() {
    const text = formatTime(timerSeconds);
    timerDisplay.textContent = text;
    timerBtn.textContent = `⏱ ${text}`;
    timerBtn.classList.toggle("is-running", timerRunning && timerSeconds > 0);
    timerBtn.classList.toggle(
      "is-done",
      timerSeconds === 0 && timerTotal > 0 && !timerRunning
    );
    timerStart.textContent = timerRunning ? "Tạm dừng" : "Bắt đầu";
  }

  function stopTimer() {
    timerRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    updateTimerUI();
  }

  function startTimer() {
    if (timerRunning) {
      stopTimer();
      return;
    }
    if (timerSeconds <= 0) return;

    timerRunning = true;
    timerInterval = setInterval(() => {
      timerSeconds -= 1;
      if (timerSeconds <= 0) {
        timerSeconds = 0;
        stopTimer();
      }
      updateTimerUI();
    }, 1000);
    updateTimerUI();
  }

  function setTimer(minutes) {
    stopTimer();
    timerTotal = minutes * 60;
    timerSeconds = timerTotal;
    updateTimerUI();
  }

  function resetTimer() {
    stopTimer();
    timerSeconds = 0;
    timerTotal = 0;
    updateTimerUI();
  }

  /* ---------------------------------------------------------------
     Fullscreen + scaling
     --------------------------------------------------------------- */

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  function fitStage() {
    const scale = Math.min(stageWrap.clientWidth / 1600, stageWrap.clientHeight / 900);
    document.documentElement.style.setProperty("--scale", String(scale));
  }

  /* ---------------------------------------------------------------
     Events
     --------------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (menuOpen) {
      if (event.key === "Escape" || event.key === "m" || event.key === "M") {
        event.preventDefault();
        closeMenu();
      }
      return;
    }

    switch (event.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        event.preventDefault();
        go(current + 1);
        break;
      case "ArrowLeft":
      case "PageUp":
        event.preventDefault();
        go(current - 1);
        break;
      case "Home":
        event.preventDefault();
        go(0);
        break;
      case "End":
        event.preventDefault();
        go(slides.length - 1);
        break;
      case "Enter":
        event.preventDefault();
        onEnter();
        break;
      case "m":
      case "M":
        event.preventDefault();
        openMenu();
        break;
      case "f":
      case "F":
        event.preventDefault();
        toggleFullscreen();
        break;
      case "Escape":
        closeMenu();
        break;
      default:
        break;
    }
  });

  stage.addEventListener("click", (event) => {
    const button = event.target.closest(".reveal-btn");
    if (button) revealCurrent();
  });

  prevBtn.addEventListener("click", () => go(current - 1));
  nextBtn.addEventListener("click", () => go(current + 1));
  menuBtn.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menuFs.addEventListener("click", toggleFullscreen);
  fsBtn.addEventListener("click", toggleFullscreen);

  menu.addEventListener("click", (event) => {
    if (event.target === menu) closeMenu();
  });

  timerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    timerPop.hidden = !timerPop.hidden;
  });

  timerPop.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (!timerPop.hidden) timerPop.hidden = true;
  });

  timerStart.addEventListener("click", startTimer);
  timerReset.addEventListener("click", resetTimer);

  timerPop.querySelectorAll("[data-min]").forEach((button) => {
    button.addEventListener("click", () => {
      setTimer(Number(button.dataset.min));
    });
  });

  let touchStartX = null;
  stage.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0]?.clientX ?? null;
    },
    { passive: true }
  );

  stage.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) return;
      const endX = event.changedTouches[0]?.clientX ?? touchStartX;
      const delta = endX - touchStartX;
      if (Math.abs(delta) > 45) {
        if (delta < 0) go(current + 1);
        else go(current - 1);
      }
      touchStartX = null;
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    fitStage();
    fitSlide(slides[current]);
  });

  document.addEventListener("fullscreenchange", () => {
    fitStage();
    fitSlide(slides[current]);
  });

  /* ---------------------------------------------------------------
     Audit mode: ?audit=1
     --------------------------------------------------------------- */

  async function runAudit() {
    if (document.fonts?.ready) await document.fonts.ready;

    const results = slides.map((slide, index) => {
      slides.forEach((item) => item.classList.remove("is-active"));
      slide.classList.add("is-active");

      const body = slide.querySelector(".slide-body");
      const fit = slide.querySelector(".slide-fit");

      if (!body || !fit) {
        return { index: index + 1, error: "missing slide body" };
      }

      fit.style.zoom = "1";
      fit.style.transform = "";

      const available = body.clientHeight;
      const needed = fit.scrollHeight;
      const overflow = Math.max(0, needed - available);

      fitSlide(slide);

      const postNeeded = fit.scrollHeight;
      const postOverflow = Math.max(0, postNeeded - body.clientHeight);
      const rectHeight = fit.getBoundingClientRect().height;
      const bodyHeight = body.getBoundingClientRect().height;
      const rectOverflow = Math.max(0, rectHeight - bodyHeight);

      const imageErrors = Array.from(slide.querySelectorAll("img")).filter(
        (image) => !image.complete || image.naturalWidth === 0
      ).length;

      return {
        index: index + 1,
        section: slide.dataset.section || "",
        type: slide.className,
        available,
        needed,
        overflow,
        postNeeded,
        postOverflow,
        rectHeight,
        bodyHeight,
        rectOverflow,
        zoom: fit.style.zoom || "1",
        imageErrors
      };
    });

    slides.forEach((slide, index) =>
      slide.classList.toggle("is-active", index === 0)
    );
    current = 0;
    updateHud();
    fitSlide(slides[0]);

    const pre = document.createElement("pre");
    pre.id = "audit";
    pre.textContent = JSON.stringify(
      {
        slideCount: slides.length,
        fonts: document.fonts?.status ?? "unknown",
        results
      },
      null,
      2
    );
    document.body.appendChild(pre);
  }

  /* ---------------------------------------------------------------
     Init
     --------------------------------------------------------------- */

  slides.forEach((slide, index) =>
    slide.classList.toggle("is-active", index === 0)
  );
  current = 0;

  const requestedSlide = Number(params.get("slide"));
  if (
    Number.isInteger(requestedSlide) &&
    requestedSlide >= 1 &&
    requestedSlide <= slides.length
  ) {
    slides.forEach((slide, index) =>
      slide.classList.toggle("is-active", index === requestedSlide - 1)
    );
    current = requestedSlide - 1;
  }

  buildMenu();
  updateHud();
  updateTimerUI();
  fitStage();
  fitSlide(slides[current]);

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      fitStage();
      fitSlide(slides[current]);
    });
  }

  if (params.has("reveal")) {
    revealCurrent();
  }

  if (params.has("menu")) {
    openMenu();
  }

  if (params.has("audit")) {
    runAudit();
  }

  setTimeout(() => hint?.classList.add("is-hidden"), 8000);
})();
