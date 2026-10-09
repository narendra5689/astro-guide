document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".ag-pricing-faq-item");

  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const button = item.querySelector(".ag-pricing-faq-question");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((faq) => {
        faq.classList.remove("is-open");

        const faqButton = faq.querySelector(".ag-pricing-faq-question");

        if (faqButton) {
          faqButton.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});