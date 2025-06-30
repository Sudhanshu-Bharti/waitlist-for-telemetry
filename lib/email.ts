import nodemailer from "nodemailer";

export async function sendWaitlistConfirmationEmail({ to, name }: { to: string; name?: string }) {
  const smtpUser = process.env.BREVO_SMTP_USER;
  const smtpPass = process.env.BREVO_SMTP_PASS;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const host = process.env.BREVO_SMTP;

  if (!smtpUser || !smtpPass || !senderEmail) {
    throw new Error("BREVO_SMTP_USER, BREVO_SMTP_PASS, or BREVO_SENDER_EMAIL is not set in .env");
  }

  const transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `Waitlist <${senderEmail}>`, // Use your verified sender email
    to,
    subject: "You're on the waitlist!",
    html: `<p>Hi${name ? ` ${name}` : ""},<br/>Thank you for joining our waitlist!</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send email via Brevo SMTP:", error);
    throw new Error("Failed to send confirmation email.");
  }
} 