const express = require('express');
const router = express.Router();
const answerForm = require('../controllers/answerForm.js');
// const { validate } = require("express-validation");
// const { vSignUpStudents } = require('../validations/student_validation');
router.get('/answer', answerForm.getForm);
router.get('/answer/:id', answerForm.getOneForm);
router.post('/answer', answerForm.createForm);
router.patch('/answer/:id',answerForm.updateForm);
router.delete('/answer/:id', answerForm.deleteForm);

module.exports = router;