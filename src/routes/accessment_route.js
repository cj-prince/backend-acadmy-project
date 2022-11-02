const express = require('express');
const router = express.Router();
const multer = require('multer')
const accessment = require('../controllers/adminController/accessment');
const upload = require("../config/multer").single('cover_photo')
router.get('/accessment', accessment.getAccessment);
router.get('/accessment/:id', accessment.getOneAccessment);
router.post('/accessment', accessment.createAccessment);
// router.post('/accessment/image', accessment.postAccessmentImage);
router.patch('/accessment/:id', accessment.updateAccessment);
router.delete('/accessment/:id', accessment.deleteAccessment);
router.route(
  "/accessment/image")
  .post((req, res, next) => {
    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        next(error);
      } else if (error) {
        next(error);
      }
      next()
    });
  },
    accessment.postAccessmentImage
  )

module.exports = router;