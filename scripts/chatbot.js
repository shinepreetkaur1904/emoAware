// ===============================
// EMOAWARE CHATBOT – Phase 3 (Stable Frontend Mode)
// ===============================

// --- DOM Elements ---
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// --- Session Setup (Test Mode: 10 seconds for now) ---
const SESSION_DURATION = 10 * 1000;
const sessionKey = "emoaware_session_start";

// --- Emotion-Based Replies ---
const responses = {
  sad: [
    "I'm really sorry you’re feeling low 💭 but it’s okay to take things slow.",
    "Remember — emotions aren’t permanent. You’re allowed to rest.",
    "You deserve gentleness today. Try to do one small comforting thing for yourself 🤍."
  ],
  anxious: [
    "Take a deep breath with me... inhale peace, exhale worry 🌿",
    "Anxiety isn’t weakness — it’s your mind caring a bit too much.",
    "You’re safe here. You’re allowed to slow down and just be."
  ],
  happy: [
    "That’s amazing to hear 😄! Tell me what’s making you smile today?",
    "Keep that energy alive! Even small joys make big days.",
    "You radiate warmth, and it’s contagious ✨"
  ],
  angry: [
    "It’s okay to feel angry sometimes. Let’s unpack what triggered it?",
    "Try releasing that energy — maybe go for a walk or write it down.",
    "Anger often hides pain. You don’t have to face it alone."
  ],
  neutral: [
    "Tell me what’s on your mind today 🤍",
    "I’m here — not to judge, just to listen.",
    "Sometimes even silence says a lot. Take your time, I’ll wait."
  ]
};

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

function getEmotionResponse(input) {
  input = input.toLowerCase();
  if (input.includes("sad") || input.includes("tired") || input.includes("lonely")) return random(responses.sad);
  if (input.includes("anxious") || input.includes("worried") || input.includes("scared")) return random(responses.anxious);
  if (input.includes("happy") || input.includes("excited") || input.includes("great")) return random(responses.happy);
  if (input.includes("angry") || input.includes("mad") || input.includes("upset")) return random(responses.angry);
  return random(responses.neutral);
}

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

// --- Lock Chat After Time Limit ---
function lockChat() {
  // Stop input immediately
  userInput.disabled = true;
  sendBtn.disabled = true;

  // Clear input and show lock message
  chatBody.innerHTML += `
    <div class="bot-message">
      🌙 Hey friend, our chat time for now has come to an end.
      You’ve done wonderfully today — take a moment to relax while your calming ad loads. 💖
    </div>
    <button class="btn" id="loadingAdBtn" disabled>🌸 Ad Loading...</button>
  `;

  // Optional: remove the quote part completely since ad is coming
  // But if you want to keep one gentle quote, uncomment below ↓
  /*
  fetch("data/quotes.json")
    .then(res => res.json())
    .then(data => {
      const quote = random(data);
      const quoteMsg = document.createElement("div");
      quoteMsg.classList.add("bot-message");
      quoteMsg.textContent = `“${quote.text}”`;
      chatBody.appendChild(quoteMsg);
    })
    .catch(() => {
      addMessage("You are enough, exactly as you are 🌸", "bot");
    });
  */

  // Smooth scroll to bottom
  chatBody.scrollTop = chatBody.scrollHeight;

  // After 5 seconds → redirect to ad page
  setTimeout(() => {
    const loadingBtn = document.getElementById("loadingAdBtn");
    loadingBtn.textContent = "🎥 Redirecting...";
    window.location.href = "ads.html";
  }, 5000);
}

  // Load random quote
  fetch("data/quotes.json")
    .then(res => res.json())
    .then(data => {
      const quote = random(data);
      document.getElementById("quoteMessage").textContent = `“${quote.text}”`;
    })
    .catch(() => {
      document.getElementById("quoteMessage").textContent =
        "You are enough, exactly as you are 🌸";
    });

  // Attach button actions
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
function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  addMessage(input, "user");
  userInput.value = "";

  const emotionReply = getEmotionResponse(input);

  // Reply first, THEN check timer
  setTimeout(() => {
    addMessage(emotionReply, "bot");

    // Only check for expiration after the reply is displayed
    if (hasSessionExpired()) {
      lockChat();
    }
  }, 600);
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
