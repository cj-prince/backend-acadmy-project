const queries = {
    accessmentForm: `
            INSERT INTO questions (question,duration)
            VALUES($1, $2) 
            RETURNING *;
    `,
    getAccessment: `SELECT * FROM questions;`,
    updateAccessment: `
        UPDATE questions
        SET question = $1,batch= $2, duration = $3, instructions = $4, correct_answer = $5 , image = $6
        WHERE id = $7 RETURNING *
    `,
    getOneAccessment: `SELECT * FROM questions WHERE id = $1`,
    deleteAccessment: `DELETE FROM questions WHERE id = $1`,
    postImage:`
        INSERT INTO questions (image)
            VALUES($1) 
             RETURNING *
    `
}

module.exports = queries;