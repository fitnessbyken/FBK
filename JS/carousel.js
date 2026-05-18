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

  // handle video playback
  //   const videos = document.querySelectorAll(".carousel-video");

  //   videos.forEach((video, index) => {
  //     if (index === currentIndex) {
  //       video.play();
  //     } else {
  //       video.pause();
  //       video.currentTime = 0; // optional reset
  //     }
  //   });
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

// let currentIndex = 0;

// let isDragging = false;
// let startX = 0;
// let currentX = 0;
// let prevTranslate = 0;
// let animationID = 0;

// function getSlideWidth() {
//   return slides[0].getBoundingClientRect().width;
// }

// function setPositionByIndex() {
//   const slideWidth = getSlideWidth();
//   prevTranslate = currentIndex * -slideWidth;
//   track.style.transform = `translateX(${prevTranslate}px)`;
// }

// track.addEventListener("touchstart", touchStart);
// track.addEventListener("mousedown", touchStart);

// function touchStart(e) {
//   isDragging = true;
//   startX = getPositionX(e);

//   animationID = requestAnimationFrame(animation);
//   track.style.transition = "none";
// }

// track.addEventListener("touchmove", touchMove);
// track.addEventListener("mousemove", touchMove);

// function touchMove(e) {
//   if (!isDragging) return;

//   const currentPosition = getPositionX(e);
//   const diff = currentPosition - startX;

//   currentX = prevTranslate + diff;
// }

// track.addEventListener("touchend", touchEnd);
// track.addEventListener("mouseup", touchEnd);
// track.addEventListener("mouseleave", touchEnd);

// function touchEnd() {
//   isDragging = false;
//   cancelAnimationFrame(animationID);

//   const slideWidth = getSlideWidth();
//   const movedBy = currentX - prevTranslate;

//   // how far you must swipe (20% of slide width)
//   const threshold = slideWidth * 0.2;

//   if (movedBy < -threshold && currentIndex < slides.length - 1) {
//     currentIndex++;
//   }

//   if (movedBy > threshold && currentIndex > 0) {
//     currentIndex--;
//   }

//   track.style.transition = "transform 0.3s ease-out";
//   setPositionByIndex();
// }

// function animation() {
//   track.style.transform = `translateX(${currentX}px)`;
//   if (isDragging) requestAnimationFrame(animation);
// }

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function animation() {
  track.style.transform = `translateX(${currentX}px)`;
  requestAnimationFrame(animation);
}

// document.addEventListener("DOMContentLoaded", () => {
//   const nextButton = document.querySelector(".next");
//   const prevButton = document.querySelector(".prev");

//   nextButton.addEventListener("click", () => {
//     currentIndex++;
//     updateCarousel();
//   });

//   prevButton.addEventListener("click", () => {
//     currentIndex--;
//     updateCarousel();
//   });
// });

console.log("next button:", nextButton);
// console.trace("next clicked");

document.querySelectorAll(".slide img").forEach((img) => {
  img.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
