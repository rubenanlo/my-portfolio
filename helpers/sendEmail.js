const sgMail = require("@sendgrid/mail");

const sendEmail = async ({ to, from = process.env.EMAIL_USER, ...message }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from,
    ...message,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
