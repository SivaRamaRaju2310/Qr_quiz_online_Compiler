const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 5000; // Change if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, "public")));

// JDoodle API credentials
const JDoodle_Credentials = {
  clientId: "67ba3a578192d44bcb1d3f71ae985db7",
  clientSecret: "566ae240bf71ce6263e6377e2697a554488b6fdded984a0169df871e6b4022fd",
};

// API Endpoint to Execute Code
app.post("/execute", async (req, res) => {
  try {
    const { script, language } = req.body;

    if (!script || !language) {
      return res.status(400).json({ error: "Missing script or language" });
    }

    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: JDoodle_Credentials.clientId,
      clientSecret: JDoodle_Credentials.clientSecret,
      script: script,
      language: language,
      versionIndex: "3",
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error executing code:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve index.html for root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
