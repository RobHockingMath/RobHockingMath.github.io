document.addEventListener("DOMContentLoaded", function () {
    const slidesContainer = document.querySelector(".carousel-slides");
    const slides = document.querySelectorAll(".carousel-slides .slide");
    const leftArrow = document.querySelector(".carousel-arrow.left-arrow");
    const rightArrow = document.querySelector(".carousel-arrow.right-arrow");
  
    let currentIndex = 0;
  
    function updateCarousel() {
      // Move slides horizontally by 100% per index
      const offset = -currentIndex * 100;
      slidesContainer.style.transform = `translateX(${offset}%)`;
    }
  
    // Go to previous slide
    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  
    // Go to next slide
    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
  });