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

  

app.listen(port, () => {
    console.log(`Application running on  port ${port}`);
})