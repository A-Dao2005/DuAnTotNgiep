const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Đăng ký user mới

const registerUser = async (req, res) => {
  try {
    const { hoTen, email, soDienThoai, matKhau } = req.body;

    // Kiểm tra email đã tồn tại
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email đã được sử dụng' 
      });
    }

    // Kiểm tra số điện thoại đã tồn tại
    const existingPhone = await User.findOne({ soDienThoai });
    if (existingPhone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Số điện thoại đã được sử dụng' 
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(matKhau, 10);

    // Tạo user mới
    const newUser = new User({
      hoTen,
      email,
      soDienThoai,
      matKhau: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      user: {
        id: newUser._id,
        hoTen: newUser.hoTen,
        email: newUser.email,
        soDienThoai: newUser.soDienThoai,
        ngayDangKy: newUser.ngayDangKy
      }
    });

  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};
const loginUser = async (req, res) => {
    try {
      const { email, matKhau } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Email không tồn tại' });
      }
      const isMatch = await bcrypt.compare(matKhau, user.matKhau);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Mật khẩu không đúng' });
      }
      // Nếu muốn trả về token:
      // const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1d' });
      res.json({
        success: true,
        message: 'Đăng nhập thành công',
        user: {
          id: user._id,
          hoTen: user.hoTen,
          email: user.email,
          soDienThoai: user.soDienThoai,
          ngayDangKy: user.ngayDangKy
        }
        // , token
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  };
  
// Lấy danh sách tất cả users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-matKhau').sort({ ngayDangKy: -1 });
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách users:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};

// Xóa user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy user'
      });
    }

    res.json({
      success: true,
      message: 'Xóa user thành công'
    });
  } catch (error) {
    console.error('Lỗi xóa user:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server, vui lòng thử lại sau'
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  deleteUser,
  loginUser
};