module.exports = {
    batchForm: `
            INSERT INTO batch (batch_id,closure_date,instructions)
            VALUES($1, $2, $3) 
            RETURNING *;
    `,
    getbatch: `SELECT * FROM batch;`,
    updatebatch: `
        UPDATE batch
        SET batch_id = $1,closure_date=$2,instructions =$3
        WHERE id = $4 RETURNING *
    `,
    getOneBatch: `SELECT * FROM batchh WHERE id = $1`,
    deletebatch: `DELETE FROM batch WHERE id = $1`,
}
