const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { message } = req.body;

    // Dummy chatbot logic (replace later with AI/ML integration)
    if (message.toLowerCase().includes("hello")) {
        res.json({ reply: "Hi there! I'm ERIC Chat Bot 🤖" });
    } else {
        res.json({ reply: "I'm still learning! Please teach me 🧠" });
    }
});

module.exports = router;