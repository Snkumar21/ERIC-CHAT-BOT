// =====================
// BOT.JS (Smart Bot Logic)
// =====================

// === GLOBAL TTS TOGGLE ===
let ttsEnabled = false;

// If you have a speaker button, toggle TTS
const speakerBtn = document.getElementById("speaker-btn");
if (speakerBtn) {
    speakerBtn.addEventListener("click", () => {
        ttsEnabled = !ttsEnabled;
        speakerBtn.classList.toggle("active");
    });
}

// =====================
// DATASET STORAGE
// =====================
const qaDataset = {
    "What is AI?": "AI stands for Artificial Intelligence, which involves simulating human intelligence in machines.",
    "How does machine learning work?": "Machine learning is a subset of AI that involves training machines to learn from data.",
    "What is Python?": "Python is a high-level programming language known for its simplicity and readability.",
    "What is your name?": "I am E.R.I.C. — your AI assistant!",
    "How does AI work?": "AI involves simulating human intelligence processes using machines.",
    "Can you write programs?": "Yes, what kind of language are you interested in?",
    "Who is captain of Indian Cricket Team?": "Rohit Sharma is the captain of the Indian Cricket Team in all formats.",
    "Who is the current winner of the World Cup of 50 overs?": "Australia is the current World Cup champion.",
    "Who is the greatest batsman ever in history?": "Many consider Sachin Tendulkar, Virat Kohli and Don Bradman among the greatest ever.",
    "Which game was previously known as Mintonette?": "Volleyball was known as Mintonette.",
    "Hi": "Hello! How can I help you today?",
    "Who developed you?": "I was developed by Singh Nitish Ku Ajit Kumar.",
    "What is your functionality?": "I help users by answering questions and assisting with tasks.",
    "Who was the prime minister of India?": "Jawaharlal Nehru was the first Prime Minister of India.",
    "Who is the current Prime Minister of India?": "Narendra Modi is the current Prime Minister of India.",
    "What is the capital of France?": "The capital of France is Paris.",
    "Who painted the Mona Lisa?": "Leonardo da Vinci painted the Mona Lisa.",
    "What is the tallest mountain in the world?": "Mount Everest is the tallest mountain.",
    "What is the currency of Japan?": "The Japanese Yen (JPY) is the currency of Japan.",
    "Who is the first woman to win a Nobel Prize?": "Marie Curie was the first woman to win a Nobel Prize.",
    "What is the difference between '==' and 'is' in Python?": "== checks value equality; 'is' checks memory identity.",
    "Explain the concept of inheritance in object-oriented programming.": "Inheritance allows a class to use properties and methods of another class.",
    "What is the purpose of a constructor in Java?": "A constructor initializes objects in Java.",
    "Alphabets of English are:": "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z.",
    "Who is the king of the jungle?": "The lion is the king of the jungle.",
    "Which is the fastest animal in the jungle?": "The cheetah is the fastest.",
    "How are you?": "I’m doing great! How about you?",
    "Count till 10": "1,2,3,4,5,6,7,8,9,10.",
    "How's weather today?": "It’s a lovely weather today!",
    "Do you love me?": "Of course! Every being deserves love!",
    "Are you male or female?": "I don't have a gender—I'm just here to help 😊",
    "What is the chemical symbol for water?": "H₂O.",
    "What is the speed of light?": "299,792 km per second.",
    "Who developed the theory of relativity?": "Albert Einstein.",
    "What is the powerhouse of the cell?": "The mitochondrion.",
    "When did India get its independence?": "15 August 1947.",
    "Who was known as the Iron Lady?": "Margaret Thatcher.",
    "Who wrote 'Romeo and Juliet'?": "William Shakespeare.",
    "What is the value of Pi to two decimal places?": "3.14",
    "What is the largest planet in our solar system?": "Jupiter.",
    "What does NASA stand for?": "National Aeronautics and Space Administration.",
    "Who invented the telephone?": "Alexander Graham Bell.",
    "current Indian government news": "As of 2024, Narendra Modi is serving his 3rd term as PM and NDA has 293 seats."
};

