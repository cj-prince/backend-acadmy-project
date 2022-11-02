const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../../config/config.js')
const queries = require('../../queries/admin_query')

const fetchAdmin = async (req, res) => {
    try {
        const admin = await db.any(queries.getAdmin)
        return res.status(200).json({
            status: 'Success',
            message: 'Admin returned',
            data: admin
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const getSingleAdmin = async (req, res) => {
    let { id } = req.params;
    try {
        const admin = await db.any(queries.getOneAdmin, [id])
        return res.status(200).json({
            status: 'Success',
            message: 'Admin Retrieved',
            data: admin
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const registerAdmin = async (req, res) => {
    let { email,password } = req.body;
    try {
        const existingEmail = await db.any(queries.getAdminByEmail, [email]);
        if (existingEmail.length > 0) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Admin already exists',
            })
        }
        password = bcrypt.hashSync(password, 10);
        const admin = await db.any(queries.registerAdmin, [email, password])
        delete admin[0].password
        return res.status(200).json({
            status: 'Success',
            message: 'Admin Added',
            data: admin
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const updateAdmin = async (req, res) => {
    let { id } = req.params;
    let { email, password } = req.body;
    try {
        const school = await db.any(queries.updateAdmin, [email,password, id])
        return res.status(200).json({
            status: 'Success',
            message: 'Admin Updated',
            data: school
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const deleteAdmin = async (req, res) => {
    let { id } = req.params;
    try {
        db.none(queries.deleteAdmin, [id]);
        return res.status(200).json({
            status: 'Success',
            message: 'Admin Removed',
        })

    } catch (err) {
        console.log(err)
        return err
    }
}
const adminLogin = async (req, res) => {
    let { email, password } = req.body;
    try {
        const existingEmail = await db.any(queries.findByEmail, [email]);
        const admin = await db.any(queries.getAdminByEmail, [email]);
        if (!existingEmail) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No user with email'
            })
        }
        console.log(req.body)
        const passwordMatch = bcrypt.compareSync(password, admin[0].password);
        console.log(req.body)
        if (!passwordMatch) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Incorrect password'
            })
        }
        const sessionToken = jwt.sign(
            {
                admin_id: admin.id,
                email: admin.email,
                password: admin.password,
            },
            process.env.JWT_SECRET_KEY
        );
        delete admin[0].password
        return res.status(200).json({
            status: 'Success',
            message: 'Logged In Successfully',
            data: {
                admin,
                token: sessionToken
            }
        })
    } catch (err) {
        console.log(err)
        return err;
    }

}


module.exports = {
    fetchAdmin,
    registerAdmin ,
    updateAdmin,
    deleteAdmin,
    getSingleAdmin,
    adminLogin
}