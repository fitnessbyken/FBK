const checkbox = document.getElementById("termsCheck");
const button = document.getElementById("checkoutBtn");
const checkbox1 = document.getElementById("termsCheck1");
const button1 = document.getElementById("checkoutBtn1");
const checkbox2 = document.getElementById("termsCheck2");
const button2 = document.getElementById("checkoutBtn2");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    button.href = "https://buy.stripe.com/dRm9ATfMxaiR2Kr5eygYU00";
    button.classList.remove("disabled-link");
  } else {
    button.removeAttribute("href");
    button.classList.add("disabled-link");
  }
});

checkbox1.addEventListener("change", () => {
  if (checkbox1.checked) {
    button1.href = "https://buy.stripe.com/aFabJ143P62B5WD6iCgYU01";
    button1.classList.remove("disabled-link");
  } else {
    button1.removeAttribute("href");
    button1.classList.add("disabled-link");
  }
});

checkbox2.addEventListener("change", () => {
  if (checkbox2.checked) {
    button2.href = "https://buy.stripe.com/aFabJ1bwhfDb1Gn9uOgYU03";
    button2.classList.remove("disabled-link");
  } else {
    button2.removeAttribute("href");
    button2.classList.add("disabled-link");
  }
});
