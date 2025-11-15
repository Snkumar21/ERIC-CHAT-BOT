// =====================
// MAIN.JS (UI + Chat Control)
// =====================

// === Navbar Toggle ===
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// === Chat Elements ===
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const micBtn = document.getElementById("mic-btn");

// === User Info Elements ===
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userNameDisplay = document.getElementById("user-name");

// === Handle Logged In User ===
const loggedUser = JSON.parse(localStorage.getItem("ericUser"));

if (loggedUser) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  userNameDisplay.textContent = `${loggedUser.name}`;
}

// === Logout ===
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("ericUser");
  window.location.href = "index.html";
});

// === Chat Message Events ===
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

// Store Memory
let chatMemory = [];

// =====================
// SEND MESSAGE
// =====================
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  chatMemory.push({ sender: "user", text: message });

  if (message.toLowerCase().startsWith("search ")) {
    const term = message.substring(7);
    return searchChatHistory(term);
  }

  userInput.value = "";

  setTimeout(() => {
    showTypingAnimation();
    setTimeout(() => {
      removeTypingAnimation();
      generateBotReply(message); // moved to bot.js
    }, 1200);
  }, 300);
}

// =====================
// APPEND MESSAGE
// =====================
function appendMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add(`${type}-message`);
  div.textContent = text;

  if (type === "bot") {
    const speakBtn = document.createElement("button");
    speakBtn.classList.add("speak-btn");
    speakBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    speakBtn.onclick = () => speakText(text);
    div.appendChild(speakBtn);
  }

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// =====================
// TYPING ANIMATION
// =====================
function showTypingAnimation() {
  const div = document.createElement("div");
  div.classList.add("bot-message");
  div.id = "typing";
  div.innerHTML = '<span class="dots">Typing<span>.</span><span>.</span><span>.</span></span>';
  chatBox.appendChild(div);
}

function removeTypingAnimation() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

// =====================
// SAVE CHAT TO DB
// =====================
function saveChatToDB(question, answer) {
  const loggedUser = JSON.parse(localStorage.getItem("ericUser"));
  const userId = loggedUser ? loggedUser._id : null;

  fetch("https://eric-chat-bot.onrender.com/api/chat/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, question, answer }),
  })
    .then(res => res.json())
    .then(data => console.log("Chat Saved:", data))
    .catch(err => console.error("Error saving chat:", err));
}

// =====================
// SEARCH CHAT HISTORY
// =====================
function searchChatHistory(query) {
  if (!query.trim()) return;

  const loggedUser = JSON.parse(localStorage.getItem("ericUser"));
  const userId = loggedUser ? loggedUser._id : null;

  fetch(`https://eric-chat-bot.onrender.com/api/chat/search?userId=${userId}&query=${query}`)
    .then(res => res.json())
    .then(data => {
      appendMessage(`🔍 Results for "${query}"`, "bot");

      if (!data.results.length) {
        return appendMessage("No matching history found ❌", "bot");
      }

      data.results.forEach(item => {
        appendMessage(`💬 You: ${item.question}\n🤖 Eric: ${item.answer}`, "bot");
      });
    })
    .catch(() => {
      appendMessage("⚠ Server error during search", "bot");
    });
}

// =====================
// TEXT-TO-SPEECH
// =====================
function speakText(text) {
  if (!window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = window.speechSynthesis.getVoices().find(v => v.lang === "en-US");
  window.speechSynthesis.speak(utter);
}

// =====================
// SPEECH-TO-TEXT
// =====================
let isListening = false;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  micBtn.addEventListener("click", () => {
    if (!isListening) {
      recognition.start();
      micBtn.classList.add("listening");
      isListening = true;
    } else {
      recognition.stop();
      micBtn.classList.remove("listening");
      isListening = false;
    }
  });

  recognition.onresult = e => {
    const transcript = e.results[0][0].transcript;
    userInput.value = transcript;
    sendMessage();
  };

  recognition.onend = () => {
    micBtn.classList.remove("listening");
    isListening = false;
  };
} else {
  micBtn.disabled = true;
  micBtn.title = "Speech recognition not supported";
}