const express = require('express');
const router = express.Router();
const answerForm = require('../controllers/answerForm.js');
// const { validate } = require("express-validation");
// const { vSignUpStudents } = require('../validations/student_validation');
router.get('/answerForm', answerForm.getForm);
router.get('/answerForm/:id', answerForm.getOneForm);
router.post('/answerForm', answerForm.createForm);
router.patch('/answerForm/:id',answerForm.updateForm);
router.delete('/answerForm/:id', answerForm.deleteForm);

module.exports = router;