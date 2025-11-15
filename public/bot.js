// =====================
// BOT.JS (Bot Logic)
// =====================

// === Dataset Storage ===
const qaDataset = {
    "What is AI?": "AI stands for Artificial Intelligence, which involves simulating human intelligence in machines.",
    "How does machine learning work?": "Machine learning is a subset of AI that involves training machines to learn from data.",
    "What is Python?": "Python is a high-level programming language known for its simplicity and readability.",
    "What is your name?": "I am E.R.I.C. (Electronic Response Intelligent Chatbot).",
    "How does AI work?": "AI involves simulating human intelligence processes using machines.",
    "Can you write programs?": "Yes, what kind of language are you interested in?",
    "Who is captain of Indian Cricket Team?": "Rohit Sharma is captain of Indian Cricket Team in all formats.",
    "Who is the current winner of the World Cup of 50 overs?": "Australia is the current World Cup champion.",
    "Who is the greatest batsman ever in history?": "Sachin Tendulkar, Virat Kohli, Rohit Sharma, Viv Richards, Don Bradman, MS Dhoni, AB de Villiers, Steve Smith, David Warner, Adam Gilchrist are among the greatest batsmen ever.",
    "Which game was previously known as Mintonette?": "Volleyball was previously known as Mintonette.",
    "Hi": "Hello, this is E.R.I.C. What kind of help do you need?",
    "Who developed you?": "E.R.I.C. is developed by Singh Nitish Ku Ajit Kumar.",
    "What is your functionality?": "I am a chatbot which helps users to answer their questions.",
    "Who was the prime minister of India?": "Jawaharlal Nehru (15 August 1947 - 27 May 1964).",
    "Who is the current Prime Minister of India?": "Narendra Modi became the prime minister of India in 2014 and is in office till present.",
    "What is the capital of France?": "The capital of France is Paris.",
    "Who painted the Mona Lisa?": "The Mona Lisa was painted by Leonardo da Vinci.",
    "What is the tallest mountain in the world?": "Mount Everest, with a height of 8,849 meters.",
    "What is the currency of Japan?": "The currency of Japan is the Japanese Yen (JPY).",
    "Who is the first woman to win a Nobel Prize?": "Marie Curie is the first woman to win a Nobel Prize.",
    "What is the difference between '==' and 'is' in Python?": "The '==' operator checks for equality of values. The 'is' operator checks for object identity in memory.",
    "Explain the concept of inheritance in object-oriented programming.": "Inheritance allows a new class to inherit attributes and methods from another class, improving reusability.",
    "What is the purpose of a constructor in Java?": "A constructor initializes objects when they are created.",
    "Alphabets of English are:": "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z.",
    "Who is the king of the jungle?": "The lion is the king of the jungle.",
    "Which is the fastest animal in the jungle?": "The cheetah is the fastest animal in the jungle.",
    "How are you?": "I am fine, what about you!",
    "What are Alphabets?": "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z.",
    "Count till 10": "1,2,3,4,5,6,7,8,9,10.",
    "How's weather today?": "It is a lovely weather in this beautiful world.",
    "Do you love me?": "Yes, every being in this world is loveable.",
    "Are you male or female?": "I don't have any gender, but I can help you in every possible way.",
    "What is the chemical symbol for water?": "The chemical symbol for water is H₂O.",
    "What is the speed of light?": "The speed of light is approximately 299,792 kilometers per second.",
    "Who developed the theory of relativity?": "Albert Einstein developed the theory of relativity.",
    "What is the powerhouse of the cell?": "The mitochondrion is the powerhouse of the cell.",
    "Who was the first President of the United States?": "George Washington was the first President of the United States.",
    "When did World War II end?": "World War II ended in 1945.",
    "When did India get its independence?": "India got its independence on 15th August 1947.",
    "Who was known as the Iron Lady?": "Margaret Thatcher was known as the Iron Lady.",
    "What is the largest ocean on Earth?": "The largest ocean on Earth is the Pacific Ocean.",
    "Which country has the largest population?": "China has the largest population.",
    "Who founded Microsoft?": "Microsoft was founded by Bill Gates and Paul Allen.",
    "What does CPU stand for?": "CPU stands for Central Processing Unit.",
    "What is the name of the first electronic general-purpose computer?": "ENIAC was the first electronic general-purpose computer.",
    "Who wrote 'Romeo and Juliet'?": "William Shakespeare wrote 'Romeo and Juliet'.",
    "What is the longest novel ever written?": "'In Search of Lost Time' by Marcel Proust is the longest novel.",
    "What is the value of Pi to two decimal places?": "The value of Pi to two decimal places is 3.14.",
    "What is the Pythagorean theorem?": "It states that a² + b² = c² in a right-angled triangle.",
    "What is the tallest building in the world?": "The tallest building is Burj Khalifa in Dubai.",
    "What is the atomic number of carbon?": "The atomic number of carbon is 6.",
    "What is the most abundant gas in Earth's atmosphere?": "Nitrogen is the most abundant gas.",
    "Who is known as the father of modern physics?": "Albert Einstein is considered the father of modern physics.",
    "Who was the first man to walk on the moon?": "Neil Armstrong was the first man to walk on the moon.",
    "What ancient civilization built the pyramids?": "The ancient Egyptians built the pyramids.",
    "When was the Declaration of Independence signed?": "It was signed on July 4, 1776.",
    "What is the capital of Japan?": "The capital of Japan is Tokyo.",
    "Which river is the longest in the world?": "The Nile River is the longest in the world.",
    "What is the smallest country in the world by land area?": "The smallest country is Vatican City.",
    "What does HTTP stand for?": "HTTP stands for HyperText Transfer Protocol.",
    "Who is the founder of SpaceX?": "Elon Musk is the founder of SpaceX.",
    "What was the first video uploaded on YouTube?": "'Me at the zoo' was the first video uploaded.",
    "Who wrote 'Pride and Prejudice'?": "Jane Austen wrote 'Pride and Prejudice'.",
    "What is the name of the wizarding school in Harry Potter?": "Hogwarts School of Witchcraft and Wizardry.",
    "Who wrote 'The Odyssey'?": "Homer wrote 'The Odyssey'.",
    "What is the formula for area of a circle?": "Area = πr².",
    "What is 7 factorial?": "7! = 5040.",
    "What is the Fibonacci sequence?": "The Fibonacci sequence is a series where each number is the sum of the previous two.",
    "What is the national animal of Canada?": "The national animal of Canada is the beaver.",
    "What is the primary ingredient in guacamole?": "Avocado is the primary ingredient.",
    "What is the largest planet in our solar system?": "The largest planet is Jupiter.",
    "What does NASA stand for?": "NASA stands for National Aeronautics and Space Administration.",
    "Who invented the telephone?": "Alexander Graham Bell invented the telephone.",
    "What is the capital of Australia?": "The capital of Australia is Canberra.",
    "What element does 'O' represent on the periodic table?": "O represents oxygen.",
    "Who painted the ceiling of the Sistine Chapel?": "Michelangelo painted it.",
    "What is the hardest natural substance on Earth?": "Diamond is the hardest natural substance.",
    "What year did the Titanic sink?": "The Titanic sank in 1912.",
    "What is the largest desert in the world?": "The largest desert is the Antarctic Desert.",
    "What is the main language spoken in Brazil?": "Portuguese is the main language spoken in Brazil.",
    "How do you do?": "I am good in working conditions. What about you?",
    "Hey need little help": "Of course! What do you need help with?",
    "current Indian government news": "As of 2024, the Indian government is led by Prime Minister Narendra Modi (3rd term). NDA holds 293 seats in Lok Sabha."
};

