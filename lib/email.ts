import nodemailer from "nodemailer";

export async function sendWaitlistConfirmationEmail({ to, name }: { to: string; name?: string }) {
  const smtpUser = process.env.BREVO_SMTP_USER;
  const smtpPass = process.env.BREVO_SMTP_PASS;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const host = process.env.BREVO_HOST;

  if (!smtpUser || !smtpPass || !senderEmail) {
    throw new Error("SMTP_USER, SMTP_PASS, or SENDER_EMAIL is not set in .env");
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
    from: `statistic.live <${senderEmail}>`, // Use your verified sender email
    to,
    subject: "You're on the waitlist!",
    html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <p>Hi${name ? ` ${name}` : ""},</p>
    <p>Thank you for joining our waitlist! 🎉</p>
    <p>We’re excited to have you on board. We’ll let you know as soon as we’re ready to launch.</p>
    <p style="margin-top: 24px;">— The Team</p>
  </div>
`

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