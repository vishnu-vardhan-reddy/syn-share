const nodeMailer = require("nodemailer");

async function sendEmail({ from, to, subject, text, html }) {
  let transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: `inShare <${from}>`,
    to: to,
    subject: subject,
    text: text,
    html: html,
  });
}

module.exports = sendEmail;
