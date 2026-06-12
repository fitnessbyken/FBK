const track = document.querySelector(".carousel-track");

const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

const dots = document.querySelectorAll(".dot");

if (track && nextButton && prevButton && dots.length) {
  const slides = Array.from(track.children);
  let currentIndex = 0;
  let autoScroll;
  const autoScrollDelay = 4500;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");

    const videos = document.querySelectorAll(".carousel-video");

    videos.forEach((video, index) => {
      if (index === currentIndex) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;

        // FORCE Chrome to acknowledge layout first
        setTimeout(() => {
          video.style.display = "block";

          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.log("Chrome play blocked:", err);
            });
          }
        }, 100);
      } else {
        video.pause();
      }
    });
  }

  function showNextSlide() {
    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    updateCarousel();
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoScroll = setInterval(showNextSlide, autoScrollDelay);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  function resetAutoScroll() {
    startAutoScroll();
  }

  nextButton.addEventListener("click", () => {
    showNextSlide();
    resetAutoScroll();
  });

  prevButton.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }

    updateCarousel();
    resetAutoScroll();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
      resetAutoScroll();
    });
  });

  track.addEventListener("mouseenter", stopAutoScroll);
  track.addEventListener("mouseleave", startAutoScroll);

  startAutoScroll();
  document.querySelectorAll(".slide img").forEach((img) => {
    img.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}
