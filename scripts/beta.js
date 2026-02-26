class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items[this.items.length] = element;
  }

  pop() {
    if (this.isEmpty()) {
      console.log("Stack Underflow");
      return null;
    }

    const lastIndex = this.items.length - 1;
    const popped = this.items[lastIndex];
    this.items.length = lastIndex;
    return popped;
  }

  top() {
    return this.isEmpty() ? null : this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items.length = 0;
  }

  getAll() {
    return [...this.items];
  }
}

// ================ INITIALIZE STACK =================

const emotionStack = new Stack();

// Load previous session data
const savedEmotions = JSON.parse(localStorage.getItem("recentEmotions")) || [];
savedEmotions.forEach(e => emotionStack.push(e));

// ================ UI FUNCTIONS =================

// Add emotion
function addEmotion() {
  const input = document.getElementById("emotionInput");
  const emotion = input.value.trim();

  if (emotion === "") return;

  emotionStack.push(emotion);
  localStorage.setItem("recentEmotions", JSON.stringify(emotionStack.getAll()));

  input.value = "";
  updateDisplay();
}

// Undo (pop)
function undoEmotion() {
  if (emotionStack.isEmpty()) {
    alert("Stack is empty!");
    return;
  }

  emotionStack.pop();
  localStorage.setItem("recentEmotions", JSON.stringify(emotionStack.getAll()));

  updateDisplay();
}

// Clear stack
function clearStack() {
  emotionStack.clear();
  localStorage.removeItem("recentEmotions");
  updateDisplay();
}

// Update UI
function updateDisplay() {
  const top = emotionStack.top();
  const size = emotionStack.size();
  const content = emotionStack.getAll();

  document.getElementById("topEmotion").innerText = top ? top : "None";
  document.getElementById("stackSize").innerText = size;

  const container = document.getElementById("stackContent");
  container.innerHTML = "";

  for (let i = content.length - 1; i >= 0; i--) {
    const div = document.createElement("div");
 div.innerText = (i === content.length - 1 ? "TOP → " : "") + content[i];

div.style.background = "#ffffff";
div.style.margin = "10px 0";
div.style.padding = "14px";
div.style.borderRadius = "12px";
div.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
div.style.fontWeight = i === content.length - 1 ? "600" : "400";

container.appendChild(div);
  }
}

// Initial render
updateDisplay();

function saveEmail(event) {
  event.preventDefault();

  const email = document.getElementById("userEmail").value.trim();
  if (!email) return;

  localStorage.setItem("sessionEmail", email);

  // Redirect to chatbot
  window.location.href = "chat.html";  // or chatbot.html if separate
}

async function loadUserHistory() {
  const sessionEmail = localStorage.getItem("sessionEmail");

  if (!sessionEmail) {
    console.log("No session email found");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/history?email=${sessionEmail}`
    );

    const data = await response.json();

    // Clear current stack first
    emotionStack.clear();

    // Push last 5 emotions into stack
    const recentChats = data.slice(0, 5);

    recentChats.forEach(chat => {
      if (chat.emotion) {
        emotionStack.push(chat.emotion);
      }
    });

    updateDisplay();

  } catch (err) {
    console.log("Error loading history", err);
  }

  
}

loadUserHistory();

// ================= LOGOUT =================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // Clear emotion stack
    emotionStack.clear();

    // Remove local storage items
    localStorage.removeItem("recentEmotions");
    localStorage.removeItem("sessionEmail");

    // Refresh UI instantly
    updateDisplay();

    // Optional: reload page to reset everything visually
    window.location.reload();
  });
}