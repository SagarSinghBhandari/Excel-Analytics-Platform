const mongoose = require('mongoose');
const UploadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  originalName: String,
  parsed: { type: Object }, // parsed JSON from Excel
  headers: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Upload', UploadSchema);
