const mongoose = require('mongoose');

const CATEGORY_KEYS = ['hot', 'knife', 'pan', 'pot', 'utensil', 'storage', 'small', 'bake'];

const productSchema = new mongoose.Schema({
  maSP: {
    type: String,
    required: true,
    unique: true
  },
  tenSanPham: {
    type: String,
    required: true
  },
  giaSanPham: {
    type: String,
    required: true
  },
  priceOld: {
    type: String,
    default: ''
  },
  sold: { 
    type: Number, 
    default: 0 
  },
  isSale: { 
    type: Number, 
    default: 0 
  },
  isFavorite: { 
    type: Boolean, 
    default: false 
  },
  shop: { 
    type: String, 
    default: 'DomiMart' 
  },
  phanLoai: { 
    type: String, 
    enum: CATEGORY_KEYS, 
    required: true 
  },
  image: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Index để tìm kiếm nhanh hơn
productSchema.index({ tenSanPham: 'text' });
productSchema.index({ phanLoai: 1 });

module.exports = mongoose.model('Product', productSchema);
