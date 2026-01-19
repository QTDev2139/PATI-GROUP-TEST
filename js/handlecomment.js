document.addEventListener("DOMContentLoaded", function () {
  // Xử lý comment với phân trang
  const commentsContainer = document.getElementById("comments");
  const commentsPerPage = 5; // Số comment mỗi trang
  const maxPageButtons = 5; // Số nút trang tối đa hiển thị
  let currentPage = 1;
  let allComments = [];
  let totalPages = 0;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    // Array(n).fill(...): Tạo một mảng có n phần tử
    return Array(fullStars).fill('<img class="w-[20px] h-[20px]" src="./assets/images/star-solid-full.svg" alt="">').join('') +
           Array(emptyStars).fill('<img class="w-[20px] h-[20px]" src="./assets/images/star-regular-full.svg" alt="">').join('');
  };

  const renderComments = (page) => {
    const startIndex = (page - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const commentsToShow = allComments.slice(startIndex, endIndex);

    const htmls = commentsToShow.map((comment) => {
      return `
        <div class="py-4 border-t border-[#fa8a8a1a]">
          <div class="mb-[10px]">
            <div class="mb-2 flex items-center justify-between">
              <span class="flex">
                ${renderStars(comment.rating)}
              </span>
              <span class="text-[#7b7b7b] text-[80%] min-h-[10px] font-montserrat">${comment.date}</span>
            </div>
            <div class="flex gap-2">
              <div class="relative flex items-center justify-center w-[36px] h-[36px] leading-[36px] bg-[#e0e0e080]">
                <img class="h-[24px] leading-[36px]" src="./assets/images/user-regular-full.svg" alt="">
                <img class="absolute -bottom-[3px] -right-[3px] w-[18px] h-[18px] " src="./assets/images/square-check-solid-full.svg" alt="">
              </div>
              <div>
                <span class="font-montserrat text-[#fa8a8a]">${comment.user_name}</span>
                <span class="font-montserrat bg-[#fa8a8a] text-white ml-2 px-[6px] text-[12px]">Verified</span>
              </div>
            </div>
          </div>
          <div>
            <p>${comment.comment}</p>
          </div>
        </div>
    `;
    });
    commentsContainer.innerHTML = htmls.join("");
    updatePaginationButtons();
  };

  const updatePaginationButtons = () => {
    const firstPageBtn = document.getElementById('firstPage');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const lastPageBtn = document.getElementById('lastPage');
    const pageNumbersContainer = document.getElementById('pageNumbers');

    if (!pageNumbersContainer) return;

    // Tính toán range của page buttons để hiển thị
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // Điều chỉnh startPage nếu endPage đã chạm totalPages
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // Tạo HTML cho các nút số trang
    let pageButtonsHtml = '';
    for (let i = startPage; i <= endPage; i++) {
      if (i === currentPage) {
        pageButtonsHtml += `<button class="py-1 px-2 w-[32px] text-[#7b7b7b] font-bold text-[24px]" data-page="${i}">${i}</button>`;
      } else {
        pageButtonsHtml += `<button class="py-1 px-2 w-[32px] hover:opacity-50 cursor-pointer" data-page="${i}">${i}</button>`;
      }
    }

    // Cập nhật các nút số trang
    pageNumbersContainer.innerHTML = pageButtonsHtml;

    // Cập nhật trạng thái disabled cho các nút navigation
    if (currentPage === 1) {
      firstPageBtn.classList.add('hidden', 'pointer-events-none');
      prevPageBtn.classList.add('hidden', 'pointer-events-none');
    } else {
      firstPageBtn.classList.remove('hidden', 'pointer-events-none');
      prevPageBtn.classList.remove('hidden', 'pointer-events-none');
    }

    if (currentPage === totalPages) {
      nextPageBtn.classList.add('hidden', 'pointer-events-none');
      lastPageBtn.classList.add('hidden', 'pointer-events-none');
    } else {
      nextPageBtn.classList.remove('hidden', 'pointer-events-none');
      lastPageBtn.classList.remove('hidden', 'pointer-events-none');
    }

    // Add event listeners cho các nút số trang
    attachPageNumberListeners();
  };

  const attachPageNumberListeners = () => {
    // Page number buttons
    document.querySelectorAll('[data-page]').forEach(button => {
      button.addEventListener('click', (e) => {
        const page = parseInt(e.target.getAttribute('data-page'));
        if (page !== currentPage) {
          currentPage = page;
          renderComments(currentPage);
          scrollToComments();
        }
      });
    });
  };

  const attachNavigationListeners = () => {
    // First page
    document.getElementById('firstPage')?.addEventListener('click', () => {
      if (currentPage !== 1) {
        currentPage = 1;
        renderComments(currentPage);
        scrollToComments();
      }
    });

    // Previous page
    document.getElementById('prevPage')?.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderComments(currentPage);
        scrollToComments();
      }
    });

    // Next page
    document.getElementById('nextPage')?.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderComments(currentPage);
        scrollToComments();
      }
    });

    // Last page
    document.getElementById('lastPage')?.addEventListener('click', () => {
      if (currentPage !== totalPages) {
        currentPage = totalPages;
        renderComments(currentPage);
        scrollToComments();
      }
    });
  };

  const scrollToComments = () => {
    // Scroll to comments section smoothly
    const commentsSection = document.getElementById('comments');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Attach navigation listeners một lần khi load trang
  attachNavigationListeners();

  fetch("../data/comment.json")
    .then((res) => res.json())
    .then((data) => {
      allComments = data;
      totalPages = Math.ceil(allComments.length / commentsPerPage);
      renderComments(currentPage);
    })
    .catch(() => {
      console.log("Failed to load comments");
    });
});
