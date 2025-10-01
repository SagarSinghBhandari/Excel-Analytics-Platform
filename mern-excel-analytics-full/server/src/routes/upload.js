const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const Upload = require('../models/Upload');
const auth = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// upload and parse Excel
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });
    const filepath = req.file.path;
    const workbook = XLSX.readFile(filepath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: null });
    const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0] || [];
    const saved = new Upload({
      user: req.user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      parsed: json,
      headers,
    });
    await saved.save();
    res.json({ msg: 'Uploaded', upload: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// get user's uploads
router.get('/', auth, async (req, res) => {
  try {
    const uploads = await Upload.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ uploads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// get a single upload by id
router.get('/:id', auth, async (req, res) => {
  try {
    const u = await Upload.findById(req.params.id);
    if (!u) return res.status(404).json({ msg: 'Not found' });
    res.json({ upload: u });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
