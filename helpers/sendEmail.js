const sgMail = require("@sendgrid/mail");

const sendEmail = async ({
  to,
  from = process.env.EMAIL_USER,
  templateId,
  // dynamicTemplateData,
  ...message
}) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from,
    templateId,
    ...message,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendEmail;
