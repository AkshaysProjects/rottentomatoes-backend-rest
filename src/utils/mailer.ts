import { createTransport } from "nodemailer";
import { env } from "../env";
import { getVerificationEmailHtml } from "../templates/verifyEmail";

const transporter = createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  secure: env.MAIL_PORT == 465,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  name: string,
  verificationLink: string,
  resendLink: string
) => {
  // Options for the email
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: email,
    subject: "Verify Email for RottenTomatoes",
    html: getVerificationEmailHtml(name, verificationLink, resendLink),
  };

  // Send the email
  return transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email: ", error.message);
      return false;
    }
    return true;
  });
};
