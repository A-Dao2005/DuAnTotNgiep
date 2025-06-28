const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect('mongodb+srv://minhnhat19040909:Adao2005@cluster0.qivv2hr.mongodb.net/domiMart')
  .then(() => console.log('✅ Đã kết nối MongoDB'))
  .catch(err => console.error('❌ MongoDB lỗi:', err));

// API route
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// Public folder (HTML + CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Khởi động server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
