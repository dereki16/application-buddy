/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const express = require("express");
const {Configuration, OpenAIApi} = require("openai");
const helmet = require("helmet");
const app = express();

app.use(helmet());

app.use((_, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://use.fontawesome.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://use.fontawesome.com https://cdnjs.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data:;");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=()");
  next();
});
const openai = new OpenAIApi(new Configuration({
  apiKey: functions.config().openai.key,
}));

const cors = require("cors");
const corsOptions = {
  origin: "https://application-bud.web.app/",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.post("/get-openai-response", async (req, res) => {
  const userMessage = req.body.userMessage;
  try {
    const apiResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are an assistant that " +
        "provides concise advice primarily " +
        "on job related info. " +
        "Please provide responses in less than 120 words. " +
        "In lists of more than 5 items, each item should be concise. " +
        "For cover letters, keep them 2-3 paragraphs max. " +
        "Don't use flowery language"},
        {role: "user", content: userMessage},
      ],
      max_tokens: 200,
    });
    res.json({openaiResponse: apiResponse.data.choices[0].message.content});
  } catch (error) {
    console.error("Error talking to OpenAI API: ", error);
    res.status(500).send("Error talking to OpenAI API");
  }
});

exports.chat = functions.https.onRequest(app);
