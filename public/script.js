// === Chat Elements ===
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// === User Info Elements ===
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userNameDisplay = document.getElementById('user-name');

// === Handle Logged In User ===
const loggedUser = JSON.parse(localStorage.getItem("ericUser"));

if (loggedUser) {
  // Hide login, show logout
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  userNameDisplay.textContent = `${loggedUser.name}`;
}

// === Logout Functionality ===
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("ericUser");
  window.location.href = "index.html";
});

// === Chat Functions ===
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage(message, 'user');
  userInput.value = '';

  setTimeout(() => {
    showTypingAnimation();
    setTimeout(() => {
      removeTypingAnimation();
      generateBotReply(message);
    }, 1200);
  }, 300);
}

function appendMessage(text, type) {
  const div = document.createElement('div');
  div.classList.add(`${type}-message`);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingAnimation() {
  const div = document.createElement('div');
  div.classList.add('bot-message');
  div.id = 'typing';
  div.innerHTML = '<span class="dots">Typing<span>.</span><span>.</span><span>.</span></span>';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingAnimation() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function generateBotReply(userMsg) {
  const msg = userMsg.toLowerCase();
  let reply = "I'm not sure about that, but I’ll keep learning! 🤖";

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    reply = "Hi there! How are you today?";
  } else if (msg.includes('your name')) {
    reply = "I'm Eric — your personal AI assistant.";
  } else if (msg.includes('help')) {
    reply = "Sure! You can ask me about programming, AI, or just chat casually. 😊";
  } else if (msg.includes('bye')) {
    reply = "Goodbye! Have a great day 🌟";
  }

  appendMessage(reply, 'bot');
}