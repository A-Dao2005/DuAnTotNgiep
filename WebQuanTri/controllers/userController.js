const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Đăng ký user mới
const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy user' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.matKhau);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Mật khẩu cũ không đúng' });
    }
    // Không cho phép mật khẩu mới trùng mật khẩu cũ
    if (oldPassword === newPassword) {
      return res.status(400).json({ success: false, message: 'Mật khẩu mới không được trùng với mật khẩu cũ' });
    }
    user.matKhau = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};
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
// ... existing code ...
// ... existing code ...
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
    // Thêm tạo token và trả về
    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1d' });
    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        id: user._id,
        hoTen: user.hoTen,
        email: user.email,
        soDienThoai: user.soDienThoai,
        ngayDangKy: user.ngayDangKy,
        diaChi: user.diaChi || '',
        avatar: user.avatar || 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg'
      },
      token // Trả về token cho client
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};
// ... existing code ...
// ... existing code ...
  
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
// Cập nhật thông tin user
const updateUserInfo = async (req, res) => {
  try {
    const { id, hoTen, email, soDienThoai, diaChi, avatar } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy user' });
    }
    user.hoTen = hoTen || user.hoTen;
    user.email = email || user.email;
    user.soDienThoai = soDienThoai || user.soDienThoai;
    user.diaChi = diaChi || user.diaChi;
    user.avatar = avatar || user.avatar;
    await user.save();
    res.json({
      success: true,
      message: 'Cập nhật thành công',
      user: {
        id: user._id,
        hoTen: user.hoTen,
        email: user.email,
        soDienThoai: user.soDienThoai,
        diaChi: user.diaChi,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  deleteUser,
  loginUser,
  updateUserInfo ,
  changePassword 
};