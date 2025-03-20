document.addEventListener('DOMContentLoaded', () => {
  // Only run carousel code if the carousel exists.
  if (!document.getElementById('slide1')) {
    console.log("No carousel found; skipping carousel code.");
    return;
  }

  const slides = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];
  let currentIndex = 0; // 0 means slide1, 1 means slide2, etc.
  let autoRotateInterval = null;
  let revertTimeout = null;

  const rotationDelay = 3000; // 3 seconds per slide
  const pauseAfterClick = 5000; // 5 seconds pause after user clicks

  const navLabels = document.querySelectorAll('.navigation label');

  function showSlide(index) {
    currentIndex = index;
    const slideEl = document.getElementById(slides[currentIndex]);
    if (slideEl) {
      slideEl.checked = true;
    } else {
      console.error(`Element with id "${slides[currentIndex]}" not found in the DOM.`);
    }
  }

  function startAutoRotate() {
    // Clear any existing interval before starting a new one.
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
    }
    autoRotateInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, rotationDelay);
  }

  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
  }

  // Initially show the first slide and start auto rotation.
  showSlide(currentIndex);
  startAutoRotate();

  navLabels.forEach((label, idx) => {
    label.addEventListener('click', () => {
      // User clicked a navigation dot. Stop auto-rotation.
      stopAutoRotate();

      // Show the chosen slide.
      showSlide(idx);

      // Clear any previous revert timeout.
      if (revertTimeout) {
        clearTimeout(revertTimeout);
      }

      // After a pause, resume auto-rotation.
      revertTimeout = setTimeout(() => {
        startAutoRotate();
      }, pauseAfterClick);
    });
  });
});

// Hover video functionality (unchanged)
document.addEventListener('DOMContentLoaded', () => {
  // Select all hover videos.
  const hoverVideos = document.querySelectorAll('.hover-video');

  hoverVideos.forEach(video => {
    // When mouse enters the parent container, play the video.
    video.closest('.img-container').addEventListener('mouseenter', () => {
      video.currentTime = 0; // Restart at the beginning.
      video.play();
    });

    // When mouse leaves the parent container, pause and reset the video.
    video.closest('.img-container').addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
});

