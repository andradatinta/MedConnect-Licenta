const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  // create email data
  const message = {
    to: options.email, // Change to your recipient
    from: "medconnect2023@gmail.com", // Change to your verified sender
    subject: options.subject,
    text: options.message,
    html: `<strong>${options.message}</strong>`,
  };

  // send the email
  try {
    await sgMail.send(message);
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email", error);
  }
};

module.exports = sendEmail;
