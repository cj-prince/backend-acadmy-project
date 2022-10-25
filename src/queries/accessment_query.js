const queries = {
    accessmentForm: `
            INSERT INTO questions (question,a_option,b_option,c_option,d_option,batch,duration,instructions,correct_answer)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *;
    `,
    getAccessment: `SELECT * FROM questions;`,
    updateAccessment: `
        UPDATE questions
        SET question = $1,a_option=$2,b_option=$3,c_option= $4, d_option = $5,batch= $6, duration = $7, instructions = $8, correct_answer = $9
        WHERE id = $10 RETURNING *
    `,
    getOneAccessment: `SELECT * FROM questions WHERE id = $1`,
    deleteAccessment: `DELETE FROM questions WHERE id = $1`,
}

module.exports = queries;