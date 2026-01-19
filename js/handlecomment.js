document.addEventListener("DOMContentLoaded", function () {
  // Xử lý comment
  const commentsContainer = document.getElementById("comments");

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    // Array(n).fill(...): Tạo một mảng có n phần tử
    return Array(fullStars).fill('<img class="w-[20px] h-[20px]" src="./assets/images/star-solid-full.svg" alt="">').join('') +
           Array(emptyStars).fill('<img class="w-[20px] h-[20px]" src="./assets/images/star-regular-full.svg" alt="">').join('');
  };

  fetch("../data/comment.json")
    .then((res) => res.json())
    .then((data) => {
      const htmls = data.map((comment) => {
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
    })
    .catch(() => {
      console.log("Failed to load comments");
    });
});
