/* ==========================================================================
   ASTROGUIDE — GLOBAL JAVASCRIPT
   ========================================================================== */


/* ==========================================================================
   GLOBAL SETTINGS
   ========================================================================== */

const THEME_KEY = "astroguidE-theme";
const RTL_KEY = "astroguidE-rtl";


/* ==========================================================================
   LUCIDE ICONS
   ========================================================================== */

function refreshLucideIcons() {

    if (
        typeof lucide !== "undefined" &&
        typeof lucide.createIcons === "function"
    ) {

        lucide.createIcons();

    }

}

/* ==========================================================================
   HOME 2 — TRUSTED BY COUNTER
   ========================================================================== */

function initHome2Counters() {

    const counters = document.querySelectorAll(".ag-home2-counter");

    if (!counters.length) return;

    const animateCounter = (counter) => {

        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";

        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                easedProgress * target
            );

            counter.textContent =
                currentValue.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent =
                    target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    };


    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                if (counter.dataset.animated === "true") {
                    return;
                }

                counter.dataset.animated = "true";

                animateCounter(counter);

                observerInstance.unobserve(counter);

            });

        },
        {
            threshold: 0.35
        }
    );


    counters.forEach((counter) => {
        observer.observe(counter);
    });

}
/* ==========================================================================
   DARK MODE
   ========================================================================== */

function initTheme() {

    const savedTheme =
        localStorage.getItem(THEME_KEY);

    if (savedTheme === "dark") {

        applyTheme("dark");

    } else {

        applyTheme("light");

    }

}


/* --------------------------------------------------------------------------
   Apply Theme
   -------------------------------------------------------------------------- */

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        localStorage.setItem(
            THEME_KEY,
            "dark"
        );

    } else {

        document.body.classList.remove("dark-mode");

        localStorage.setItem(
            THEME_KEY,
            "light"
        );

    }

    updateThemeIcon();

}


/* --------------------------------------------------------------------------
   Toggle Theme
   -------------------------------------------------------------------------- */

function toggleTheme() {

    const isDark =
        document.body.classList.contains("dark-mode");

    if (isDark) {

        applyTheme("light");

    } else {

        applyTheme("dark");

    }

}


/* --------------------------------------------------------------------------
   Update Theme Icon
   -------------------------------------------------------------------------- */

function updateThemeIcon() {

    const button =
        document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    const icon =
        button.querySelector("i");

    const isDark =
        document.body.classList.contains("dark-mode");

    if (icon) {

        icon.setAttribute(
            "data-lucide",
            isDark ? "sun" : "moon"
        );

    }

    button.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

    button.setAttribute(
        "title",
        isDark
            ? "Light mode"
            : "Dark mode"
    );

    refreshLucideIcons();

}


/* --------------------------------------------------------------------------
   Theme Button
   -------------------------------------------------------------------------- */

function initThemeToggle() {

    const button =
        document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            toggleTheme();

        }
    );

}


/* ==========================================================================
   RTL
   ========================================================================== */

function initRTL() {

    const savedRTL =
        localStorage.getItem(RTL_KEY);

    if (savedRTL === "true") {

        applyRTL(true);

    } else {

        applyRTL(false);

    }

}


/* --------------------------------------------------------------------------
   Apply RTL
   -------------------------------------------------------------------------- */

function applyRTL(enabled) {

    if (enabled) {

        document.documentElement.setAttribute(
            "dir",
            "rtl"
        );

        document.body.classList.add(
            "rtl-mode"
        );

        localStorage.setItem(
            RTL_KEY,
            "true"
        );

    } else {

        document.documentElement.setAttribute(
            "dir",
            "ltr"
        );

        document.body.classList.remove(
            "rtl-mode"
        );

        localStorage.setItem(
            RTL_KEY,
            "false"
        );

    }

    updateRTLButton();

}


/* --------------------------------------------------------------------------
   Toggle RTL
   -------------------------------------------------------------------------- */

function toggleRTL() {

    const isRTL =
        document.documentElement.getAttribute("dir") === "rtl";

    applyRTL(!isRTL);

}


