const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ success: true });
};

exports.searchProducts = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);
  // Tìm kiếm không phân biệt hoa thường theo tên sản phẩm
  const products = await Product.find({
    tenSanPham: { $regex: query, $options: 'i' }
  });
  res.json(products);
};
