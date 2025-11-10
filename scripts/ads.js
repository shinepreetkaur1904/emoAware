// ==========================
// EMOAWARE — Ads Logic
// ==========================

// All your 6 ad images (make sure they exist in /images folder)
const ads = [
  "images/ads1.jpg",
  "images/ads2.jpg",
  "images/ads3.jpg",
  "images/ads4.jpg",
  "images/ads5.jpg",
  "images/ads6.jpg"
];

// Pick a random image
const adImage = document.getElementById("ad-image");
const randomImage = ads[Math.floor(Math.random() * ads.length)];
adImage.src = randomImage;

// Progress + non-skippable logic
const progress = document.querySelector(".progress");
const returnBtn = document.getElementById("return-btn");
returnBtn.disabled = true;
returnBtn.textContent = "⏳ Please wait... Ad playing";

let width = 0;
const adDuration = 10 * 1000; // 10 seconds
const interval = setInterval(() => {
  width += 1;
  progress.style.width = `${width}%`;
  if (width >= 100) {
    clearInterval(interval);
    returnBtn.textContent = "💬 Returning to Chat...";
    returnBtn.disabled = false;

    // Auto return to chat after short delay
    setTimeout(() => {
      window.location.href = "chat.html";
    }, 1200);
  }
}, adDuration / 100);

// 🎮 Redirect to Game Page
const playGameArrow = document.getElementById("playGameArrow");
if (playGameArrow) {
  playGameArrow.addEventListener("click", () => {
    window.location.href = "games.html";
  });
}

// 🎮 Redirect to Game Page (inside ad box)
const playGameInside = document.getElementById("playGameInside");
if (playGameInside) {
  playGameInside.addEventListener("click", () => {
    window.location.href = "games.html";
  });
}

document.getElementById("playGameInside").addEventListener("click", () => {
  window.location.href = "games.html";
});
