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
const app = express();

const openai = new OpenAIApi(new Configuration({
  apiKey: functions.config().openai.key,
}));

const cors = require("cors");
const corsOptions = {
  origin: [
    "https://application-bud.web.app",
    "https://us-central1-application-bud.cloudfunctions.net",
  ],
  methods: "GET,POST,PUT",
};

app.use(cors(corsOptions));

app.use(express.json());
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
});

app.post("/get-openai-response", apiLimiter, async (req, res) => {
  const userMessage = req.body.userMessage;
  try {
    const apiResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an assistant that " +
            "provides concise advice primarily " +
            "on job related info. " +
            "Please provide responses in less than 120 words. " +
            "In lists of more than 5 items, each item should be concise. ",
        },
        {role: "user", content: userMessage},
      ],
      max_tokens: 200,
    });

    // Set the CORS headers in the response
    res.set(corsOptions);

    res.json({openaiResponse: apiResponse.data.choices[0].message.content});
  } catch (error) {
    const redirectUrl = "https://application-bud.web.app/error.html";
    res.status(200).send(`<script>window.location.href =` +
    `"${redirectUrl}";</script>`);
  }
});

exports.chat = functions.https.onRequest(app);

// Email function
const nodemailer = require("nodemailer");
const email = "jobappbuddy@gmail.com";
const MAIL_PASS = functions.config().gmail.password;

// Create a transport object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: MAIL_PASS,
  },
});

exports.sendEmail = functions.https.onRequest(async (req, res) => {
  try {
    const formData = req.body;
    console.log("Email:", email);
    console.log("Password:", MAIL_PASS);

    // Check if formData is empty or not
    if (!formData) {
      const redirectUrl = "https://application-bud.web.app/error.html";
      res.status(200).send(`<script>window.location.href =` +
      `"${redirectUrl}";</script>`);
    }
    // Construct the email message
    const mailOptions = {
      from: formData.email,
      to: email,
      subject: "New Mail! - " + formData.subject,
      text: `Name:\n${formData.name}\n\nMessage:\n${formData.message}`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    const redirectUrl = "https://application-bud.web.app/thank-you.html";
    res.status(200).send(`<script>window.location.href =` +
    `"${redirectUrl}";</script>`);
  } catch (error) {
    const redirectUrl = "https://application-bud.web.app/error.html";
    res.status(200).send(`<script>window.location.href =` +
    `"${redirectUrl}";</script>`);
  }
});