// =====================
// FUZZY MATCH FUNCTION
// =====================
function findBestMatch(userMsg) {
    userMsg = userMsg.toLowerCase();

    let bestMatch = null;
    let highestScore = 0;

    for (const question in qaDataset) {
        const q = question.toLowerCase();
        const words = q.split(" ");

        let score = 0;
        words.forEach(word => {
            if (word.length > 2 && userMsg.includes(word)) {
                score++;
            }
        });

        if (score > highestScore) {
            highestScore = score;
            bestMatch = question;
        }
    }

    return highestScore >= 2 ? bestMatch : null;
}

// =====================
// MAIN BOT REPLY LOGIC
// =====================
function generateBotReply(userMsg) {
    const msg = userMsg.toLowerCase();
    let reply = "";

    // === 1. Dataset Fuzzy Matching ===
    const matchedQ = findBestMatch(userMsg);
    if (matchedQ) {
        reply = qaDataset[matchedQ];
        return botResponse(userMsg, reply);
    }

    // === 2. Teaching Logic ===
    if (msg.includes("teach you") || msg.includes("train you") || msg.includes("help you learn")) {
        reply = "I’d love to learn more! 😊 What would you like to teach me?";
        return botResponse(userMsg, reply);
    }

    // === 3. Logic building conversation ===
    if (msg.includes("creating logic") || msg.includes("improving you") || msg.includes("upgrade you")) {
        reply = "That's awesome! 🤖 Do you want help improving my responses or adding new knowledge?";
        return botResponse(userMsg, reply);
    }

    // === 4. Basic Greetings ===
    if (/(hi|hello|hey|good morning|good evening)/.test(msg)) {
        reply = "Hey there 👋! How’s your day going?";
        return botResponse(userMsg, reply);
    }

    // === 5. How are you ===
    if (msg.includes("how are you")) {
        reply = "I'm doing great 😄. Thanks for asking! How about you?";
        return botResponse(userMsg, reply);
    }

    // === 6. Motivation ===
    if (msg.includes("motivate") || msg.includes("motivation")) {
        reply = "You are stronger than your struggles 💪✨. Keep going—you’re closer than you think!";
        return botResponse(userMsg, reply);
    }

    // === 7. Sadness Handling ===
    if (msg.includes("sad") || msg.includes("upset") || msg.includes("bored") || msg.includes("stressed")) {
        reply = "I'm here for you 🤗. Do you want a joke, motivation, or someone to talk to?";
        return botResponse(userMsg, reply);
    }

    // === 8. Jokes ===
    if (msg.includes("joke")) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 😂",
            "Why did the web developer go broke? Because he lost all his cache!",
            "What do computers eat? Microchips 😆"
        ];
        reply = jokes[Math.floor(Math.random() * jokes.length)];
        return botResponse(userMsg, reply);
    }

    // === 9. Fallback ===
    reply = generateFriendlyFallback();
    botResponse(userMsg, reply);
}

// =====================
// Friendly Fallback
// =====================
function generateFriendlyFallback() {
    const fallback = [
        "Hmm… that's interesting! Tell me more.",
        "I’m not fully sure, but I’d love to understand better.",
        "Can you rephrase that for me?",
        "I’m still learning—help me understand better 😊"
    ];
    return fallback[Math.floor(Math.random() * fallback.length)];
}

// =====================
// Final Bot Response Handler
// =====================
function botResponse(question, answer) {
    appendMessage(answer, "bot");
    chatMemory.push({ sender: "bot", text: answer });
    speakText(answer);
    saveChatToDB(question, answer);
}

// =====================
// TEXT TO SPEECH (Only if Enabled)
// =====================
function speakText(text) {
    if (!ttsEnabled) return;  // Speak only when speaker icon is active

    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
}