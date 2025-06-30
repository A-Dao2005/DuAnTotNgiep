const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.addCategory = async (req, res) => {
  const { key, label } = req.body;
  const exists = await Category.findOne({ key });
  if (exists) return res.status(400).json({ message: 'Key đã tồn tại' });
  const newCat = new Category({ key, label });
  await newCat.save();
  res.status(201).json(newCat);
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { key, label } = req.body;
  const updated = await Category.findByIdAndUpdate(id, { key, label }, { new: true });
  res.json(updated);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.json({ success: true });
}; 