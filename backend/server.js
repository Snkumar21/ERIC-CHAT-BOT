const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "https://eric-chat-bot.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(bodyParser.json());

// Connect DB
connectDB();

// Serve static files (Frontend)
app.get("/", (req, res) => {
    res.json({ status: "Backend is running!" });
});

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

// Default route → Load Login Page (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error handling
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});