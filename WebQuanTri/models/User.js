const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  hoTen: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  soDienThoai: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  matKhau: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg'
  },
  currentSessionToken: {
    type: String,
    default: null
  },
  lastLoginAt: {
    type: Date,
    default: null
  },
  ngayDangKy: {
    type: Date,
    default: Date.now
  },
  trangThai: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);