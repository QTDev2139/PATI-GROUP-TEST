document.addEventListener("DOMContentLoaded", function () {
  const slickSlides = document.querySelectorAll('#slick-slide');
  const mainSlider = document.querySelector('#slideContainer');
  const thumbnailContainer = document.querySelector('#slideSmall');
  const prevSlideBtn = document.querySelector('#prevSlide');
  const nextSlideBtn = document.querySelector('#nextSlide');
  
  let currentIndex = 0;
  const mainSlideWidth = 401; 
  const thumbnailWidth = 101; 
  const totalSlides = slickSlides.length;

  const firstSlide = mainSlider.querySelector('#main-slide');
  const lastSlide = mainSlider.querySelectorAll('#main-slide')[totalSlides - 1];
  
  if (firstSlide && lastSlide && mainSlider) {
    const clonedLast = lastSlide.cloneNode(true);
    mainSlider.insertBefore(clonedLast, mainSlider.firstChild);
    
    const clonedFirst = firstSlide.cloneNode(true);
    mainSlider.appendChild(clonedFirst);
  }

  const firstThumb = thumbnailContainer.querySelector('#slick-slide');
  const lastThumb = thumbnailContainer.querySelectorAll('#slick-slide')[totalSlides - 1];
  
  if (firstThumb && lastThumb && thumbnailContainer) {
    const clonedLastThumb = lastThumb.cloneNode(true);
    thumbnailContainer.insertBefore(clonedLastThumb, thumbnailContainer.firstChild);
    
    const clonedFirstThumb = firstThumb.cloneNode(true);
    thumbnailContainer.appendChild(clonedFirstThumb);
  }

  currentIndex = 1;
  if (mainSlider) {
    mainSlider.style.transform = `translateX(-${mainSlideWidth}px)`;
  }
  if (thumbnailContainer) {
    thumbnailContainer.style.transform = `translateX(-${thumbnailWidth}px)`;
  }

  const updatedSlickSlides = document.querySelectorAll('#slick-slide');

  function moveToSlide(index, animate = true) {
    currentIndex = index;
    
    if (mainSlider) {
      const scrollAmount = -(index * mainSlideWidth);
      mainSlider.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
      mainSlider.style.transform = `translateX(${scrollAmount}px)`;
    }
    
    if (thumbnailContainer) {
      const scrollAmount = -(index * thumbnailWidth);
      thumbnailContainer.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
      thumbnailContainer.style.transform = `translateX(${scrollAmount}px)`;
    }
    
  }

  updatedSlickSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      moveToSlide(index);
    });
  });

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      moveToSlide(currentIndex + 1);
      
      if (currentIndex === totalSlides + 1) {
        setTimeout(() => {
          moveToSlide(1, false); 
        }, 300);
      }
    });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      moveToSlide(currentIndex - 1);
      
      if (currentIndex === 0) {
        setTimeout(() => {
          moveToSlide(totalSlides, false); 
        }, 300);
      }
    });
  }
});


