const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  label: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema); 