// =====================
// MAIN BOT REPLY FUNCTION
// =====================
function generateBotReply(userMsg) {
    const msg = userMsg.toLowerCase();
    let reply = "";

// =====================
// CHECK DATASET FIRST
// =====================
    for (const key in qaDataset) {
        if (msg.includes(key)) {
            reply = qaDataset[key];
            return botResponse(userMsg, reply);
        }
    }

// =====================
// HARD-CODED LOGIC
// =====================

    if (/(hi|hello|hey|good morning|good evening)/.test(msg)) {
        reply = "Hey there 👋! How’s your day going?";
    }

    else if (msg.includes("how are you")) {
        reply = "I’m doing great 😄. How about you?";
    }

    else if (msg.includes("i am sad")) {
        reply = "I’m really sorry to hear that 😢. Want to talk about it?";
    }

    else if (msg.includes("motivate")) {
        reply = "Believe in yourself 💪. You are capable of more than you think.";
    }

    else if (msg.includes("joke")) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 😂",
            "Why was the computer cold? It forgot to close Windows!",
            "A SQL query walks into a bar, and asks: 'Can I join you?'"
        ];
        reply = jokes[Math.floor(Math.random() * jokes.length)];
    }

    else {
        reply = generateFriendlyFallback(msg);
    }

    botResponse(userMsg, reply);
}


// =====================
// Friendlier fallback
// =====================
function generateFriendlyFallback() {
    const responses = [
        "Hmm, that’s interesting! Tell me more.",
        "I’m still learning, but I want to understand better.",
        "Can you explain that in a different way?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// =====================
// Send final bot reply
// =====================
function botResponse(question, answer) {
    appendMessage(answer, 'bot');
    chatMemory.push({ sender: 'bot', text: answer });
    speakText(answer);
    saveChatToDB(question, answer);
}