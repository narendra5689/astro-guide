
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll("[data-faq-accordion]");

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".ag-contact-faq-item");

    items.forEach((item) => {
      const button = item.querySelector(".ag-contact-faq-question");
      const answer = item.querySelector(".ag-contact-faq-answer");

      if (!button || !answer) return;

      button.addEventListener("click", () => {
        const shouldOpen = button.getAttribute("aria-expanded") !== "true";

        items.forEach((otherItem) => {
          const otherButton = otherItem.querySelector(
            ".ag-contact-faq-question"
          );
          const otherAnswer = otherItem.querySelector(
            ".ag-contact-faq-answer"
          );

          if (!otherButton || !otherAnswer) return;

          otherButton.setAttribute("aria-expanded", "false");
          otherAnswer.hidden = true;
          otherItem.classList.remove("is-open");
        });

        if (shouldOpen) {
          button.setAttribute("aria-expanded", "true");
          answer.hidden = false;
          item.classList.add("is-open");
        }

        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    });
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
