import nodemailer from 'nodemailer' ; 
import bcrypt from "bcrypt";

require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

export const SendVerificationEmail = async (email: string, userId: string) => {
  const emailPass = process.env.EMAIL_PASS;

  console.log(emailPass);

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "kangaro.automatic@zohomail.com",
      pass: emailPass
    },
  });
  

  const hash =  (await bcrypt.hash(Math.random().toString(), 2)).replace(/\//g, "slash");;


  await sql`insert into "verification_hashes" ("id", "hash", "user_id") values (default, ${hash}, ${userId}) RETURNING id`;

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Kangaro 🦘" <kangaro.automatic@zohomail.com>', // sender address
        to: email, // list of receivers
        subject: "Verificate your account!", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello person! Please click this link to verify your email account: ${"http://localhost:3000/verification/"+hash}</b>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
