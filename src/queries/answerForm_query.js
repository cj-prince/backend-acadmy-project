const queries = {
    answerForm: `
            INSERT INTO answer (student_id,score)
            VALUES ($1, $2) 
            RETURNING *;
    `,
    getform: `SELECT * FROM answer;`,
    updateForm: `
        UPDATE answer
        SET student_answer= $1,correct_answer=$2,score=$3
        WHERE id = $4 RETURNING *
    `,
    getOneForm: `SELECT * FROM answer WHERE id = $1`,
    deleteForm: `DELETE FROM answer WHERE id = $1`,
}

module.exports = queries;