import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const userName = 'Nguyen Van A';

const categories = [
  { key: 'hot', label: 'Nổi bật' },
  { key: 'knife', label: 'dao kéo' },
  { key: 'pan', label: 'chảo bếp' },
];

const productsByCategory = {
  hot: [
    { name: 'Bộ dao kéo cao cấp', price: '225,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
    { name: 'Bộ dụng cụ 5 món', price: '180,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  ],
  knife: [
    { name: 'Bộ dao kéo Nhật', price: '320,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
    { name: 'Dao thái đa năng', price: '120,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  ],
  pan: [
    { name: 'Chảo chống dính', price: '250,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
    { name: 'Bộ nồi chảo bếp', price: '500,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  ],
};

function HomeMainScreen(props) {
  const {
    onProductPress,
    onCartPress,
    cart = [],
    onProfilePress,
    onSearch,
    onNotification,
    onSeeMore,
  } = props;

  const [selectedCategory, setSelectedCategory] = useState('hot');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/images/icon.png')} style={styles.logo} />
        <View style={styles.userInfo}>
          <Text style={styles.hello}>Xin chào,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity onPress={onProfilePress}>
          <Image source={{ uri: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={{ width: '110%', height: 160, alignSelf: 'center', marginBottom: 10 }}>
          <Swiper autoplay showsPagination height={160} dotColor="#fff" activeDotColor="#E53935">
            <Image source={{ uri: 'https://cdn.s99.vn/ss1/prod/product/95b1b140ca950aad3360029548ed3f66.jpg' }} style={styles.banner} resizeMode="cover" />
            <Image source={{ uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482593bjo/anh-mo-ta.png' }} style={styles.banner} resizeMode="cover" />
            <Image source={{ uri: 'https://giadungviet888.rf.gd/wp-content/uploads/2024/03/mau-banner-quang-cao-dien-may_033707028-1400x575.jpg' }} style={styles.banner} resizeMode="cover" />
          </Swiper>
        </View>

        {/* Sản phẩm nổi bật */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Mọi người đều thích!</Text>
          <TouchableOpacity onPress={() => onSeeMore && onSeeMore([
            { name: 'Bộ dao kéo cao cấp', price: '225,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', description: 'Bộ dao kéo cao cấp, chất liệu bền đẹp, an toàn cho sức khỏe.', rating: 5 },
            { name: 'Bộ dụng cụ 5 món', price: '180,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', description: 'Bộ dụng cụ 5 món tiện lợi cho căn bếp của bạn.', rating: 4 }
          ])}>
            <Text style={styles.seeMore}>Xem thêm {'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsRow}>
          {productsByCategory.hot.map((prod, idx) => (
            <TouchableOpacity key={idx} onPress={() => onProductPress && onProductPress({ ...prod, description: 'Mô tả sản phẩm nổi bật', rating: 4 })}>
              <View style={styles.productCard}>
                <Image source={{ uri: prod.img }} style={styles.productImg} />
                <Text style={styles.productName}>{prod.name}</Text>
                <Text style={styles.productPrice}>{prod.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Danh mục */}
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <View style={styles.searchRow}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onSearch}>
            <TextInput style={styles.searchInput} placeholder="Tìm kiếm..." placeholderTextColor="#888" editable={false} pointerEvents="none" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[styles.categoryBtn, selectedCategory === cat.key && { backgroundColor: '#E53935' }]}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Text style={[styles.categoryBtnText, selectedCategory === cat.key && { color: '#fff' }]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sản phẩm danh mục */}
        <View style={styles.productsRow}>
          {productsByCategory[selectedCategory].map((prod, idx) => (
            <TouchableOpacity key={idx} onPress={() => onProductPress && onProductPress({ ...prod, description: 'Giá úp chén đĩa từ nhựa nguyên sinh', rating: 4 })}>
              <View style={styles.productCard}>
                <Image source={{ uri: prod.img }} style={styles.productImg} />
                <Text style={styles.productName}>{prod.name}</Text>
                <Text style={styles.productPrice}>{prod.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn}><Ionicons name="home" size={28} color="#000" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={onCartPress}>
          <MaterialIcons name="shopping-cart" size={28} color="#000" />
          {cart.length > 0 && (
            <View style={{ position: 'absolute', top: 2, right: 18, backgroundColor: 'red', borderRadius: 8, paddingHorizontal: 5 }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={onNotification}>
          <Ionicons name="notifications" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={onProfilePress}>
          <FontAwesome name="user" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { productsByCategory };
export default HomeMainScreen;
