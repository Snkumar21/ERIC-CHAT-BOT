const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware CORS
app.use(cors({
    origin: ["http://localhost:5500", "http://localhost:5000", "https://eric-chat-bot.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(bodyParser.json());

// Connect DB
connectDB();

// ✅ Serve static frontend
app.use(express.static(path.join(__dirname, "../public")));

// Default route → Load Login Page (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Serve static files (Frontend)
app.get("/", (req, res) => {
    if (process.env.NODE_ENV === "production") {
        return res.json({ status: "Backend is running!" });
    } else {
        return res.sendFile(path.join(__dirname, "../public/index.html"));
    }
});

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});