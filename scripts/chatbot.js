// ===============================
// EMOAWARE CHATBOT – Gemini Powered
// ===============================

// --- DOM Elements ---
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// --- Session Setup ---
const SESSION_DURATION = 40 * 60 * 1000;
const sessionKey = "emoaware_session_start";

// --- Session Functions ---
function getSessionStart() {
  return parseInt(localStorage.getItem(sessionKey));
}

function setSessionStart() {
  localStorage.setItem(sessionKey, Date.now().toString());
}

function hasSessionExpired() {
  const start = getSessionStart();
  if (!start) return true;
  return Date.now() - start > SESSION_DURATION;
}

// --- Utilities ---
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");
  msg.classList.add(sender === "bot" ? "bot-message" : "user-message");
  msg.innerHTML = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// --- Detect Emotion ---
function detectEmotion(input) {
  input = input.toLowerCase();
  if (input.includes("sad") || input.includes("tired") || input.includes("lonely")) return "sad";
  if (input.includes("anxious") || input.includes("worried") || input.includes("scared")) return "anxious";
  if (input.includes("happy") || input.includes("excited") || input.includes("great")) return "happy";
  if (input.includes("angry") || input.includes("mad") || input.includes("upset")) return "angry";
  return "neutral";
}

// --- Lock Chat After Time Limit ---
function lockChat() {
  userInput.disabled = true;
  sendBtn.disabled = true;

  chatBody.innerHTML += `
    <div class="bot-message">
      🌙 Hey friend, our chat time for now has come to an end.
      You've done wonderfully today — take a moment to relax while your calming ad loads. 💖
    </div>
    <button class="btn" id="loadingAdBtn" disabled>🌸 Ad Loading...</button>
  `;

  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    const loadingBtn = document.getElementById("loadingAdBtn");
    loadingBtn.textContent = "🎥 Redirecting...";
    window.location.href = "ads.html";
  }, 5000);
}

// // --- Load Random Quote ---
// fetch("data/quotes.json")
//   .then(res => res.json())
//   .then(data => {
//     const quote = random(data);
//     document.getElementById("quoteMessage").textContent = `"${quote.text}"`;
//   })
//   .catch(() => {
//     document.getElementById("quoteMessage").textContent =
//       "You are enough, exactly as you are 🌸";
//   });

// --- Attach Button Actions ---
setTimeout(() => {
  const adBtn = document.getElementById("watchAdBtn");
  const endBtn = document.getElementById("endSessionBtn");

  if (adBtn) {
    adBtn.addEventListener("click", () => {
      window.open("ads.html", "_blank");
    });
  }

  if (endBtn) {
    endBtn.addEventListener("click", () => {
      chatBody.innerHTML += `
        <div class="bot-message">💤 Take some time off today — come back refreshed tomorrow.</div>
      `;
    });
  }
}, 300);

// --- Core Chat Function ---
async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  addMessage(input, "user");
  userInput.value = "";

  const emotion = detectEmotion(input);
  addMessage("typing...", "bot");

  const sessionEmail = localStorage.getItem("sessionEmail");

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userMessage: input,
        emotion: emotion,
        email: sessionEmail
      })
    });

    const data = await response.json();

    const messages = chatBody.querySelectorAll('.bot-message');
    messages[messages.length - 1].remove();

    addMessage(data.botReply, "bot");

  } catch (err) {
    const messages = chatBody.querySelectorAll('.bot-message');
    messages[messages.length - 1].remove();
    addMessage("I'm here for you 🤍 Tell me more.", "bot");
  }

  if (hasSessionExpired()) lockChat();
}

// --- Initialize Session ---
if (!getSessionStart() || hasSessionExpired()) {
  setSessionStart();
}

// --- Event Listeners ---
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// --- Auto Lock Timer ---
setTimeout(() => {
  if (hasSessionExpired()) lockChat();
}, SESSION_DURATION);