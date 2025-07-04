import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const userName = 'Nguyen Van A';

const categories = [
  { key: 'hot', label: 'Nổi bật' },
  { key: 'knife', label: 'Dao kéo' },
  { key: 'pan', label: 'Chảo bếp' },
  { key: 'pot', label: 'Nồi nấu' },
  { key: 'utensil', label: 'Dụng cụ' },
  { key: 'storage', label: 'Lưu trữ' },
  { key: 'small', label: 'Đồ nhỏ' },
  { key: 'bake', label: 'Làm bánh' },
];

const productsByCategory = {
  hot: [
    { id: '1', name: 'Bộ dao kéo cao cấp', price: '225,000 VND', priceOld: '300,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 1200, isSale: 25, isFavorite: true, shop: 'DomiMart' },
    { id: '2', name: 'Bộ dụng cụ 5 món', price: '180,000 VND', priceOld: '220,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 800, isSale: 18, isFavorite: false, shop: 'DomiMart' },
    { id: '3', name: 'Chảo chống dính đáy từ', price: '350,000 VND', priceOld: '400,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 2100, isSale: 13, isFavorite: true, shop: 'DomiMart' },
    { id: '4', name: 'Nồi áp suất điện', price: '1,200,000 VND', priceOld: '1,500,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 350, isSale: 20, isFavorite: false, shop: 'DomiMart' },
  ],
  knife: [
    { id: '5', name: 'Bộ dao kéo Nhật', price: '320,000 VND', priceOld: '400,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 950, isSale: 20, isFavorite: true, shop: 'DomiMart' },
    { id: '6', name: 'Dao thái đa năng', price: '120,000 VND', priceOld: '150,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 600, isSale: 20, isFavorite: false, shop: 'DomiMart' },
    { id: '7', name: 'Dao bào rau củ', price: '85,000 VND', priceOld: '100,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 120, isSale: 15, isFavorite: false, shop: 'DomiMart' },
    { id: '8', name: 'Kéo cắt thực phẩm', price: '95,000 VND', priceOld: '120,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 300, isSale: 21, isFavorite: false, shop: 'DomiMart' },
    { id: '9', name: 'Dao gọt trái cây', price: '65,000 VND', priceOld: '80,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 150, isSale: 19, isFavorite: false, shop: 'DomiMart' },
    { id: '10', name: 'Bộ dao 6 món', price: '450,000 VND', priceOld: '500,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 400, isSale: 10, isFavorite: true, shop: 'DomiMart' },
  ],
  pan: [
    { id: '11', name: 'Chảo chống dính', price: '250,000 VND', priceOld: '300,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 500, isSale: 17, isFavorite: false, shop: 'DomiMart' },
    { id: '12', name: 'Bộ nồi chảo bếp', price: '500,000 VND', priceOld: '600,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 300, isSale: 17, isFavorite: true, shop: 'DomiMart' },
    { id: '13', name: 'Chảo wok đáy tròn', price: '180,000 VND', priceOld: '220,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 200, isSale: 18, isFavorite: false, shop: 'DomiMart' },
    { id: '14', name: 'Chảo nướng bánh', price: '120,000 VND', priceOld: '150,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 180, isSale: 20, isFavorite: false, shop: 'DomiMart' },
    { id: '15', name: 'Chảo đáy từ', price: '280,000 VND', priceOld: '320,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 150, isSale: 13, isFavorite: true, shop: 'DomiMart' },
    { id: '16', name: 'Chảo gang nướng', price: '350,000 VND', priceOld: '400,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 120, isSale: 12, isFavorite: false, shop: 'DomiMart' },
  ],
  pot: [
    { id: '17', name: 'Nồi nấu canh', price: '200,000 VND', priceOld: '250,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 220, isSale: 20, isFavorite: false, shop: 'DomiMart' },
    { id: '18', name: 'Nồi áp suất', price: '400,000 VND', priceOld: '500,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 180, isSale: 20, isFavorite: true, shop: 'DomiMart' },
    { id: '19', name: 'Nồi cơm điện', price: '800,000 VND', priceOld: '900,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 300, isSale: 11, isFavorite: false, shop: 'DomiMart' },
    { id: '20', name: 'Nồi hầm xương', price: '300,000 VND', priceOld: '350,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 100, isSale: 14, isFavorite: false, shop: 'DomiMart' },
    { id: '21', name: 'Nồi luộc rau', price: '150,000 VND', priceOld: '180,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 90, isSale: 17, isFavorite: false, shop: 'DomiMart' },
    { id: '22', name: 'Nồi nấu phở', price: '250,000 VND', priceOld: '300,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 60, isSale: 17, isFavorite: true, shop: 'DomiMart' },
  ],
  utensil: [
    { id: '23', name: 'Muỗng gỗ', price: '45,000 VND', priceOld: '55,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 80, isSale: 18, isFavorite: false, shop: 'DomiMart' },
    { id: '24', name: 'Đũa nấu ăn', price: '35,000 VND', priceOld: '45,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 120, isSale: 22, isFavorite: false, shop: 'DomiMart' },
    { id: '25', name: 'Thìa đong', price: '25,000 VND', priceOld: '30,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 60, isSale: 17, isFavorite: false, shop: 'DomiMart' },
    { id: '26', name: 'Rây lọc bột', price: '55,000 VND', priceOld: '65,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 40, isSale: 15, isFavorite: false, shop: 'DomiMart' },
    { id: '27', name: 'Kẹp gắp thức ăn', price: '40,000 VND', priceOld: '50,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 30, isSale: 20, isFavorite: false, shop: 'DomiMart' },
    { id: '28', name: 'Bàn chải rửa chảo', price: '30,000 VND', priceOld: '35,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 20, isSale: 14, isFavorite: false, shop: 'DomiMart' },
  ],
  storage: [
    { id: '29', name: 'Hộp đựng gia vị', price: '120,000 VND', priceOld: '150,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 60, isSale: 20, isFavorite: false, shop: 'DomiMart' },
    { id: '30', name: 'Tủ đựng đồ bếp', price: '800,000 VND', priceOld: '900,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 30, isSale: 11, isFavorite: false, shop: 'DomiMart' },
    { id: '31', name: 'Giá treo dao', price: '150,000 VND', priceOld: '180,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 40, isSale: 17, isFavorite: false, shop: 'DomiMart' },
    { id: '32', name: 'Kệ đựng gia vị', price: '200,000 VND', priceOld: '250,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 20, isSale: 20, isFavorite: false, shop: 'DomiMart' },
    { id: '33', name: 'Hộp đựng thực phẩm', price: '180,000 VND', priceOld: '200,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 10, isSale: 10, isFavorite: false, shop: 'DomiMart' },
    { id: '34', name: 'Tủ lạnh mini', price: '2,500,000 VND', priceOld: '2,800,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 5, isSale: 11, isFavorite: true, shop: 'DomiMart' },
  ],
  small: [
    { id: '35', name: 'Máy xay sinh tố', price: '350,000 VND', priceOld: '400,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 80, isSale: 13, isFavorite: false, shop: 'DomiMart' },
    { id: '36', name: 'Máy ép trái cây', price: '450,000 VND', priceOld: '500,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 60, isSale: 10, isFavorite: false, shop: 'DomiMart' },
    { id: '37', name: 'Máy đánh trứng', price: '120,000 VND', priceOld: '150,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 40, isSale: 20, isFavorite: false, shop: 'DomiMart' },
    { id: '38', name: 'Máy xay thịt', price: '280,000 VND', priceOld: '320,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 30, isSale: 13, isFavorite: false, shop: 'DomiMart' },
    { id: '39', name: 'Máy pha cà phê', price: '600,000 VND', priceOld: '700,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 20, isSale: 14, isFavorite: false, shop: 'DomiMart' },
    { id: '40', name: 'Lò vi sóng', price: '1,800,000 VND', priceOld: '2,000,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 10, isSale: 10, isFavorite: true, shop: 'DomiMart' },
  ],
  bake: [
    { id: '41', name: 'Khuôn bánh tròn', price: '85,000 VND', priceOld: '100,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 30, isSale: 15, isFavorite: false, shop: 'DomiMart' },
    { id: '42', name: 'Khuôn bánh vuông', price: '95,000 VND', priceOld: '120,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 20, isSale: 21, isFavorite: false, shop: 'DomiMart' },
    { id: '43', name: 'Máy đánh kem', price: '180,000 VND', priceOld: '200,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 10, isSale: 10, isFavorite: false, shop: 'DomiMart' },
    { id: '44', name: 'Lò nướng bánh', price: '1,200,000 VND', priceOld: '1,400,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 5, isSale: 14, isFavorite: true, shop: 'DomiMart' },
    { id: '45', name: 'Bàn xoay bánh', price: '120,000 VND', priceOld: '150,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 8, isSale: 20, isFavorite: false, shop: 'DomiMart' },
    { id: '46', name: 'Túi bắt kem', price: '45,000 VND', priceOld: '60,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 12, isSale: 25, isFavorite: false, shop: 'DomiMart' },
  ],
};

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 6;
const CARD_HORIZONTAL_PADDING = 8; // paddingHorizontal của FlatList
const CARD_WIDTH = (screenWidth - CARD_HORIZONTAL_PADDING * 2 - CARD_MARGIN * 2) / 2; // cho lưới 2 cột
const CARD_WIDTH_HORIZONTAL = 0.38 * screenWidth; // cho FlatList ngang, tối đa 2.5 card trên màn hình

// Hàm chính cho màn hình trang chủ
function HomeMainScreen(props) {
  // Nhận các props từ cha (navigation, sự kiện, giỏ hàng...)
  const {
    onProductPress,
    onCartPress,
    cart = [],
    onProfilePress,
    onSearch,
    onNotification,
    onSeeMore,
  } = props;

  // State lưu danh mục đang chọn
  const [selectedCategory, setSelectedCategory] = useState('hot');

  // State lưu sản phẩm động từ backend
  const [allProducts, setAllProducts] = useState([]);

  // Fetch sản phẩm từ backend khi load trang
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.2.4:5000/api/Products'); // Đổi thành IP LAN nếu chạy trên thiết bị thật
        const data = await response.json();
        setAllProducts(
          data.map(item => ({
            id: item._id,
            name: item.tenSanPham,
            price: item.giaSanPham,
            priceOld: item.priceOld,
            img: item.img || item.image,
            sold: item.sold,
            isSale: item.isSale,
            isFavorite: item.isFavorite,
            shop: item.shop,
            phanLoai: item.phanLoai,
          }))
        );
      } catch (error) {
        console.error('Lỗi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
  }, []);

  // Render 1 sản phẩm cho phần "Mọi người đều thích!"
  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => onProductPress && onProductPress({ ...item, description: 'Sản phẩm chất lượng cao, an toàn cho sức khỏe gia đình.', rating: 4 })}>
      <View style={styles.categoryProductCardHorizontal}>
        {/* Nhãn SALE góc phải */}
        {item.isSale && (
          <View style={styles.saleTag}>
            <Text style={styles.saleTagText}>-{item.isSale}%</Text>
          </View>
        )}
        {/* Nhãn yêu thích góc trái */}
        {item.isFavorite && (
          <View style={styles.favoriteTag}>
            <Text style={styles.favoriteTagText}>Yêu thích</Text>
          </View>
        )}
        <Image source={{ uri: item.img }} style={styles.categoryProductImg} />
        <Text style={styles.categoryProductName} numberOfLines={2}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <Text style={styles.categoryProductPrice}>{item.price}</Text>
          {item.priceOld && (
            <Text style={styles.oldPrice}>{item.priceOld}</Text>
          )}
        </View>
        <Text style={styles.soldText}>Đã bán {item.sold >= 1000 ? (item.sold/1000).toFixed(1) + 'k' : item.sold}</Text>
        <Text style={styles.shopText}>{item.shop}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render 1 sản phẩm cho phần sản phẩm theo danh mục (dạng lưới 2 cột)
  const renderCategoryProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => onProductPress && onProductPress({ ...item, description: 'Sản phẩm chất lượng cao, an toàn cho sức khỏe gia đình.', rating: 4 })}>
      <View style={styles.categoryProductCard}>
        {/* Nhãn SALE góc phải */}
        {item.isSale && (
          <View style={styles.saleTag}>
            <Text style={styles.saleTagText}>-{item.isSale}%</Text>
          </View>
        )}
        {/* Nhãn yêu thích góc trái */}
        {item.isFavorite && (
          <View style={styles.favoriteTag}>
            <Text style={styles.favoriteTagText}>Yêu thích</Text>
          </View>
        )}
        <Image source={{ uri: item.img }} style={styles.categoryProductImg} />
        <Text style={styles.categoryProductName} numberOfLines={2}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <Text style={styles.categoryProductPrice}>{item.price}</Text>
          {item.priceOld && (
            <Text style={styles.oldPrice}>{item.priceOld}</Text>
          )}
        </View>
        <Text style={styles.soldText}>Đã bán {item.sold >= 1000 ? (item.sold/1000).toFixed(1) + 'k' : item.sold}</Text>
        <Text style={styles.shopText}>{item.shop}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render 1 nút danh mục
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryBtn, selectedCategory === item.key && { backgroundColor: '#E53935' }]}
      onPress={() => setSelectedCategory(item.key)}
    >
      <Text style={[styles.categoryBtnText, selectedCategory === item.key && { color: '#fff' }]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  // Header cho FlatList: gồm banner, sản phẩm nổi bật, danh mục
  const renderMainHeader = () => (
    <>
      {/* ----------- BANNER ----------- */}
      <View style={{ width: '110%', height: 160, alignSelf: 'center', marginBottom: 10 }}>
        <Swiper autoplay showsPagination height={160} dotColor="#fff" activeDotColor="#E53935">
          {/* Các ảnh banner quảng cáo */}
          <Image source={{ uri: 'https://giadungviet888.rf.gd/wp-content/uploads/2024/03/mau-banner-quang-cao-dien-may_033707028-1400x575.jpg' }} style={styles.banner} resizeMode="cover" />
          <Image source={{ uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482593bjo/anh-mo-ta.png' }} style={styles.banner} resizeMode="cover" />
          <Image source={{ uri: 'https://giadungviet888.rf.gd/wp-content/uploads/2024/03/mau-banner-quang-cao-dien-may_033707028-1400x575.jpg' }} style={styles.banner} resizeMode="cover" />
        </Swiper>
      </View>
      {/* ----------- SẢN PHẨM NỔI BẬT ----------- */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Mọi người đều thích!</Text>
        {/* Nút xem thêm sản phẩm nổi bật */}
        <TouchableOpacity onPress={() => onSeeMore && onSeeMore(productsByCategory.hot)}>
          <Text style={styles.seeMore}>Xem thêm {'>'}</Text>
        </TouchableOpacity>
      </View>
      {/* Danh sách sản phẩm nổi bật cuộn ngang */}
      <FlatList
        data={productsByCategory.hot}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
      {/* ----------- DANH MỤC ----------- */}
      <Text style={styles.sectionTitle}>Danh mục</Text>
      <View style={styles.searchRow}>
        {/* Ô tìm kiếm (chỉ để trang trí, không nhập được) */}
        <TouchableOpacity style={{ flex: 1 }} onPress={onSearch}>
          <TextInput style={styles.searchInput} placeholder="Tìm kiếm..." placeholderTextColor="#888" editable={false} pointerEvents="none" />
        </TouchableOpacity>
      </View>
      {/* Danh sách các nút danh mục cuộn ngang */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
      {/* ----------- SẢN PHẨM THEO DANH MỤC ----------- */}
      <Text style={styles.sectionTitle}>{categories.find(cat => cat.key === selectedCategory)?.label}</Text>
    </>
  );

  return (
    <View style={styles.container}>
      {/* ----------- HEADER ----------- */}
      <View style={styles.header}>
        {/* Logo ứng dụng */}
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        {/* Thông tin người dùng */}
        <View style={styles.userInfo}>
          <Text style={styles.hello}>Xin chào,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        {/* Avatar, bấm vào để vào trang cá nhân */}
        <TouchableOpacity onPress={onProfilePress}>
          <Image source={{ uri: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      {/* FlatList chính cho sản phẩm theo danh mục */}
      <FlatList
        data={allProducts}
        renderItem={renderCategoryProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoryProductsList}
        columnWrapperStyle={styles.categoryProductsRow}
        ListHeaderComponent={renderMainHeader}
      />
      {/* ----------- TAB BAR ----------- */}
      <View style={styles.tabBar}>
        {/* Nút Home */}
        <TouchableOpacity style={styles.tabBtn}><Ionicons name="home" size={28} color="#000" /></TouchableOpacity>
        {/* Nút Giỏ hàng, có badge số lượng */}
        <TouchableOpacity style={styles.tabBtn} onPress={onCartPress}>
          <MaterialIcons name="shopping-cart" size={28} color="#000" />
          {cart.length > 0 && (
            <View style={{ position: 'absolute', top: 2, right: 18, backgroundColor: 'red', borderRadius: 8, paddingHorizontal: 5 }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</Text>
            </View>
          )}
        </TouchableOpacity>
        {/* Nút Thông báo */}
        <TouchableOpacity style={styles.tabBtn} onPress={onNotification}>
          <Ionicons name="notifications" size={28} color="#000" />
        </TouchableOpacity>
        {/* Nút Cá nhân */}
        <TouchableOpacity style={styles.tabBtn} onPress={onProfilePress}>
          <FontAwesome name="user" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ----------- STYLE CHO TOÀN BỘ MÀN HÌNH ----------- //
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC' }, // Nền vàng nhạt
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  logo: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  userInfo: { flex: 1 },
  hello: { fontSize: 14, color: '#888' },
  userName: { fontWeight: 'bold', fontSize: 18, color: '#222' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 8 },
  banner: { width: '100%', height: 160, borderRadius: 12 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, marginBottom: 8, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginHorizontal: 16, marginBottom: 8 },
  seeMore: { color: '#E53935', fontSize: 14 },
  productsList: { paddingHorizontal: CARD_HORIZONTAL_PADDING, paddingBottom: 16 },
  productCard: { backgroundColor: '#fff', borderRadius: 12, padding: 10, alignItems: 'center', width: 140, marginRight: 12, elevation: 2 },
  productImg: { width: 100, height: 80, borderRadius: 8, marginBottom: 8 },
  productName: { fontWeight: 'bold', fontSize: 13, color: '#222', marginBottom: 4, textAlign: 'center' },
  productPrice: { color: '#E53935', fontWeight: 'bold', fontSize: 14 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 10 },
  searchInput: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8, fontSize: 15, flex: 1, borderWidth: 1, borderColor: '#eee' },
  categoryList: { paddingHorizontal: 16, paddingBottom: 16 },
  categoryBtn: { backgroundColor: '#fff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 18, marginRight: 8, borderWidth: 1, borderColor: '#E53935' },
  categoryBtnText: { color: '#E53935', fontWeight: 'bold', fontSize: 14 },
  categoryProductsList: { paddingHorizontal: 8, paddingBottom: 16 },
  categoryProductsRow: { justifyContent: 'space-between', marginBottom: 8 },
  categoryProductCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    width: CARD_WIDTH, // responsive cho lưới 2 cột
    marginBottom: 16,
    elevation: 2,
    marginHorizontal: CARD_MARGIN,
  },
  categoryProductCardHorizontal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    width: CARD_WIDTH_HORIZONTAL, // responsive cho FlatList ngang
    marginBottom: 16,
    elevation: 2,
    marginHorizontal: CARD_MARGIN,
  },
  categoryProductImg: {
    width: '90%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  categoryProductName: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryProductPrice: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee', elevation: 8 },
  tabBtn: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  saleTag: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FF5252',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  saleTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#FF9800',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  favoriteTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  oldPrice: {
    color: '#888',
    fontSize: 13,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  soldText: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
  },
  shopText: {
    color: '#1976D2',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 2,
  },
});

export { productsByCategory };
export default HomeMainScreen;
