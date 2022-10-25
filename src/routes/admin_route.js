const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController/admin')

router.get('/admin', admin.fetchAdmin);
router.get('/admin/:id', admin.getSingleAdmin);
router.post('/admin/login', admin.adminLogin);
router.post('/admin', admin.registerAdmin);
router.patch('/admin/:id', admin.updateAdmin);
router.delete('/admin/:id', admin.deleteAdmin);


module.exports = router;