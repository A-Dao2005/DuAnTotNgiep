const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Bắt đầu test API...\n');

  try {
    // Test 1: Kiểm tra server
    console.log('1️⃣ Test server connection...');
    const testResponse = await axios.get(`${BASE_URL}/test`);
    console.log('✅ Server OK:', testResponse.data);
    console.log('');

    // Test 2: Lấy danh sách sản phẩm
    console.log('2️⃣ Test lấy danh sách sản phẩm...');
    const productsResponse = await axios.get(`${BASE_URL}/products`);
    console.log(`✅ Lấy được ${productsResponse.data.length} sản phẩm`);
    if (productsResponse.data.length > 0) {
      console.log('📦 Sản phẩm đầu tiên:', productsResponse.data[0].tenSanPham);
    }
    console.log('');

    // Test 3: Lấy danh sách danh mục
    console.log('3️⃣ Test lấy danh sách danh mục...');
    const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
    console.log(`✅ Lấy được ${categoriesResponse.data.length} danh mục`);
    if (categoriesResponse.data.length > 0) {
      console.log('📂 Danh mục:', categoriesResponse.data.map(c => c.label).join(', '));
    }
    console.log('');

    // Test 4: Tìm kiếm sản phẩm
    console.log('4️⃣ Test tìm kiếm sản phẩm...');
    const searchResponse = await axios.get(`${BASE_URL}/products/search?query=chảo`);
    console.log(`✅ Tìm thấy ${searchResponse.data.length} sản phẩm cho từ khóa "chảo"`);
    console.log('');

    // Test 5: Lấy sản phẩm theo danh mục
    console.log('5️⃣ Test lấy sản phẩm theo danh mục...');
    const categoryResponse = await axios.get(`${BASE_URL}/products/category/pan`);
    console.log(`✅ Lấy được ${categoryResponse.data.length} sản phẩm cho danh mục "pan"`);
    console.log('');

    console.log('🎉 Tất cả test đều thành công!');

  } catch (error) {
    console.error('❌ Lỗi test API:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Hãy đảm bảo server đang chạy: npm start');
    }
  }
}

testAPI(); 