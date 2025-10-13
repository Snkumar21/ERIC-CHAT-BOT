const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

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
  div.setAttribute('id', 'typing');
  div.innerHTML = '<span class="dots">Typing<span>.</span><span>.</span><span>.</span></span>';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingAnimation() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

function generateBotReply(userMsg) {
  let reply = "I'm not sure about that, but soon I’ll learn from my dataset! 🤖";
  
  if (userMsg.toLowerCase().includes('hello'||'hi'||'hey')) reply = "Hi there! How are you today?";
  if (userMsg.toLowerCase().includes('your name')) reply = "I'm Eric — your personal AI assistant.";
  if (userMsg.toLowerCase().includes('bye')) reply = "Goodbye! Have a great day 🌟";

  appendMessage(reply, 'bot');
}