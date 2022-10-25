const express = require('express');
const router = express.Router();
const student = require('../controllers/student.js');

router.get('/students', student.fetchStudents);
router.get('/students/:id', student.getOneStudent);
router.post('/students', student.registerStudent);
router.post('/students/login', student.login);
router.put('/students/:id', student.updateStudent);
router.delete('/students/:id', student.deleteStudent);

module.exports = router;