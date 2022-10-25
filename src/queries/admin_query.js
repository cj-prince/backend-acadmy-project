module.exports  = {
    registerAdmin: `
            INSERT INTO admin(email,password)
            VALUES($1, $2) 
            RETURNING *;
    `,
    updateAdmin: `
        UPDATE admin
        SET password = $1, email = $2
        WHERE id = $3 RETURNING *
    `,
    getAdmin: `SELECT * FROM admin;`,
    getOneAdmin: `SELECT * FROM admin WHERE id = $1`,
    deleteAdmin: `DELETE FROM admin WHERE id = $1`,
    findByEmail: `SELECT email FROM admin WHERE email = $1;`,
    getAdminByEmail: `SELECT * FROM admin WHERE email = $1`,

}

