import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const userName = 'Nguyen Van A';

const categories = [
  { key: 'hot', label: 'Nổi bật' },
  { key: 'knife', label: 'dao kéo' },
  { key: 'pan', label: 'chảo bếp' },
];

const productsByCategory = {
  hot: [
    { name: 'Bộ dao kéo cao cấp', price: '225,000 VND', img: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-dao-keo-6-mon-fk-01-1.jpg' },
    { name: 'Bộ dụng cụ 5 món', price: '180,000 VND', img: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-dao-keo-5-mon-fk-01-1.jpg' },
  ],
  knife: [
    { name: 'Bộ dao kéo Nhật', price: '320,000 VND', img: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-dao-keo-6-mon-fk-01-2.jpg' },
    { name: 'Dao thái đa năng', price: '120,000 VND', img: 'https://cdn.tgdd.vn/Products/Images/8138/303646/dao-thai-da-nang.jpg' },
  ],
  pan: [
    { name: 'Chảo chống dính', price: '250,000 VND', img: 'https://cdn.tgdd.vn/Products/Images/8138/303646/chao-chong-dinh.jpg' },
    { name: 'Bộ nồi chảo bếp', price: '500,000 VND', img: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-noi-chao-bep.jpg' },
  ],
};

type HomeMainScreenProps = {
  onProductPress?: (product: { name: string; price: string; img: string; description: string; rating?: number }) => void;
  onCartPress?: () => void;
  cart?: { product: any; quantity: number }[];
  onProfilePress?: () => void;
  onSearch?: () => void;
  onNotification?: () => void;
};

const HomeMainScreen: React.FC<HomeMainScreenProps> = ({ onProductPress, onCartPress, cart = [], onProfilePress, onSearch, onNotification }) => {
  const [selectedCategory, setSelectedCategory] = useState<'hot' | 'knife' | 'pan'>('hot');

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
          <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Image source={{ uri: 'https://salt.tikicdn.com/ts/tmp/3e/2d/2e/7e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpg' }} style={styles.banner} />
        {/* Sản phẩm nổi bật */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Mọi người đều thích!</Text>
          <TouchableOpacity><Text style={styles.seeMore}>Xem thêm {'>'}</Text></TouchableOpacity>
        </View>
        <View style={styles.productsRow}>
          <TouchableOpacity onPress={() => onProductPress && onProductPress({ name: 'Bộ dao kéo cao cấp', price: '225,000 VND', img: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-dao-keo-6-mon-fk-01-1.jpg', description: 'Bộ dao kéo cao cấp, chất liệu bền đẹp, an toàn cho sức khỏe.', rating: 5 })}>
            <View style={styles.productCard}>
              <Image source={{ uri: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-dao-keo-6-mon-fk-01-1.jpg' }} style={styles.productImg} />
              <Text style={styles.productName}>bộ dao kéo cao cấp</Text>
              <Text style={styles.productPrice}>225,000 VND</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onProductPress && onProductPress({ name: 'Bộ dụng cụ 5 món', price: '180,000 VND', img: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-dao-keo-5-mon-fk-01-1.jpg', description: 'Bộ dụng cụ 5 món tiện lợi cho căn bếp của bạn.', rating: 4 })}>
            <View style={styles.productCard}>
              <Image source={{ uri: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-dao-keo-5-mon-fk-01-1.jpg' }} style={styles.productImg} />
              <Text style={styles.productName}>bộ dụng cụ 5món</Text>
              <Text style={styles.productPrice}>180,000 VND</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Danh mục & tìm kiếm */}
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
              style={[
                styles.categoryBtn,
                selectedCategory === cat.key && { backgroundColor: '#E53935' },
              ]}
              onPress={() => setSelectedCategory(cat.key as 'hot' | 'knife' | 'pan')}
            >
              <Text
                style={[
                  styles.categoryBtnText,
                  selectedCategory === cat.key && { color: '#fff' },
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Sản phẩm danh mục động */}
        <View style={styles.productsRow}>
          {productsByCategory[selectedCategory].map((prod, idx) => (
            <TouchableOpacity key={idx} onPress={() => onProductPress && onProductPress({ ...prod, description: 'Giá úp chén đĩa được làm từ nhựa nguyên sinh an toàn cho sức khỏe, thân thiện với môi trường. Không ám mùi khó chịu khi sử dụng.', rating: 4 })}>
              <View style={styles.productCard}>
                <Image source={{ uri: prod.img }} style={styles.productImg} />
                <Text style={styles.productName}>{prod.name}</Text>
                <Text style={styles.productPrice}>{prod.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* Sản phẩm danh mục cũ (ẩn đi hoặc xóa nếu muốn) */}
        {/* <View style={styles.productsRow}>
          <View style={styles.productCardSmall}>
            <Image source={{ uri: 'https://cdn.tgdd.vn/Products/Images/8138/303646/hop-dung-gia-vi-1.jpg' }} style={styles.productImgSmall} />
          </View>
          <View style={styles.productCardSmall}>
            <Image source={{ uri: 'https://cdn.tgdd.vn/Products/Images/8138/303646/bo-dao-keo-6-mon-fk-01-2.jpg' }} style={styles.productImgSmall} />
          </View>
        </View> */}
      </ScrollView>
      {/* Tab bar */}
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
};

export default HomeMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  hello: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
  },
  userName: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  banner: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginLeft: 10,
    marginTop: 10,
  },
  seeMore: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 13,
    marginRight: 10,
  },
  productsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 140,
    elevation: 2,
  },
  productImg: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
  },
  productPrice: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  categoryBtn: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#eee',
  },
  categoryBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productCardSmall: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    width: 90,
    elevation: 2,
    marginHorizontal: 5,
  },
  productImgSmall: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
  },
}); 