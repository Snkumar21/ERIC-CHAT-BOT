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
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  userNameDisplay.textContent = `👋 ${loggedUser.name}`;
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

// Keep a small context memory
let chatMemory = [];

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage(message, 'user');
  chatMemory.push({ sender: 'user', text: message });
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

// === Enhanced Bot Logic ===
function generateBotReply(userMsg) {
  const msg = userMsg.toLowerCase();
  let reply = "I'm still learning 🧠, but that’s interesting! Tell me more.";

  // === Greetings ===
  if (/(hi|hello|hey|good morning|good evening|good afternoon)/.test(msg)) {
    reply = "Hey there 👋! How’s your day going so far?";
  }

  // === User asking about Eric ===
  else if (msg.includes('your name') || msg.includes('who are you')) {
    reply = "I'm Eric 🤖 — your personal AI companion built to make learning and chatting more fun!";
  }

  // === Help or capabilities ===
  else if (msg.includes('help') || msg.includes('what can you do')) {
    reply = "I can chat with you, answer basic programming questions, or even tell a joke 😄. Try asking me something!";
  }

  // === Thanking ===
  else if (msg.includes('thank')) {
    reply = "You’re most welcome 😊 It’s always a pleasure to assist you!";
  }

  // === Goodbye ===
  else if (msg.includes('bye') || msg.includes('see you')) {
    reply = "Goodbye 👋 Take care and keep learning new things!";
  }

  // === Mood-based conversation ===
  else if (msg.includes('how are you')) {
    reply = "I’m doing great, thanks for asking! Just running on a few thousand lines of code 😉 How about you?";
  }

  else if (msg.includes('i am fine') || msg.includes('i am good') || msg.includes('fine') || msg.includes('good')) {
    reply = "Glad to hear that 😄 Let’s make your day even better!";
  }

  else if (msg.includes('sad') || msg.includes('upset') || msg.includes('bored')) {
    reply = "Oh no 😢 — I’m here to cheer you up! Want to hear a fun programming fact or a joke?";
  }

  // === Fun section ===
  else if (msg.includes('joke')) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🪲",
      "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 😂",
      "Why did the developer go broke? Because he used up all his cache 💸"
    ];
    reply = jokes[Math.floor(Math.random() * jokes.length)];
  }

  // === Programming / Tech queries ===
  else if (msg.includes('what is javascript')) {
    reply = "JavaScript is a scripting language used to make web pages interactive. It runs directly in your browser!";
  } else if (msg.includes('what is html')) {
    reply = "HTML stands for HyperText Markup Language. It’s the standard markup for creating web pages 🌐.";
  } else if (msg.includes('what is css')) {
    reply = "CSS (Cascading Style Sheets) styles your web pages — colors, fonts, layouts, everything beautiful 🎨.";
  } else if (msg.includes('what is ai') || msg.includes('artificial intelligence')) {
    reply = "Artificial Intelligence (AI) is the simulation of human intelligence by machines — making them think and learn like humans 🤖.";
  }

  // === Memory-based context ===
  else if (msg.includes('remember')) {
    const info = msg.replace('remember', '').trim();
    if (info) {
      chatMemory.push({ sender: 'memory', text: info });
      reply = `Got it 👍 I’ll remember that you said "${info}".`;
    } else {
      reply = "What should I remember?";
    }
  } else if (msg.includes('what did i say')) {
    const memory = chatMemory.filter(c => c.sender === 'memory').map(c => c.text);
    reply = memory.length > 0 ? `You told me: "${memory.join(', ')}"` : "Hmm, I don’t remember anything yet 🤔.";
  }

  // === Fallback ===
  else {
    reply = generateFriendlyFallback(msg);
  }

  appendMessage(reply, 'bot');
  chatMemory.push({ sender: 'bot', text: reply });
}

// === Friendly fallback generator ===
function generateFriendlyFallback(msg) {
  const responses = [
    "Hmm, that’s interesting! Could you tell me a bit more?",
    "I’m still learning about that. Want me to explain something else instead?",
    "That sounds cool! Let’s explore it together. What exactly do you want to know?",
    "I love your curiosity! Can you rephrase that question for me?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
