const mongoose = require('mongoose');

const CATEGORY_KEYS = ['hot', 'knife', 'pan', 'pot', 'utensil', 'storage', 'small', 'bake'];

const productSchema = new mongoose.Schema({
  maSP: String,
  tenSanPham: String,
  giaSanPham: String,
  priceOld: String,
  sold: { type: Number, default: 0 },
  isSale: { type: Number, default: 0 },
  isFavorite: { type: Boolean, default: false },
  shop: { type: String, default: 'DomiMart' },
  phanLoai: { type: String, enum: CATEGORY_KEYS, required: true },
  image: String,
  img: String
});

module.exports = mongoose.model('Product', productSchema);
