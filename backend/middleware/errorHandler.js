// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: err.message,
    });
};

module.exports = errorHandler;