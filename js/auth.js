
document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  const body = document.body;

  const THEME_KEY = "astroguidE-theme";
  const RTL_KEY = "astroguidE-rtl";

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");

  const passwordToggles = document.querySelectorAll(
    ".password-toggle, #passwordToggle"
  );

  const signupForm = document.getElementById("signupForm");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const formMessage = document.getElementById("formMessage");

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Theme
  function applyTheme(isDark) {
    body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
      themeToggle.innerHTML = isDark
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );

      themeToggle.title = isDark
        ? "Switch to light mode"
        : "Switch to dark mode";
    }

    const themeColor = document.querySelector(
      'meta[name="theme-color"]'
    );

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        isDark ? "#000000" : "#F8F1EB"
      );
    }

    try {
      localStorage.setItem(
        THEME_KEY,
        isDark ? "dark" : "light"
      );
    } catch (error) {}

    refreshIcons();
  }

  // RTL
  function applyRTL(isRTL) {
    root.setAttribute("dir", isRTL ? "rtl" : "ltr");

    if (rtlToggle) {
      rtlToggle.innerHTML =
        '<i data-lucide="arrow-left-right"></i>';

      rtlToggle.setAttribute(
        "aria-label",
        isRTL ? "Switch to LTR" : "Switch to RTL"
      );

      rtlToggle.title = isRTL ? "Switch to LTR" : "Switch to RTL";
    }

    try {
      localStorage.setItem(RTL_KEY, String(isRTL));
    } catch (error) {}

    refreshIcons();
  }

  // Restore saved preferences
  let savedTheme = "light";
  let savedRTL = false;

  try {
    savedTheme = localStorage.getItem(THEME_KEY) || "light";
    savedRTL = localStorage.getItem(RTL_KEY) === "true";
  } catch (error) {}

  applyTheme(savedTheme === "dark");
  applyRTL(savedRTL);

  // Theme and RTL buttons
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(!body.classList.contains("dark-mode"));
    });
  }

  if (rtlToggle) {
    rtlToggle.addEventListener("click", function () {
      applyRTL(root.getAttribute("dir") !== "rtl");
    });
  }

  // Password visibility (login and signup)
  passwordToggles.forEach(function (button) {
    button.addEventListener("click", function () {
      const input = button.parentElement.querySelector("input");

      if (!input) return;

      const show = input.type === "password";
      input.type = show ? "text" : "password";

      button.innerHTML = show
        ? '<i data-lucide="eye-off" aria-hidden="true"></i>'
        : '<i data-lucide="eye" aria-hidden="true"></i>';

      button.setAttribute(
        "aria-label",
        show ? "Hide password" : "Show password"
      );

      button.title = show ? "Hide password" : "Show password";

      refreshIcons();
    });
  });

  // Signup: confirm password validation
  if (signupForm && password && confirmPassword) {
    function validatePasswordMatch() {
      if (
        confirmPassword.value &&
        password.value !== confirmPassword.value
      ) {
        confirmPassword.setCustomValidity(
          "Passwords do not match."
        );
      } else {
        confirmPassword.setCustomValidity("");
      }
    }

    password.addEventListener("input", validatePasswordMatch);
    confirmPassword.addEventListener("input", validatePasswordMatch);

    // Frontend-only signup validation
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      validatePasswordMatch();

      if (!signupForm.reportValidity()) {
        return;
      }

      if (formMessage) {
        formMessage.textContent =
          "Your form is valid. No account has been created.";
      }
    });
  }

  refreshIcons();
});
