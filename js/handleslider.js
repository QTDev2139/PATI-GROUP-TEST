document.addEventListener("DOMContentLoaded", function () {
  const slickSlides = document.querySelectorAll('#slick-slide');
  const mainSlider = document.querySelector('.opacity-100.w-\\[10827px\\]');
  const thumbnailContainer = document.querySelector('.w-\\[3030px\\].relative.mx-auto.flex');
  const prevSlideBtn = document.querySelector('#prevSlide');
  const nextSlideBtn = document.querySelector('#nextSlide');
  
  let currentIndex = 0;
  const mainSlideWidth = 401; // width of each main slide in px
  const thumbnailWidth = 101; // width of each thumbnail in px
  const totalSlides = slickSlides.length;

  // Clone first and last slides for infinite loop effect on MAIN SLIDER
  const firstSlide = mainSlider.querySelector('[id="main-slide"]');
  const lastSlide = mainSlider.querySelectorAll('[id="main-slide"]')[totalSlides - 1];
  
  if (firstSlide && lastSlide && mainSlider) {
    // Add cloned last slide at the beginning
    const clonedLast = lastSlide.cloneNode(true);
    mainSlider.insertBefore(clonedLast, mainSlider.firstChild);
    
    // Add cloned first slide at the end
    const clonedFirst = firstSlide.cloneNode(true);
    mainSlider.appendChild(clonedFirst);
  }

  // Clone first and last slides for infinite loop effect on THUMBNAIL SLIDER
  const firstThumb = thumbnailContainer.querySelector('[id="slick-slide"]');
  const lastThumb = thumbnailContainer.querySelectorAll('[id="slick-slide"]')[totalSlides - 1];
  
  if (firstThumb && lastThumb && thumbnailContainer) {
    // Add cloned last slide at the beginning
    const clonedLastThumb = lastThumb.cloneNode(true);
    thumbnailContainer.insertBefore(clonedLastThumb, thumbnailContainer.firstChild);
    
    // Add cloned first slide at the end
    const clonedFirstThumb = firstThumb.cloneNode(true);
    thumbnailContainer.appendChild(clonedFirstThumb);
  }

  // Adjust initial position to start from second slide (which is the actual first)
  currentIndex = 1;
  if (mainSlider) {
    mainSlider.style.transform = `translateX(-${mainSlideWidth}px)`;
  }
  if (thumbnailContainer) {
    thumbnailContainer.style.transform = `translateX(-${thumbnailWidth}px)`;
  }

  // Re-query slick slides after cloning
  const updatedSlickSlides = document.querySelectorAll('#slick-slide');

  function moveToSlide(index, animate = true) {
    currentIndex = index;
    
    // Move main slider
    if (mainSlider) {
      const scrollAmount = -(index * mainSlideWidth);
      mainSlider.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
      mainSlider.style.transform = `translateX(${scrollAmount}px)`;
    }
    
    // Scroll thumbnail container
    if (thumbnailContainer) {
      const scrollAmount = -(index * thumbnailWidth);
      thumbnailContainer.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
      thumbnailContainer.style.transform = `translateX(${scrollAmount}px)`;
    }
    
  }

  // Handle thumbnail clicks
  updatedSlickSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      moveToSlide(index);
    });
  });

  // Handle prev/next buttons
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      moveToSlide(currentIndex + 1);
      
      // Check if we reached the cloned first slide, if so, reset to actual first
      if (currentIndex === totalSlides + 1) {
        setTimeout(() => {
          moveToSlide(1, false); // Reset to actual first without animation
        }, 300);
      }
    });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      moveToSlide(currentIndex - 1);
      
      // Check if we reached the cloned last slide, if so, reset to actual last
      if (currentIndex === 0) {
        setTimeout(() => {
          moveToSlide(totalSlides, false); // Reset to actual last without animation
        }, 300);
      }
    });
  }
});


