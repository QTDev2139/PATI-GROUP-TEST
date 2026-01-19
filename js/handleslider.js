document.addEventListener("DOMContentLoaded", function () {
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
  const itemsPerView = 4; 

  for (let i = 0; i < itemsPerView; i++) {
    const clone = mainSlides[i].cloneNode(true);
    mainSlider.appendChild(clone);
  }

  for (let i = 0; i < itemsPerView; i++) {
    const clone = mainSlides[totalSlides - 1 - i].cloneNode(true);
    mainSlider.insertBefore(clone, mainSlider.firstChild);
  }

  const thumbnails = document.querySelectorAll('#slick-slide');
  if (thumbnailContainer && thumbnails.length > 0) {
    for (let i = 0; i < itemsPerView; i++) {
      const clone = thumbnails[i].cloneNode(true);
      thumbnailContainer.appendChild(clone);
      const cloneLast = thumbnails[totalSlides - 1 - i].cloneNode(true);
      thumbnailContainer.insertBefore(cloneLast, thumbnailContainer.firstChild);
    }
  }

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

  function moveToSlide(index) {
    currentIndex = index;
    updatePosition(true);

    if (currentIndex >= totalSlides + itemsPerView) {
      setTimeout(() => {
        currentIndex = itemsPerView;
        updatePosition(false);
      }, 300);
    }

    if (currentIndex <= 0) {
      setTimeout(() => {
        currentIndex = totalSlides;
        updatePosition(false);
      }, 300);
    }
  }

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

  const allThumbnails = document.querySelectorAll('#slick-slide');
  allThumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      moveToSlide(index);
    });
  });
});