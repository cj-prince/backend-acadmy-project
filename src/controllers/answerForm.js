const db = require('../public/config.js');
const queries = require('../queries/answerForm_query');

const createForm = async (req, res) => {
     let {student_id ,score} = req.body;
    try {
        const answerForm= await db.any(queries.answerForm, [student_id,score])
        return res.status(200).json({
            status: 'Success',
            message: 'form created',
            data: answerForm
        })
    } catch (error) {
        res.status(500).json({
          message: 'An error has ocurred',
          error
      })
    }
}

const getForm = async(req, res) => {
  try {
    const answerForm = await db.any(queries.getform)
    return res.status(200).json({
      status: 'Success',
      message: 'form created',
      data: answerForm
    })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

const updateForm = async (req, res) => {
    let { id } = req.params;
    let { student_answer, correct_answer, score} = req.body;
    try {
        const answerForm = await db.any(queries.updateForm, [student_answer, correct_answer, score, id])
        return res.status(200).json({
            status: 'Success',
            message: 'Form Updated',
            data: answerForm
        })
    } catch (error) {
        res.status(500).json({
        message: 'An error has ocurred',
        error
    })
    }
}

const getOneForm = async (req, res) => {
  let { id } = req.params;
  try {
     const answerForm = await db.any(queries.getOneForm, [id])
        return res.status(200).json({
            status: 'Success',
            message: 'Form Retrieved',
            data: answerForm
        })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

const deleteForm = async (req, res) => {
  let { id } = req.params;
  try {
     db.none(queries.deleteForm, [id]);
        return res.status(200).json({
            status: 'Success',
            message: 'Form Removed',
        })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}




module.exports = {
  createForm,
  getForm,
  updateForm,
  deleteForm,
  getOneForm 
}
