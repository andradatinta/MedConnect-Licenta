const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  const message = {
    to: options.email,
    from: "medconnect2023@gmail.com",
    subject: options.subject,
    text: options.message,
    html: `<strong>${options.message}</strong>`,
  };

  try {
    await sgMail.send(message);
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email", error);
  }
};

module.exports = sendEmail;
