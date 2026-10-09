/* AstroGuide dashboard interactions — front-end demo */
(function () {
  "use strict";

  const THEME_KEY = "astroguidE-theme";
  const RTL_KEY = "astroguidE-rtl";
  const body = document.body;
  const root = document.documentElement;
  const sidebarState = document.getElementById("sidebar-state");
  const toast = document.querySelector("[data-toast-container]");
  const profileMenu = document.querySelector("[data-profile-menu]");
  const readingDialog = document.querySelector("[data-reading-dialog]");
  let toastTimeout;

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  function updateThemeIcon() {
    const dark = body.classList.contains("dark-mode");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const icon = button.querySelector("i");
      if (icon) icon.setAttribute("data-lucide", dark ? "sun" : "moon");
      button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("title", dark ? "Light mode" : "Dark mode");
    });
    refreshIcons();
  }

  function applyTheme(theme, persist = true) {
    body.classList.toggle("dark-mode", theme === "dark");
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
    }
    updateThemeIcon();
  }

  function updateRTLControl() {
    const isRTL = root.getAttribute("dir") === "rtl";
    document.querySelectorAll("[data-rtl-toggle]").forEach((button) => {
      const label = button.querySelector("[data-rtl-label]");
      if (label) label.textContent = isRTL ? "LTR" : "RTL";
      button.setAttribute("aria-label", isRTL ? "Switch to left-to-right" : "Switch to right-to-left");
      button.setAttribute("title", isRTL ? "Switch to LTR" : "Switch to RTL");
    });
  }

  function applyRTL(enabled, persist = true) {
    root.setAttribute("dir", enabled ? "rtl" : "ltr");
    root.setAttribute("lang", "en");
    body.classList.toggle("rtl-mode", enabled);
    if (persist) {
      try { localStorage.setItem(RTL_KEY, String(enabled)); } catch (_) {}
    }
    updateRTLControl();
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 3200);
  }

  function showSection(name) {
    const target = document.getElementById("section-" + name);
    if (!target) return;
    document.querySelectorAll(".dashboard-section").forEach((section) => {
      section.classList.toggle("active", section === target);
    });
    document.querySelectorAll("[data-section]").forEach((button) => {
      const active = button.dataset.section === name;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    const title = document.getElementById("current-page-title");
    if (title) title.textContent = target.dataset.title || "Dashboard";
    if (sidebarState) sidebarState.checked = false;
    if (profileMenu) profileMenu.classList.remove("open");
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    refreshIcons();
  }

  function handleSectionClick(event) {
    const button = event.target.closest("[data-section], [data-section-target]");
    if (!button) return;
    event.preventDefault();
    const name = button.dataset.section || button.dataset.sectionTarget;
    if (name) showSection(name);
  }

  document.addEventListener("click", handleSectionClick);

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(body.classList.contains("dark-mode") ? "light" : "dark");
    });
  });

  document.querySelectorAll("[data-rtl-toggle]").forEach((button) => {
    button.addEventListener("click", () => applyRTL(root.getAttribute("dir") !== "rtl"));
  });

  document.querySelectorAll("[data-profile-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (profileMenu) profileMenu.classList.toggle("open");
    });
  });

  document.addEventListener("click", (event) => {
    if (profileMenu && !event.target.closest("[data-profile-menu]") && !event.target.closest("[data-profile-toggle]")) {
      profileMenu.classList.remove("open");
    }
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.toast));
  });

  document.querySelectorAll("[data-open-reading]").forEach((button) => {
    button.addEventListener("click", () => {
      const title = document.querySelector("[data-dialog-title]");
      if (title) title.textContent = button.dataset.openReading;
      if (readingDialog && typeof readingDialog.showModal === "function") readingDialog.showModal();
      else showToast("Reading summaries are ready to connect to your content service.");
      refreshIcons();
    });
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => readingDialog && readingDialog.close());
  });

  if (readingDialog) {
    readingDialog.addEventListener("click", (event) => {
      if (event.target === readingDialog) readingDialog.close();
    });
  }

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      try {
        localStorage.removeItem("astroguideUser");
        localStorage.removeItem("astroguideLoggedIn");
        sessionStorage.removeItem("astroguideUser");
        sessionStorage.removeItem("astroguideLoggedIn");
      } catch (_) {}
      showToast("You have been logged out of this demo.");
      window.setTimeout(() => { window.location.href = "./index.html"; }, 700);
    });
  });

  const markRead = document.querySelector("[data-mark-read]");
  if (markRead) {
    markRead.addEventListener("click", () => {
      document.querySelectorAll(".notification-item.unread").forEach((item) => {
        item.classList.remove("unread");
        const indicator = item.querySelector(".unread-indicator");
        if (indicator) indicator.remove();
      });
      document.querySelectorAll(".notification-dot").forEach((dot) => dot.remove());
      showToast("All notifications marked as read.");
    });
  }

  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    try {
      const saved = JSON.parse(localStorage.getItem("astroguideDashboardProfile") || "null");
      if (saved) {
        Object.entries(saved).forEach(([key, value]) => {
          const field = profileForm.elements.namedItem(key);
          if (field && typeof value === "string") field.value = value;
        });
        const name = saved.fullName;
        if (name) {
          const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
          document.querySelectorAll(".avatar, .topbar-avatar").forEach(el => { el.textContent = initials; });
          const nameNode = document.getElementById("sidebar-user-name");
          if (nameNode) nameNode.textContent = name;
        }
      }
    } catch (_) {}
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(profileForm).entries());
      try { localStorage.setItem("astroguideDashboardProfile", JSON.stringify(data)); } catch (_) {}
      if (data.fullName) {
        const initials = data.fullName.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
        document.querySelectorAll(".avatar, .topbar-avatar").forEach(el => { el.textContent = initials; });
        const nameNode = document.getElementById("sidebar-user-name");
        if (nameNode) nameNode.textContent = data.fullName;
      }
      showToast("Your profile preferences have been saved in this browser.");
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const dateLabel = document.querySelector("[data-today-label]");
  if (dateLabel) {
    dateLabel.textContent = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date());
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (sidebarState) sidebarState.checked = false;
      if (profileMenu) profileMenu.classList.remove("open");
    }
  });

  try {
    applyTheme(localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light", false);
    applyRTL(localStorage.getItem(RTL_KEY) === "true", false);
  } catch (_) {
    applyTheme("light", false);
    applyRTL(false, false);
  }
  refreshIcons();
})();
