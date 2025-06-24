const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();

app.post("/send-email", async (req, res) => {
  try {
    const data = req.body;

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail", // automatically sets the right host and port
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"C3 Soccer Club" <no-reply@c3.com>',
      to: "nehaw61669@exitbit.com",
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

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.status(200).json({
      success: true,
      previewUrl: nodemailer.getTestMessageUrl(info),
      message: "Email sent (preview only)",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
