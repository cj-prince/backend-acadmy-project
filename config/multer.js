const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, path.join(__dirname, '../public/images'));
    } else {
      cb({ message: 'Not an image file' }, false);
    }
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 1024*1024*10 } });
module.exports = upload;