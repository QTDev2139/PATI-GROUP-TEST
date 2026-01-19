function hideParent() {
  const element = document.getElementById("cliniciansChoice");

  element.style.opacity = "0";
  element.style.pointerEvents = "none";

  setTimeout(() => {
    element.style.visibility = "hidden";
  }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
  const pricingOptions = document.querySelectorAll(".pricing-option");
  const refillInfos = document.querySelectorAll(".refill-info p");

  pricingOptions.forEach((option, index) => {
    option.addEventListener("click", function () {
      pricingOptions.forEach((opt, idx) => {
        const ticket = opt.querySelector("#ticket");
        const footer = opt.querySelector(".pricing-footer");

        if (idx === index) {
          ticket.classList.remove("bg-white");
          ticket.classList.add("bg-[#039869]");
          footer?.classList.remove("opacity-70");
        } else {
          ticket.classList.remove("bg-[#039869]");
          ticket.classList.add("bg-white");
          footer?.classList.add("opacity-70");
        }
      });

      refillInfos.forEach((info) => {
        const dataValue = info.getAttribute("data");
        if (dataValue == index + 1) {
          info.style.display = "block";
        } else {
          info.style.display = "none";
        }
      });
    });
  });

  // 3x3 Accordion
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const contentDiv = item.querySelector(".accordion-content");
    const expandIcon = item.querySelector("img");

    if (!contentDiv) return;

    contentDiv.classList.remove("hidden");
    contentDiv.classList.add("slide-toggle");
    contentDiv.style.paddingTop = "0px";
    contentDiv.dataset.open = "false";

    if (expandIcon) {
      expandIcon.style.transition = "transform 500ms ease";
    }

    item.addEventListener("click", function () {
      const isOpen = contentDiv.dataset.open === "true";
      const next = !isOpen;

      contentDiv.style.maxHeight = next
        ? `${contentDiv.scrollHeight + 32}px`
        : "0px";
      contentDiv.style.paddingTop = next ? "16px" : "0px";
      contentDiv.classList.toggle("active", next);
      this.style.borderColor = next ? "#039869" : "#d2d2d2";

      if (expandIcon) {
        expandIcon.style.transform = next ? "rotate(45deg)" : "rotate(0deg)";
      }

      contentDiv.dataset.open = next;
    });
  });

  // 8x8 Ingredient Cards
  const ingredientCards = document.querySelectorAll(
    ".ingredient-grid .ingredient-card",
  );

  ingredientCards.forEach((card) => {
    const detail = card.querySelector(".pt-3.text-start");
    if (!detail) return;

    detail.classList.remove("hidden");
    detail.classList.add("slide-toggle");
    detail.style.transform = "translateY(-8px)";
    detail.style.paddingTop = "0px";
    detail.dataset.open = "false";

    card.addEventListener("click", () => {
      const isOpen = detail.dataset.open === "true";
      const next = !isOpen;
      detail.style.paddingTop = next ? "12px" : "0px";
      detail.style.maxHeight = next ? `${detail.scrollHeight + 12}px` : "0px";
      detail.style.transform = next ? "translateY(0)" : "translateY(-8px)";
      detail.classList.toggle("active", next);
      detail.dataset.open = next;
    });
  });

  // xử lý Nutritional 
  const modal = document.getElementById('nutritionalModal');
  const closeModalBtn = document.getElementById('closeModal');
  const nutritionalBtns = document.querySelectorAll('.nutritional-info-btn');

  nutritionalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
});
