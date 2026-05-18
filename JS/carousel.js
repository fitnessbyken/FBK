console.log("carousel js loaded");
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);

const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

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

nextButton.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }

  updateCarousel();
});

prevButton.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }

  updateCarousel();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

// function animation() {
//   track.style.transform = `translateX(${currentX}px)`;
//   requestAnimationFrame(animation);
// }

console.log("next button:", nextButton);

document.querySelectorAll(".slide img").forEach((img) => {
  img.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

console.log(track);
console.log(nextButton);
console.log(prevButton);
console.log(slides);