/* --------------------------------------------------------------------------
   Update RTL Button
   -------------------------------------------------------------------------- */

function updateRTLButton() {

    const button =
        document.getElementById("rtlToggle");

    if (!button) {
        return;
    }

    const isRTL =
        document.documentElement.getAttribute("dir") === "rtl";

    button.setAttribute(
        "aria-label",
        isRTL
            ? "Switch to left-to-right"
            : "Switch to right-to-left"
    );

    button.setAttribute(
        "title",
        isRTL
            ? "Switch to LTR"
            : "Switch to RTL"
    );

}


/* --------------------------------------------------------------------------
   RTL Button
   -------------------------------------------------------------------------- */

function initRTLToggle() {

    const button =
        document.getElementById("rtlToggle");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            toggleRTL();

        }
    );

}


/* ==========================================================================
   HOME DROPDOWN
   ========================================================================== */


function initHomeDropdown() {
  const dropdown = document.querySelector(".st-nav-dropdown");
  const toggle = document.querySelector(".st-nav-dropdown-toggle");
  const menu = document.querySelector(".st-nav-dropdown-menu");

  if (!dropdown || !toggle || !menu) return;

  let closeTimer;

  function openDropdown() {
    clearTimeout(closeTimer);
    dropdown.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }, 200);
  }

  dropdown.addEventListener("mouseenter", openDropdown);
  dropdown.addEventListener("mouseleave", closeDropdown);

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (dropdown.classList.contains("is-open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  menu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      clearTimeout(closeTimer);
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      clearTimeout(closeTimer);
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  menu.querySelectorAll(".st-nav-dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      clearTimeout(closeTimer);
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}



/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */

function initMobileNavigation() {

    const menuButton =
        document.getElementById(
            "mobileMenuToggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (!menuButton || !mobileMenu) {

        return;

    }


    /* ----------------------------------------------------------------------
       Initial state
       ---------------------------------------------------------------------- */

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );

    mobileMenu.classList.remove(
        "is-open"
    );


    /* ----------------------------------------------------------------------
       Hamburger
       ---------------------------------------------------------------------- */

    menuButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            const isOpen =
                mobileMenu.classList.contains(
                    "is-open"
                );


            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    /* ----------------------------------------------------------------------
       Mobile Home dropdown
       ---------------------------------------------------------------------- */

    const homeGroup =
        mobileMenu.querySelector(
            ".st-mobile-home-group"
        );

    const homeToggle =
        mobileMenu.querySelector(
            ".st-mobile-home-toggle"
        );


    if (homeGroup && homeToggle) {

        homeToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        homeToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                const isOpen =
                    homeGroup.classList.contains(
                        "is-open"
                    );


                if (isOpen) {

                    homeGroup.classList.remove(
                        "is-open"
                    );

                    homeToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    homeGroup.classList.add(
                        "is-open"
                    );

                    homeToggle.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    }


    /* ----------------------------------------------------------------------
       Close when selecting links
       ---------------------------------------------------------------------- */

    const mobileLinks =
        mobileMenu.querySelectorAll(
            ".st-mobile-nav-link:not(.st-mobile-home-toggle), " +
            ".st-mobile-dropdown-link, " +
            ".st-mobile-menu-actions a"
        );


    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        }
    );


    /* ----------------------------------------------------------------------
       Outside click
       ---------------------------------------------------------------------- */

    document.addEventListener(
        "click",
        function (event) {

            if (
                mobileMenu.classList.contains("is-open") &&
                !mobileMenu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ----------------------------------------------------------------------
       Escape
       ---------------------------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    /* ----------------------------------------------------------------------
       Resize
       ---------------------------------------------------------------------- */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 1365) {

                closeMobileMenu();

            }

        }
    );

}


/* ==========================================================================
   OPEN MOBILE MENU
   ========================================================================== */

