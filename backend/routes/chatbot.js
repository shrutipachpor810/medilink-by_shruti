import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ reply: "Prompt is required." });
  }

  try {
    // Define a system message to limit Gemini's behavior
    const systemPrompt = `
      You are a helpful assistant for MediLink, a healthcare platform. 
      Only answer questions related to MediLink like:
      - how to book appointments
      - upload reports
      - consult with doctors
      - view medical history
      - registration/login process
      If the user asks unrelated questions, politely say:
      "I'm here to assist with MediLink-related queries only."
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "user", parts: [{ text: prompt }] }
          ]
        })
      }
    );

    const data = await response.json();

    // Log full response for debugging
    console.log("Gemini API response:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand your question.";

    res.json({ reply });

  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ reply: "Something went wrong while processing your request." });
  }
});

export default router;
