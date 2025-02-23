function updateMedia() {
    var items = window.carouselItems || [];
    var imgEl = document.getElementById("product-image");
    var vidEl = document.getElementById("product-video");
    
    if (!items.length) return;
    
    imgEl.src = items[window.currentIndex].image;
    
    if (items[window.currentIndex].video) {
      vidEl.src = items[window.currentIndex].video;
      vidEl.load();
      vidEl.style.display = "block";
    } else {
      vidEl.pause();
      vidEl.removeAttribute("src");
      vidEl.load();
      vidEl.style.display = "none";
    }
  }
  
  function prevImage() {
    var items = window.carouselItems || [];
    window.currentIndex = (window.currentIndex - 1 + items.length) % items.length;
    updateMedia();
  }
  
  function nextImage() {
    var items = window.carouselItems || [];
    window.currentIndex = (window.currentIndex + 1) % items.length;
    updateMedia();
  }
  
  document.addEventListener("DOMContentLoaded", updateMedia);