// const functions = require("firebase-functions");
// const nodemailer = require("nodemailer");
// const email = "jobappbuddy@gmail.com";
// const MAIL_PASS = functions.config().gmail.password;

// // Create a transport object using Gmail SMTP
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: email,
//     pass: MAIL_PASS,
//   },
// });

// exports.sendEmail = functions.https.onRequest(async (req, res) => {
//   try {
//     const formData = req.body;
//     // Check if formData is empty or not
//     if (!formData) {
//       return res.status(400).send("Bad Request: Form data is missing");
//     }
//     // Construct the email message
//     const mailOptions = {
//       from: formData.email,
//       to: email,
//       subject: "New Mail! - " + formData.subject,
//       text: `Name: ${formData.name}\nMessage: ${formData.message}`,
//     };
//     // Send the email
//     await transporter.sendMail(mailOptions);
//     res.status(200).send("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email: ", error);
//     res.status(500).send("Error sending email");
//   }
// });
