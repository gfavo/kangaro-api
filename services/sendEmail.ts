import nodemailer from 'nodemailer' ; 

export const SendVerificationEmail = async (email: string, urlLink: string) => {
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

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Kangaro 🦘" <kangaro.automatic@zohomail.com>', // sender address
        to: email, // list of receivers
        subject: "Verificate your account!", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello person! Please click this link to verify your email account: ${urlLink}</b>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

  

};
