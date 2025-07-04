const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

// Kết nối MongoDB
mongoose.connect('mongodb+srv://minhnhat19040909:Adao2005@cluster0.qivv2hr.mongodb.net/domiMart')
  .then(() => console.log('✅ Đã kết nối MongoDB'))
  .catch(err => console.error('❌ MongoDB lỗi:', err));

// Dữ liệu danh mục mẫu
const categories = [
  { key: 'hot', label: 'Nổi bật' },
  { key: 'knife', label: 'Dao kéo' },
  { key: 'pan', label: 'Chảo' },
  { key: 'pot', label: 'Nồi' },
  { key: 'utensil', label: 'Dụng cụ' },
  { key: 'storage', label: 'Đồ đựng' },
  { key: 'small', label: 'Đồ nhỏ' },
  { key: 'bake', label: 'Đồ nướng' }
];

// Dữ liệu sản phẩm mẫu
const products = [
  {
    maSP: 'SP001',
    tenSanPham: 'Chảo chống dính Tefal',
    giaSanPham: '299000',
    priceOld: '399000',
    sold: 150,
    isSale: 25,
    isFavorite: true,
    shop: 'DomiMart',
    phanLoai: 'pan',
    image: 'https://via.placeholder.com/300x300?text=Chảo+Tefal'
  },
  {
    maSP: 'SP002',
    tenSanPham: 'Nồi cơm điện Sharp',
    giaSanPham: '899000',
    priceOld: '999000',
    sold: 89,
    isSale: 10,
    isFavorite: false,
    shop: 'DomiMart',
    phanLoai: 'pot',
    image: 'https://via.placeholder.com/300x300?text=Nồi+Cơm+Sharp'
  },
  {
    maSP: 'SP003',
    tenSanPham: 'Dao bếp cao cấp',
    giaSanPham: '199000',
    priceOld: '250000',
    sold: 234,
    isSale: 20,
    isFavorite: true,
    shop: 'DomiMart',
    phanLoai: 'knife',
    image: 'https://via.placeholder.com/300x300?text=Dao+Bếp'
  },
  {
    maSP: 'SP004',
    tenSanPham: 'Bộ dụng cụ nấu ăn',
    giaSanPham: '450000',
    priceOld: '600000',
    sold: 67,
    isSale: 25,
    isFavorite: false,
    shop: 'DomiMart',
    phanLoai: 'utensil',
    image: 'https://via.placeholder.com/300x300?text=Bộ+Dụng+Cụ'
  },
  {
    maSP: 'SP005',
    tenSanPham: 'Hộp đựng thực phẩm',
    giaSanPham: '120000',
    priceOld: '150000',
    sold: 189,
    isSale: 20,
    isFavorite: true,
    shop: 'DomiMart',
    phanLoai: 'storage',
    image: 'https://via.placeholder.com/300x300?text=Hộp+Đựng'
  },
  {
    maSP: 'SP006',
    tenSanPham: 'Khuôn bánh cupcake',
    giaSanPham: '89000',
    priceOld: '120000',
    sold: 145,
    isSale: 26,
    isFavorite: false,
    shop: 'DomiMart',
    phanLoai: 'bake',
    image: 'https://via.placeholder.com/300x300?text=Khuôn+Bánh'
  }
];

async function seedData() {
  try {
    // Xóa dữ liệu cũ
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️ Đã xóa dữ liệu cũ');

    // Thêm danh mục
    const savedCategories = await Category.insertMany(categories);
    console.log(`✅ Đã thêm ${savedCategories.length} danh mục`);

    // Thêm sản phẩm
    const savedProducts = await Product.insertMany(products);
    console.log(`✅ Đã thêm ${savedProducts.length} sản phẩm`);

    console.log('🎉 Hoàn thành thêm dữ liệu mẫu!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi thêm dữ liệu:', error);
    process.exit(1);
  }
}

seedData(); 