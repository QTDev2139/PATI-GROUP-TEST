document.addEventListener("DOMContentLoaded", function () {
  const faqContainer = document.getElementById("faq");

  function initializeFaqItems() {
    const faqItems = document.querySelectorAll("#faqItem");
    faqItems.forEach((item) => {
        const answer = item.querySelector("#faqAnswer");
        const icon = item.querySelector("svg");
        
        // Setup initial state
        answer.classList.remove("hidden");
        answer.classList.add("slide-toggle");
        answer.style.marginTop = "0";
        answer.dataset.open = "false";
        
        if (icon) {
          icon.style.transition = "transform 300ms ease";
        }
        
        item.addEventListener("click", () => {
            const isOpen = answer.dataset.open === "true";
            
            if (isOpen) {
              // Đóng
              answer.style.maxHeight = "0px";
              answer.style.marginTop = "0";
              answer.classList.remove("active");
              answer.dataset.open = "false";
              if (icon) icon.style.transform = "rotate(0deg)";
            } else {
              // Mở
              answer.style.maxHeight = `${answer.scrollHeight}px`;
              answer.style.marginTop = "16px";
              answer.classList.add("active");
              answer.dataset.open = "true";
              if (icon) icon.style.transform = "rotate(180deg)";
            }
        })
    });
  }

  fetch("./data/faq.json")
    .then((res) => res.json())
    .then((data) => {
      const htmls = data.map((item) => {
        return `
        <div class="py-4 px-0 md:py-5 md:px-6 border-b border-white cursor-pointer" id="faqItem">
            <div class="flex items-center justify-between gap-3">
                <div class="h-[29px]">
                    <p class="text-[18px]">${item.question}</p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[16px] h-[16px]"
                    viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <path
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                    </path>
                    </svg>
                </div>
                </div>
            <div class="mt-4" id="faqAnswer">
                <p class="text-[16px]">${item.answer}</p>
            </div>
        </div>
        `;
      });
      faqContainer.innerHTML = htmls.join("");
      
      initializeFaqItems();
    })
    .catch(() => {
      console.log("Failed to load FAQ");
    });
});
