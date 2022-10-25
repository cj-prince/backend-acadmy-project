const express = require('express');
const router = express.Router();
const accessment = require('../controllers/adminController/accessment');

router.get('/accessment', accessment.getAccessment);
router.get('/accessment/:id', accessment.getOneAccessment);
router.post('/accessment', accessment.createAccessment);
router.patch('/accessment/:id', accessment.updateAccessment);
router.delete('/accessment/:id', accessment.deleteAccessment);

module.exports = router;