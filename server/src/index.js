const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const googleAuthRoutes = require(
  "./routes/googleAuthRoutes"
);


dotenv.config();
console.log("JWT_SECRET LOADED:", process.env.JWT_SECRET);
require("./config/passport");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const {
  generateQuestions,
} = require("./services/aiService");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/interview", interviewRoutes);
app.use(
  "/api/resume",
  resumeRoutes
);
app.use("/api/auth", googleAuthRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/test-ai", async (req, res) => {
  try {

    const questions = await generateQuestions(
      "Frontend Developer",
      "Fresher",
      "React, JavaScript"
    );

    res.send(questions);

  } catch (error) {

    console.log(error.response?.data || error);

    res.status(500).send("AI Error");

  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});