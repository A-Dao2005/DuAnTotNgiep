const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, deleteUser, loginUser } = require('../controllers/userController');
// Đăng ký user mới
router.post('/register', registerUser);

// Lấy danh sách tất cả users
router.get('/', getAllUsers);

// Xóa user
router.delete('/:id', deleteUser);
// ... existing code ...
router.post('/login', loginUser);
module.exports = router;