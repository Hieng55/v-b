const header = document.querySelector("[data-site-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuToggleLabel = menuToggle?.querySelector(".menu-toggle__label");

if (header && menu && menuToggle) {
  const setMenuState = (isOpen, { returnFocus = false } = {}) => {
    menu.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    if (menuToggleLabel) menuToggleLabel.textContent = isOpen ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", isOpen);

    if (returnFocus) {
      menuToggle.focus();
    }
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.matchMedia("(max-width: 52rem)").matches) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setMenuState(false, { returnFocus: true });
    }
  });

  window.matchMedia("(min-width: 52.0625rem)").addEventListener("change", (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  });
}

class HeroSlider {
  constructor(root) {
    this.root = root;
    this.slides = [...root.querySelectorAll("[data-hero-slide]")];
    this.dots = [...root.querySelectorAll("[data-hero-dot]")];
    this.previousButton = root.querySelector("[data-hero-previous]");
    this.nextButton = root.querySelector("[data-hero-next]");
    this.currentIndex = 0;
    this.autoplayDelay = 6500;
    this.autoplayTimer = null;
    this.touchStartX = 0;
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (this.slides.length < 2) return;

    this.bindEvents();
    this.startAutoplay();
  }

  show(index, { restart = true } = {}) {
    const nextIndex = (index + this.slides.length) % this.slides.length;
    this.currentIndex = nextIndex;

    this.slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === nextIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    this.dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === nextIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });

    if (restart) this.restartAutoplay();
  }

  startAutoplay() {
    if (this.reducedMotion.matches || document.hidden) return;
    window.clearInterval(this.autoplayTimer);
    this.autoplayTimer = window.setInterval(() => {
      this.show(this.currentIndex + 1, { restart: false });
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    window.clearInterval(this.autoplayTimer);
    this.autoplayTimer = null;
  }

  restartAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  bindEvents() {
    this.previousButton?.addEventListener("click", () => this.show(this.currentIndex - 1));
    this.nextButton?.addEventListener("click", () => this.show(this.currentIndex + 1));

    this.dots.forEach((dot) => {
      dot.addEventListener("click", () => this.show(Number(dot.dataset.heroDot)));
    });

    this.root.addEventListener("pointerenter", () => this.stopAutoplay());
    this.root.addEventListener("pointerleave", () => this.startAutoplay());
    this.root.addEventListener("focusin", () => this.stopAutoplay());
    this.root.addEventListener("focusout", (event) => {
      if (!this.root.contains(event.relatedTarget)) this.startAutoplay();
    });

    this.root.addEventListener("touchstart", (event) => {
      this.touchStartX = event.changedTouches[0].clientX;
      this.stopAutoplay();
    }, { passive: true });

    this.root.addEventListener("touchend", (event) => {
      const distance = event.changedTouches[0].clientX - this.touchStartX;
      if (Math.abs(distance) > 48) {
        this.show(this.currentIndex + (distance < 0 ? 1 : -1));
      } else {
        this.startAutoplay();
      }
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.stopAutoplay();
      else this.startAutoplay();
    });

    this.reducedMotion.addEventListener("change", () => {
      if (this.reducedMotion.matches) this.stopAutoplay();
      else this.startAutoplay();
    });
  }
}

document.querySelectorAll("[data-hero-slider]").forEach((slider) => {
  new HeroSlider(slider);
});

const revealTargets = document.querySelectorAll("[data-reveal]");

if (revealTargets.length) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    revealTargets.forEach((target) => revealObserver.observe(target));
  }
}

const sectionNavigation = [...document.querySelectorAll(".nav-link[href^='#']")]
  .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
  .filter((item) => item.section);

if (sectionNavigation.length) {
  const setActiveNavigation = (activeId) => {
    sectionNavigation.forEach(({ link, section }) => {
      const isActive = section.id === activeId;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  let navigationFrame = null;
  const updateActiveNavigation = () => {
    const checkpoint = window.scrollY + (window.innerHeight * 0.42);
    const activeItem = sectionNavigation.reduce((current, item) => {
      return item.section.offsetTop <= checkpoint ? item : current;
    }, sectionNavigation[0]);

    setActiveNavigation(activeItem.section.id);
    navigationFrame = null;
  };

  const requestNavigationUpdate = () => {
    if (navigationFrame) return;
    navigationFrame = window.requestAnimationFrame(updateActiveNavigation);
  };

  window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
  window.addEventListener("resize", requestNavigationUpdate);
  updateActiveNavigation();
}

class ServiceTabs {
  constructor(root) {
    this.root = root;
    this.tabs = [...root.querySelectorAll("[data-service-tab]")];
    this.panels = [...root.querySelectorAll("[data-service-panel]")];

    if (!this.tabs.length || !this.panels.length) return;
    this.bindEvents();
  }

  activate(category, { focus = false } = {}) {
    this.tabs.forEach((tab) => {
      const isActive = tab.dataset.serviceTab === category;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && focus) tab.focus();
    });

    this.panels.forEach((panel) => {
      const isActive = panel.dataset.servicePanel === category;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
    });
  }

  bindEvents() {
    this.tabs.forEach((tab, tabIndex) => {
      tab.addEventListener("click", () => this.activate(tab.dataset.serviceTab));

      tab.addEventListener("keydown", (event) => {
        const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
        if (!keys.includes(event.key)) return;
        event.preventDefault();

        let nextIndex = tabIndex;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (tabIndex + 1) % this.tabs.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (tabIndex - 1 + this.tabs.length) % this.tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = this.tabs.length - 1;

        this.activate(this.tabs[nextIndex].dataset.serviceTab, { focus: true });
      });
    });
  }
}

document.querySelectorAll("[data-service-tabs]").forEach((tabs) => {
  new ServiceTabs(tabs);
});
