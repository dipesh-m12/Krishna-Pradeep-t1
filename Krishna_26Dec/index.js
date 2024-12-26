const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const pradeepRouter = require("./routes/pradeepRouter");
const { v4: uuidv4 } = require("uuid"); // Correct import for UUID

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // Add options to avoid warnings
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message); // Improved error logging
  });

// Middleware
app.use(express.json());
// app.use(cors()); // Uncomment if you need Cross-Origin Resource Sharing
// app.use(cookieParser()); // Uncomment if you're using cookies
// app.use(verify()); // Uncomment and add middleware for verification if needed

// Routes
app.use("/api/user", pradeepRouter);

// UUID Test Endpoint
app.get("/:name", (req, res) => {
  const { name } = req.params;
  const generatedUuid = uuidv4(); // Generate UUID
  res.send({ message: `Hello, ${name}!`, uuid: generatedUuid });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
