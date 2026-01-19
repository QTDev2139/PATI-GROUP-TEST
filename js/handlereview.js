document.addEventListener("DOMContentLoaded", () => {
  // Toggle review form
  const writeReviewBtn = document.getElementById("writeReview");
  const cancelReviewBtn = document.getElementById("cancelReviewBtn");
  const review = document.getElementById("review");

  if (writeReviewBtn && review) {
    review.classList.add("slide-toggle");
    review.style.marginTop = "0";
    review.dataset.open = "false";

    const toggleReview = (shouldOpen) => {
      if (shouldOpen) {
        review.style.maxHeight = `${review.scrollHeight}px`;
        review.style.marginTop = "32px";
        review.classList.add("active");
        review.dataset.open = "true";
        writeReviewBtn.innerText = "Cancel review";
        review.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        review.style.maxHeight = "0px";
        review.style.marginTop = "0";
        review.classList.remove("active");
        review.dataset.open = "false";
        writeReviewBtn.innerText = "Write a review";
      }
    };

    writeReviewBtn.addEventListener("click", () => {
      const isOpen = review.dataset.open === "true";
      toggleReview(!isOpen);
    });

    if (cancelReviewBtn) {
      cancelReviewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleReview(false);
      });
    }
  }

  // Rating stars (hover + click)
  const ratingStars = document.querySelectorAll(".rating-star");
  const ratingValue = document.getElementById("ratingValue");
  let selectedRating = 0;

  const updateStars = (rating) => {
    ratingStars.forEach((star, index) => {
      if (index < rating) {
        star.src = "./assets/images/star-solid-full.svg";
      } else {
        star.src = "./assets/images/star-regular-full.svg";
      }
    });
  };

  ratingStars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
      const rating = parseInt(star.getAttribute("data-rating"));
      updateStars(rating);
    });

    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-rating"));
      if (ratingValue) {
        ratingValue.value = selectedRating;
      }
      updateStars(selectedRating);
    });
  });

  const ratingContainer = document.getElementById("ratingStars");
  if (ratingContainer) {
    ratingContainer.addEventListener("mouseleave", () => {
      updateStars(selectedRating);
    });
  }
});
