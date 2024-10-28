const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createCrimeReport } = require('../controllers/crimeController');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log('Multer received file:', file);
    cb(null, true);
  }
});

// POST route for creating a new crime report
router.post('/register', upload.single('file'), (req, res, next) => {
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  next();
}, createCrimeReport);

module.exports = router;