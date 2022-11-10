const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../config/config.js');
const cloudinary = require('../config/cloudinary.js');
const queries = require('../queries/student_query');

const fetchStudents = async (req, res) => {
    try {
        const students = await db.any(queries.getStudents)
        return res.status(200).json({
            status: 'Success',
            message: 'Students returned',
            data: students
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const registerStudent = async (req, res) => {
    let { firstname,lastname,email, phone, password } = req.body;
    try {
        const existingEmail = await db.any(queries.findByEmail, [email]);
        if (existingEmail.length > 0) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Email already exists'
            })
        }
        password = bcrypt.hashSync(password, 10);
        const student = await db.any(queries.registerStudent, [firstname,lastname,email,phone,password])
        delete student[0].password
        return res.status(200).json({
            status: 'Success',
            message: 'Student Added',
            data: student
        })
    } catch (err) {
        console.log(err)
        return err
    }
}

const updateStudent = async (req, res) => {
    let { id } = req.params;
    let {address,dob, university,course_of_study,cgpa,cv,image} = req.body
    
    try {
        const cloudImage = await cloudinary.uploader.upload(image, {
            folder: "enyata",
            width: 300
        })
        const cloudCv = await cloudinary.uploader.upload(cv, {
            folder: "studentcv",
            resource_type: "auto"
        })
        cv = cloudCv.secure_url
        image = cloudImage.secure_url
        const student = await db.oneOrNone(queries.updateStudent, [address,dob, university,course_of_study,cgpa,cv,image
        ,id])
        return res.status(200).json({
            status: 'Success',
            message: 'Student Updated',
            data: student
        })
        
    } catch (err) {
        console.log(err)
        return err;
    }
}

const updateOne = async(req,res) => {
    let {id } = req.params;
    let {score} = req.body;
    console.log(req.body)

    try {
        // const idCheck = await db.oneOrNone(queries.getOneStudent,[id])
        // if (idCheck.length < 0) {
        //     return res.status(400).json({
        //         status: 'Failed',
        //         message: 'id does not exists'
        //     })
        // }
        const student = await db.any(queries.updateScore, [score,id])
        return res.status(200).json({
            status: 'Success',
            message: 'Score Added',
            data: student
        })
    } catch (error) {
        console.log(error)
        return error;
    }
}

const updateVerfication = async(req,res) => {
    let {id } = req.params;
    let {is_verified} = req.body;
    console.log(req.body)

    try {
        // const idCheck = await db.oneOrNone(queries.getOneStudent,[id])
        // if (idCheck.length < 0) {
        //     return res.status(400).json({
        //         status: 'Failed',
        //         message: 'id does not exists'
        //     })
        // }
        const student = await db.any(queries.updateVerified, [is_verified,id])
        return res.status(200).json({
            status: 'Success',
            message: 'Score Added',
            data: student
        })
    } catch (error) {
        console.log(error)
        return error;
    }
}

const deleteStudent = async (req, res) => {
    let { id } = req.params;
    try {
        await db.none(queries.deleteStudent, [id])
        return res.status(200).json({
            status: 'Success',
            message: 'Student Removed',
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const getOneStudent = async (req, res) => {
    let { id } = req.params;
    try {
        const student = await db.oneOrNone(queries.getOneStudent, [id])
        delete student.password;
        return res.status(200).json({
            status: 'Success',
            message: 'Student Retrieved',
            data: student
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const login = async (req, res) => {
    
    try {
        let { email, password } = req.body;
        const existingEmail = await db.oneOrNone(queries.findByEmail, [email]);
        const student = await db.oneOrNone(queries.getStudentByEmail, [email]);
        console.log(student)

        if (!existingEmail) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No user with email'
            })
        }
        let passwordMatch = bcrypt.compareSync(password, student.password);
         console.log(student)
        if (!passwordMatch) { 
            return res.status(400).json({
                status: 'Failed', 
                message: 'Incorrect password'
            })
        }
        const sessionToken = jwt.sign(
            {
                student_id: student.id,
                email: student.email,
            },
            process.env.JWT_SECRET_KEY
        );
        delete student.password
        return res.status(200).json({
            status: 'Success',
            message: 'Logged In Successfully',
            data: {
                student,
                token: sessionToken
            }
        })
    } catch (err) {
        console.log(err)
        return err;
    }

}

const forgotPassword = async (req , res) => {
    let {email} = req.body;
    console.log(req.body)

    const existingEmail = await db.any(queries.findByEmail, [email]);
    if (existingEmail.length === 0) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Email does not exists'
         })
    }
    const student = await db.oneOrNone(queries.getStudentByEmail, [email]);
    const secret = process.env.JWT_SECRET_KEY + student.password

    const payload = {
        email: student.email,
        id: student.id
    }

    const token = jwt.sign(payload, secret, {expiresIn:'15m'})
    const link = `http://localhost:8080/#/resetpassword/${student.id}/${token}`
    console.log (link)
    res.send('password reset email sent')
}

const resetPassword = async (req, res) =>{
    let {id , token} = req.params
    let {password, email} = req.body;
    console.log(req.body)
    const idCheck = await db.oneOrNone(queries.getStudentByEmail, [email]);
    if(id !==  idCheck.id){
        return res.status(400).json({
            status: 'Failed',
            message: 'invalid id'
         }) 
    }
    const student = await db.any(queries.updatePassword, [password, email]);
    const secret = process.env.JWT_SECRET_KEY + student.password
    try {
        jwt.verify(token, secret)
        student.password = password
        password = bcrypt.hashSync(password, 10);
        return res.status(200).json({
            status: 'Success',
            message: 'Student Added',
            data: student
        })
    } catch (err) {
        console.log(err)
        return err
    }


}

module.exports = {
    fetchStudents,
    registerStudent,
    updateStudent,
    deleteStudent,
    getOneStudent,
    login,
    updateOne,
    updateVerfication,
    forgotPassword,
    resetPassword  
}