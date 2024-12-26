const express = require("express");
const pradeepRouter = express.Router();
const { User } = require("../models/teachings");

// GET route to greet
pradeepRouter.get("/pradeep", (req, res) => {
  const { user } = req.query; // Query parameter example: http://localhost:5000/pradeep?user=John
  if (user) {
    res.send(`Hello, ${user}!`);
  } else {
    res.send("Hello from Pradeep!");
  }
});

// POST route to insert a user
pradeepRouter.post("/insert", async (req, res) => {
  try {
    const user = new User(req.body); // Create a new user from request body
    await user.save(); // Save the user to the database
    res.status(201).send({ message: "User inserted successfully", user });
  } catch (e) {
    console.error("Error:", e.message);
    res.status(500).send({ message: "An error occurred", error: e.message });
  }
});

module.exports = pradeepRouter;
