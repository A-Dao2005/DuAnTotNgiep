const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  maSP: String,
  tenSanPham: String,
  giaSanPham: String,
  phanLoai: String,
  image: String
});

module.exports = mongoose.model('Product', productSchema);
