const express = require('express');
const router = express.Router();
const batch = require('../controllers/adminController/batch')

router.get('/batch', batch.getBatch);
router.get('/batch/:id', batch.getOneBatch);
router.post('/batch', batch.createBatch);
router.patch('/batch/:id', batch.updateBatch);
router.delete('/batch/:id', batch.deleteBatch);


module.exports = router;