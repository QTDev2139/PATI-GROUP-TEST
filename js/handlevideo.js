document.addEventListener("DOMContentLoaded", function () {
  // Xử lý video Play/Pause 
  const videoContainers = document.querySelectorAll('#videoSlider > div');
  let currentPlayingVideo = null;

  videoContainers.forEach((container) => {
    const videoWrapper = container.querySelector('#videoWrapper');
    const playImg = container.querySelector('#playImg');
    const video = container.querySelector('video');

    if (videoWrapper && playImg && video) {
      videoWrapper.addEventListener('click', () => {
        if (currentPlayingVideo && currentPlayingVideo !== video) {
          currentPlayingVideo.pause();
          currentPlayingVideo.currentTime = 0;
          const oldPlayImg = currentPlayingVideo.parentElement.querySelector('#playImg');
          if (oldPlayImg) {
            oldPlayImg.style.display = 'block';
          }
        }

        if (video.paused) {
          video.play();
          playImg.style.display = 'none';
          currentPlayingVideo = video;
        } else {
          video.pause();
          video.currentTime = 0;
          playImg.style.display = 'block';
          currentPlayingVideo = null;
        }
      });

      video.addEventListener('ended', () => {
        playImg.style.display = 'block';
        currentPlayingVideo = null;
      });
    }
  });

  // Xử lý carousel navigation
  const videoSlider = document.querySelector('#videoSlider');
  const progressBars = document.querySelectorAll('#processBar');
  const prevBtn = document.querySelector('#prevVideo');
  const nextBtn = document.querySelector('#nextVideo');
  
  let currentSlide = 0;
  const totalSlides = progressBars.length;
  const slideWidth = 311; 

  function updateProgressBar(index) {
    progressBars.forEach((bar, i) => {
      if (i === index) {
        bar.classList.remove('bg-[#00000026]');
        bar.classList.add('bg-[#039869]');
      } else {
        bar.classList.remove('bg-[#039869]');
        bar.classList.add('bg-[#00000026]');
      }
    });
  }

  function scrollToSlide(index) {
    if (videoSlider) {
      const scrollAmount = -(index * slideWidth);
      videoSlider.style.transform = `translateX(${scrollAmount}px)`;
      videoSlider.style.transition = 'transform 0.3s ease-in-out';
      updateProgressBar(index);
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        scrollToSlide(currentSlide);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        scrollToSlide(currentSlide);
      }
    });
  }

  // Click vào progress bar để nhảy đến slide tương ứng
  progressBars.forEach((bar, index) => {
    bar.parentElement.addEventListener('click', () => {
      currentSlide = index;
      scrollToSlide(currentSlide);
    });
  });
});