function openMobileMenu() {

    const menuButton =
        document.getElementById(
            "mobileMenuToggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (!menuButton || !mobileMenu) {
        return;
    }


    mobileMenu.classList.add(
        "is-open"
    );


    mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );


    menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );


    const icon =
        menuButton.querySelector("i");


    if (icon) {

        icon.setAttribute(
            "data-lucide",
            "x"
        );

    }


    refreshLucideIcons();

}


/* ==========================================================================
   CLOSE MOBILE MENU
   ========================================================================== */

function closeMobileMenu() {

    const menuButton =
        document.getElementById(
            "mobileMenuToggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    if (!menuButton || !mobileMenu) {
        return;
    }


    mobileMenu.classList.remove(
        "is-open"
    );


    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    const icon =
        menuButton.querySelector("i");


    if (icon) {

        icon.setAttribute(
            "data-lucide",
            "menu"
        );

    }


    const homeGroup =
        mobileMenu.querySelector(
            ".st-mobile-home-group"
        );

    const homeToggle =
        mobileMenu.querySelector(
            ".st-mobile-home-toggle"
        );


    if (homeGroup) {

        homeGroup.classList.remove(
            "is-open"
        );

    }


    if (homeToggle) {

        homeToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    refreshLucideIcons();

}


/* ==========================================================================
   GLOBAL INITIALIZATION
   ========================================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* Dark mode */
        initTheme();
        initThemeToggle();
        initHome2Counters();


        /* RTL */
        initRTL();
        initRTLToggle();


        /* Desktop Home dropdown */
        initHomeDropdown();


        /* Mobile hamburger */
        initMobileNavigation();


        /* Lucide */
        refreshLucideIcons();

    }
);

/* =========================================================
   ABOUT — WHAT WE BELIEVE REVEAL
   ========================================================= */

function initAboutBeliefsReveal() {
    const section = document.querySelector(".ag-about-beliefs");

    if (!section) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                section.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    observer.observe(section);
}

document.addEventListener("DOMContentLoaded", () => {
    initAboutBeliefsReveal();
});

/* =========================================================
   ABOUT — OUR APPROACH REVEAL
   ========================================================= */

function initAboutApproachReveal() {
    const section = document.querySelector(".ag-about-approach");

    if (!section) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                section.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    observer.observe(section);
}

document.addEventListener("DOMContentLoaded", () => {
    initAboutApproachReveal();
});

/* =========================================================
   ABOUT — OUR BEST ASTROLOGERS REVEAL
   ========================================================= */

function initAboutAstrologersReveal() {
    const section = document.querySelector(".ag-about-astrologers");

    if (!section) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                section.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    observer.observe(section);
}

document.addEventListener("DOMContentLoaded", () => {
    initAboutAstrologersReveal();
});



/* =========================================================
   ASTROGUIDE — LUCIDE MOON / SUN THEME ICON FIX
   ========================================================= */

(function () {
    function syncThemeIcon() {
        const button = document.getElementById("themeToggle");

        if (!button) return;

        const isDark = document.body.classList.contains("dark-mode");

        let icon = button.querySelector("i");

        if (!icon) {
            icon = document.createElement("i");
            icon.setAttribute("aria-hidden", "true");
            button.replaceChildren(icon);
        }

        // Use real Lucide icons
        icon.setAttribute("data-lucide", isDark ? "sun" : "moon");

        button.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        button.setAttribute(
            "title",
            isDark ? "Light mode" : "Dark mode"
        );

        // Render the selected Lucide icon
        if (typeof lucide !== "undefined" && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    // Initial icon
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", syncThemeIcon);
    } else {
        syncThemeIcon();
    }

    // Update after the existing theme toggle handler
    document.getElementById("themeToggle")?.addEventListener("click", () => {
        requestAnimationFrame(syncThemeIcon);
    });

    // Also respond when another script changes dark mode
    const observer = new MutationObserver(syncThemeIcon);

    function observeTheme() {
        if (!document.body) return;

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"]
        });

        syncThemeIcon();
    }

    if (document.body) {
        observeTheme();
    } else {
        document.addEventListener("DOMContentLoaded", observeTheme, {
            once: true
        });
    }
})();
