const express = require("express");
const ChatMemory = require("../models/chatMemory");
const router = express.Router();

// Save a chat (user question + bot answer)
router.post("/save", async (req, res) => {
    try {
        const { userId, question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ message: "Question and Answer are required" });
        }

        const newMemory = new ChatMemory({ userId, question, answer });
        await newMemory.save();

        res.status(201).json({ message: "Chat saved successfully!" });
    } catch (error) {
        console.error("❌ Error saving chat:", error);
        res.status(500).json({ message: "Server error while saving chat" });
    }
});

// Retrieve a similar chat from memory
router.post("/search", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        // Use regex for partial/similar match
        const memory = await ChatMemory.findOne({
            question: { $regex: question, $options: "i" },
        });

        if (memory) {
            return res.status(200).json({ found: true, answer: memory.answer });
        } else {
            return res.status(200).json({ found: false });
        }
    } catch (error) {
        console.error("❌ Error fetching chat memory:", error);
        res.status(500).json({ message: "Server error while searching chat memory" });
    }
});

module.exports = router;