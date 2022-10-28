const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
const adminRouter = require('./src/routes/admin_route');
const studentRouter = require('./src/routes/student_route')
const formRouter = require('./src/routes/answerForm_route')
const accessmentRouter = require('./src/routes/accessment_route')
const batchRouter = require('./src/routes/batch_route')
// const mailRouter = require('./src/routes/sendMail_route')

const port = process.env.PORT;

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false , limit: '50mb'}));
app.use(adminRouter);
app.use(studentRouter);
app.use(formRouter);
app.use(accessmentRouter);
app.use(batchRouter);
// app.use(mailRouter );


app.post('/mailer', async (req, res) => {
    try {
        const { email, message} = req.body;
  

  
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            // service: 'gmail',
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
        // return (info)
    } catch (error) {
        console.log(error)
    }
    
})

app.listen(port, () => {
    console.log(`Application running on  port ${port}`);
})