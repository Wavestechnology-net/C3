const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://c3k-frontend.server.dizainstech.com",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const timeout = setTimeout(() => {
    return res
      .status(504)
      .json({ success: false, message: "Email server timed out" });
  }, 10000); // 10 seconds max
  try {
    const data = req.body;

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"C3 Soccer Club" <no-reply@c3.com>',
      to: "test@gmail.com", // change to real recipient
      subject: "Tryout Form Submission",
      html: `
        <h2>Player Information</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>DOB:</strong> ${data.dob}</p>
        <p><strong>Age:</strong> ${data.age}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>

        <h2>Parent/Guardian</h2>
        <p><strong>Name:</strong> ${data.parentName}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>

        <h2>Programs:</h2>
        <p>${data.programs?.join(", ")}</p>

        <h2>Previous Soccer Experience:</h2>
        <p><strong>Experience:</strong> ${data.experience}</p>
        <p><strong>Teams:</strong> ${data.previousTeams || "N/A"}</p>

        <h2>Medical Info:</h2>
        <p>${data.medicalInfo || "None"}</p>
        <p><strong>Emergency Contact:</strong> ${data.emergencyContact}</p>

        <h2>Consent:</h2>
        <p>${data.consent ? "Yes" : "No"}</p>

        <h2>Signature:</h2>
        <p>${data.signature} - ${data.signatureDate}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    clearTimeout(timeout); // prevent timeout from firing
    console.log("Email sent:", info.messageId);

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    clearTimeout(timeout);
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
