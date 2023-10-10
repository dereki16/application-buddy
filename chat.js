// import express from "express";
// import cors from 'cors';
// import { Configuration, OpenAIApi } from "openai";
// import { config } from "dotenv";
// config();

// const app = express();
// const port = 3000;
// const API_URL = process.env.API_URL || 'http://localhost:3000/get-openai-response';
// const isProduction = process.env.NODE_ENV === 'production';

// app.use(express.static('public')); 

// const openai = new OpenAIApi(new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// }));

// app.use(cors({ 
//   origin: isProduction ? 'https://application-bud.web.app/' : '*'
// }));
// app.use(express.json());

// app.post("/get-openai-response", async (req, res) => {
//   const userMessage = req.body.userMessage;
//   try {
//     const apiResponse = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: userMessage }],
//     });
//     res.json({ openaiResponse: apiResponse.data.choices[0].message.content });
//   } catch (error) {
//     console.error("Error talking to OpenAI API: ", error);
//     res.status(500).send("Error talking to OpenAI API");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
