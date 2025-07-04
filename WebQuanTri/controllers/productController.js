const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log(`📦 Lấy được ${products.length} sản phẩm`);
    res.json(products);
  } catch (error) {
    console.error('❌ Lỗi khi lấy sản phẩm:', error);
    res.status(500).json({ error: 'Lỗi server khi lấy sản phẩm' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    console.log('✅ Đã thêm sản phẩm:', saved.tenSanPham);
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Lỗi khi thêm sản phẩm:', error);
    res.status(400).json({ error: 'Lỗi khi thêm sản phẩm', details: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }
    console.log('✅ Đã cập nhật sản phẩm:', updated.tenSanPham);
    res.json(updated);
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật sản phẩm:', error);
    res.status(400).json({ error: 'Lỗi khi cập nhật sản phẩm' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }
    console.log('✅ Đã xóa sản phẩm:', deleted.tenSanPham);
    res.json({ success: true, message: 'Đã xóa sản phẩm thành công' });
  } catch (error) {
    console.error('❌ Lỗi khi xóa sản phẩm:', error);
    res.status(400).json({ error: 'Lỗi khi xóa sản phẩm' });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);
    
    // Tìm kiếm không phân biệt hoa thường theo tên sản phẩm
    const products = await Product.find({
      tenSanPham: { $regex: query, $options: 'i' }
    });
    console.log(`🔍 Tìm thấy ${products.length} sản phẩm cho từ khóa: ${query}`);
    res.json(products);
  } catch (error) {
    console.error('❌ Lỗi khi tìm kiếm sản phẩm:', error);
    res.status(500).json({ error: 'Lỗi server khi tìm kiếm' });
  }
};

// API để lấy sản phẩm theo danh mục
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ phanLoai: category });
    console.log(`📂 Lấy được ${products.length} sản phẩm cho danh mục: ${category}`);
    res.json(products);
  } catch (error) {
    console.error('❌ Lỗi khi lấy sản phẩm theo danh mục:', error);
    res.status(500).json({ error: 'Lỗi server khi lấy sản phẩm theo danh mục' });
  }
};
