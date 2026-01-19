document.addEventListener("DOMContentLoaded", function () {
  // Thay đổi selector sang Class nếu có thể để tránh lỗi ID trùng lặp
  const mainSlides = document.querySelectorAll('#main-slide');
  const mainSlider = document.querySelector('#slideContainer');
  const thumbnailContainer = document.querySelector('#thumbnailContainer'); 
  const prevSlideBtn = document.querySelector('#prevSlide');
  const nextSlideBtn = document.querySelector('#nextSlide');

  if (!mainSlider || mainSlides.length === 0) return;

  let currentIndex = 0;
  const mainSlideWidth = 401; 
  const thumbnailWidth = 101; 
  const totalSlides = mainSlides.length;
  const itemsPerView = 4; // Số lượng ảnh hiển thị cùng lúc để không bị trống

  // 1. Nhân bản đủ số lượng ảnh để lấp đầy khung hình khi chạy vô tận
  // Nhân bản 'itemsPerView' ảnh đầu tiên và đưa xuống cuối
  for (let i = 0; i < itemsPerView; i++) {
    const clone = mainSlides[i].cloneNode(true);
    mainSlider.appendChild(clone);
  }
  // Nhân bản 'itemsPerView' ảnh cuối cùng và đưa lên đầu
  for (let i = 0; i < itemsPerView; i++) {
    const clone = mainSlides[totalSlides - 1 - i].cloneNode(true);
    mainSlider.insertBefore(clone, mainSlider.firstChild);
  }

  // Thực hiện tương tự cho Thumbnails nếu cần chạy vô tận cho cả thumb
  const thumbnails = document.querySelectorAll('#slick-slide');
  if (thumbnailContainer && thumbnails.length > 0) {
    for (let i = 0; i < itemsPerView; i++) {
      const clone = thumbnails[i].cloneNode(true);
      thumbnailContainer.appendChild(clone);
      const cloneLast = thumbnails[totalSlides - 1 - i].cloneNode(true);
      thumbnailContainer.insertBefore(cloneLast, thumbnailContainer.firstChild);
    }
  }

  // 2. Thiết lập vị trí bắt đầu (vị trí ảnh 1 thật sau khi đã thêm clones vào đầu)
  currentIndex = itemsPerView;
  
  const updatePosition = (animate = false) => {
    const transition = animate ? 'transform 0.3s ease-in-out' : 'none';
    
    if (mainSlider) {
      mainSlider.style.transition = transition;
      mainSlider.style.transform = `translateX(-${currentIndex * mainSlideWidth}px)`;
    }
    if (thumbnailContainer) {
      thumbnailContainer.style.transition = transition;
      thumbnailContainer.style.transform = `translateX(-${currentIndex * thumbnailWidth}px)`;
    }
  };

  updatePosition(false);

  // 3. Hàm di chuyển chính
  function moveToSlide(index) {
    currentIndex = index;
    updatePosition(true);

    // Xử lý nhảy (teleport) khi chạm biên bản clone
    // Chạm biên cuối -> nhảy về đầu thật
    if (currentIndex >= totalSlides + itemsPerView) {
      setTimeout(() => {
        currentIndex = itemsPerView;
        updatePosition(false);
      }, 300);
    }
    // Chạm biên đầu -> nhảy về cuối thật
    if (currentIndex <= 0) {
      setTimeout(() => {
        currentIndex = totalSlides;
        updatePosition(false);
      }, 300);
    }
  }

  // 4. Sự kiện cho nút bấm
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      moveToSlide(currentIndex + 1);
    });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      moveToSlide(currentIndex - 1);
    });
  }

  // 5. Click thumbnail để chuyển slide chính
  // Lấy lại danh sách slide sau khi đã clone để gán sự kiện
  const allThumbnails = document.querySelectorAll('#slick-slide');
  allThumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      moveToSlide(index);
    });
  });
});