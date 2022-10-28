const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  let { email,message } = req.body;
  

  
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME, 
      pass: process.env.SMTP_PASSWORD,
    },
  });


  const info = await transporter.sendMail({
    from: '"Enyata Academy" <enyata@enyata.com>', 
    to: {email}, 
    subject: "Approval ✔", 
    text: {message}, 
  });

  
  console.log("Message sent: %s", info.messageId);
  


  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.send('Email Sent!')
  return (info)
}

