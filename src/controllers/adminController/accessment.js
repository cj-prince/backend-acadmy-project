const db = require('../../config/config.js');
const queries = require('../../queries/accessment_query');

const createAccessment = async (req, res) => {
    let {question,a_option,b_option,c_option,d_option,batch,duration,instructions,correct_answer,image} = req.body;
    try {
        const accessmentForm= await db.none(queries.accessmentForm, [question,a_option,b_option,c_option,d_option,batch,duration,instructions,correct_answer,image])
        console.log(accessmentForm)
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment created',
            data: accessmentForm
        })
    } catch (error) {
        res.status(500).json({
          message: 'An error has ocurred',
          error
      })
    }
}

const getAccessment = async(req, res) => {
  try {
    const accessmentForm = await db.any(queries.getAccessment)
    return res.status(200).json({
      status: 'Success',
      message: 'Accessment returned',
      data: accessmentForm
    })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

const updateAccessment = async (req, res) => {
    let { id } = req.params;
    let {question,a_option,b_option,c_option, d_option, batch,duration,instruction,correct_answer,image} = req.body;
    try {
        const accessmentForm = await db.any(queries.updateAccessment, [question,a_option,b_option,c_option, d_option, batch, duration,instruction,correct_answer,image, id])
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment Updated',
            data: accessmentForm
        })
    } catch (error) {
        res.status(500).json({
        message: 'An error has ocurred',
        error
    })
    }
}

const getOneAccessment = async (req, res) => {
  let { id } = req.params;
  try {
     const accessmentForm = await db.any(queries.getOneAccessment, [id])
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment Retrieved',
            data: accessmentForm
        })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

const deleteAccessment = async (req, res) => {
  let { id } = req.params;
  try {
     db.none(queries.deleteAccessment, [id]);
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment Removed',
        })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}




module.exports = {
  createAccessment,
  getAccessment,
  updateAccessment,
  deleteAccessment,
  getOneAccessment 
}