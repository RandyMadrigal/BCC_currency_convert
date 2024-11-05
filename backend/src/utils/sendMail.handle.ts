import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: process.env.USER_TRANSPORTER,
    pass: process.env.PASS_TRANSPORTER,
  },
  tls: {
    rejectUnauthorized: false, //no SSL
  },
});

export const sendMail = async (to: string, name: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"currency converter webApp 👻" <${process.env.USER_TRANSPORTER} >`, // sender address
      to: `${to}`,
      subject: "currency converter webApp 👻", // Subject line
      html: `<h2>Welcome: ${name} </h2>
      <p>Probando....</p>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
};
