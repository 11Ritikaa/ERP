// config/multer.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Save to 'uploads' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Generate unique file name
  },
});

// File filter to allow only jpg, jpeg, and png formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type! Only JPG, JPEG, and PNG are allowed.'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1 }, // 1MB file size limit
  fileFilter: fileFilter,
});

module.exports = upload;