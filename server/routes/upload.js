const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const pdf = require('pdf-parse');
const Expense = require('../models/Expense');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const file = req.file;
    const ext = path.extname(file.originalname).toLowerCase();
    let fileType = ext === '.pdf' ? 'pdf' : 'image';
    let extractedText = '';

    if (fileType === 'image') {
      const { data: { text } } = await Tesseract.recognize(file.path, 'eng');
      extractedText = text;
    } else {
      const buffer = fs.readFileSync(file.path);
      const data = await pdf(buffer);
      extractedText = data.text;
    }

    // TODO: parse amount/date from text or leave for next feature
    const expense = new Expense({
      userId,
      filename: file.filename,
      fileType,
      extractedText,
    });
    await expense.save();

    // Clean up file
    fs.unlinkSync(file.path);

    res.json({ success: true, expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
