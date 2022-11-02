const db = require('../../config/config.js');
const queries = require('../../queries/batch_query');

const createBatch = async (req, res) => {
     let { batch_id,closure_date,instructions} = req.body;
    try {
        const batchForm= await db.any(queries.batchForm, [batch_id,closure_date,instructions])
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment created',
            data: batchForm
        })
    } catch (error) {
        res.status(500).json({
          message: 'An error has ocurred',
          error
      })
    }
}

const getBatch = async(req, res) => {
  try {
    const batchForm = await db.any(queries.getbatch)
    return res.status(200).json({
      status: 'Success',
      message: 'Batch gotten',
      data: batchForm
    })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

const updateBatch = async (req, res) => {
    let { id } = req.params;
    let {batch_id,closure_date,instructions} = req.body;
    try {
        const batchForm = await db.any(queries.updateBatch, [batch_id,closure_date,instructions, id])
        return res.status(200).json({
            status: 'Success',
            message: 'Batch Updated',
            data: batchForm
        })
    } catch (error) {
        res.status(500).json({
        message: 'An error has ocurred',
        error
    })
    }
}

const getOneBatch = async (req, res) => {
  let { id } = req.params;
  try {
     const batchForm = await db.any(queries.getOneBatch, [id])
        return res.status(200).json({
            status: 'Success',
            message: 'Accessment Retrieved',
            data: batchForm
        })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

const deleteBatch = async (req, res) => {
  let { id } = req.params;
  try {
     db.none(queries.deleteBatch, [id]);
        return res.status(200).json({
            status: 'Success',
            message: 'Batch Removed',
        })
  } catch (error) {
    res.status(500).json({
        message: 'An error has ocurred',
        error
    })
  }
}

module.exports = {
  createBatch,
  getBatch,
  updateBatch,
  deleteBatch,
  getOneBatch 
}