const queries = {
    registerStudent: `
            INSERT INTO students (firstname,lastname,email,phone,password)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
    `,
    updateStudent: `
        UPDATE students
        SET address = $1,dob=$2,university = $3,course_of_study = $4,cgpa = $5, cv =$6, image =$7
        WHERE id = $8 RETURNING *
    `,
    getStudents: `SELECT * FROM students;`,
    getOneStudent: `SELECT * FROM students WHERE id = $1`,
    getStudentByEmail: `SELECT * FROM students WHERE email = $1`,
    deleteStudent: `DELETE FROM students WHERE id = $1`,
    findByEmail: `SELECT email FROM students WHERE email = $1;`,
    updateScore:`
        UPDATE students SET score = $1 WHERE id = $2 
        RETURNING *
    `,
    updateVerified:`
        UPDATE students SET is_verified = $1 WHERE id = $2 
        RETURNING *
    `,
    updatePassword: `
        UPDATE students SET password=$1, 
        WHERE email=$3 
        RETURNING *
      `,
}

module.exports = queries;