import CartScreen from '@/components/CartScreen';
import CategoryScreen from '@/components/CategoryScreen';
import ChangePasswordScreen from '@/components/ChangePasswordScreen';
import EditProfileScreen from '@/components/EditProfileScreen';
import FeedbackScreen from '@/components/FeedbackScreen';
import HomeMainScreen from '@/components/HomeMainScreen';
import LoginScreen from '@/components/LoginScreen';
import NotificationScreen from '@/components/NotificationScreen';
import OrderInfoScreen from '@/components/OrderInfoScreen';
import OrderPaymentScreen from '@/components/OrderPaymentScreen';
import OrderSuccessScreen from '@/components/OrderSuccessScreen';
import ProductDetailScreen, { Product } from '@/components/ProductDetailScreen';
import ProductListScreen from '@/components/ProductListScreen';
import ProfileScreen from '@/components/ProfileScreen';
import RegisterScreen from '@/components/RegisterScreen';
import RegisterSuccessScreen from '@/components/RegisterSuccessScreen';
import SearchScreen from '@/components/SearchScreen';
import SupportChatScreen from '@/components/SupportChatScreen';
import SupportTopicScreen from '@/components/SupportTopicScreen';
import WelcomeScreen from '@/components/WelcomeScreen';
import { useState } from 'react';

export default function HomeScreen() {
  const [user, setUser] = useState({
    name: 'Nguyen Van A',
    id: '123456789',
    phone: '09876543210',
    email: 'hello@gmail.com',
    address: '81 Hoàng Hoa Thám',
  });
  const [screen, setScreen] = useState<'welcome' | 'login' | 'register' | 'registerSuccess' | 'homeMain' | 'category' | 'productDetail' | 'productList' | 'cart' | 'orderInfo' | 'orderPayment' | 'orderSuccess' | 'profile' | 'changePassword' | 'feedback' | 'supportTopic' | 'supportChat' | 'search' | 'notification' | 'editProfile'>('welcome');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [shippingFee] = useState(30000);
  const [selectedSupportTopic, setSelectedSupportTopic] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.product.name === product.name);
      if (exist) {
        return prev.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleGoToOrderInfo = () => {
    const total = cart.reduce((sum, item) => {
      const price = Number(item.product.price.replace(/[^\d]/g, ''));
      return sum + price * item.quantity;
    }, 0);
    setOrderTotal(total);
    setScreen('orderInfo');
  };

  if (screen === 'login') {
    return <LoginScreen navigation={{ navigate: (s) => {
      if (s === 'Register') setScreen('register');
      else if (s === 'HomeMain') setScreen('homeMain');
      else setScreen('welcome');
    } }} />;
  }
  if (screen === 'register') {
    return <RegisterScreen navigation={{ navigate: (s) => {
      if (s === 'Login') setScreen('login');
      else if (s === 'RegisterSuccess') setScreen('registerSuccess');
      else setScreen('welcome');
    } }} />;
  }
  if (screen === 'registerSuccess') {
    return <RegisterSuccessScreen navigation={{ navigate: (s) => setScreen(s === 'Login' ? 'login' : 'welcome') }} />;
  }
  if (screen === 'homeMain') {
    return <HomeMainScreen 
      onProductPress={(product: Product) => { setSelectedProduct(product); setScreen('productDetail'); }}
      onCartPress={() => setScreen('cart')}
      cart={cart}
      onProfilePress={() => setScreen('profile')}
      onSearch={() => setScreen('search')}
      onNotification={() => setScreen('notification')}
      onSeeMore={(products: Product[]) => { setProductList(products); setScreen('productList'); }}
    />;
  }
  if (screen === 'category') {
    return <CategoryScreen />;
  }
  if (screen === 'productDetail' && selectedProduct) {
    return <ProductDetailScreen 
      product={selectedProduct} 
      onBack={() => setScreen('homeMain')} 
      onAddToCart={addToCart} 
      onCheckout={(product) => { addToCart(product); setScreen('cart'); }}
      onProductPress={(product) => { setSelectedProduct(product); setScreen('productDetail'); }}
    />;
  }
  if (screen === 'productList') {
    return <ProductListScreen products={productList} onProductPress={(product) => { setSelectedProduct(product); setScreen('productDetail'); }} onBack={() => setScreen('homeMain')} />;
  }
  if (screen === 'cart') {
    return <CartScreen cart={cart} onBack={() => setScreen('homeMain')} onCheckout={handleGoToOrderInfo} onRemoveItem={(productName) => setCart(prev => prev.filter(item => item.product.name !== productName))} />;
  }
  if (screen === 'orderInfo') {
    return <OrderInfoScreen orderTotal={orderTotal} onOrderSubmit={() => setScreen('orderPayment')} onBack={() => setScreen('cart')} />;
  }
  if (screen === 'orderPayment') {
    return <OrderPaymentScreen orderTotal={orderTotal} shippingFee={shippingFee} onOrderSubmit={() => setScreen('orderSuccess')} onBack={() => setScreen('orderInfo')} />;
  }
  if (screen === 'orderSuccess') {
    return <OrderSuccessScreen onGoHome={() => { setCart([]); setScreen('homeMain'); }} />;
  }
  if (screen === 'profile') {
    return <ProfileScreen
      user={user}
      onLogout={() => setScreen('welcome')}
      onBack={() => setScreen('homeMain')}
      onChangePassword={() => setScreen('changePassword')}
      onFeedback={() => setScreen('feedback')}
      onGoSupport={() => setScreen('supportTopic')}
      onEditProfile={() => setScreen('editProfile')}
    />;
  }
  if (screen === 'changePassword') {
    return <ChangePasswordScreen onBack={() => setScreen('profile')} onSuccess={() => setScreen('profile')} />;
  }
  if (screen === 'feedback') {
    return <FeedbackScreen onBack={() => setScreen('profile')} />;
  }
  if (screen === 'supportTopic') {
    return <SupportTopicScreen onBack={() => setScreen('profile')} onSelectTopic={(topic) => { setSelectedSupportTopic(topic); setScreen('supportChat'); }} />;
  }
  if (screen === 'supportChat') {
    return <SupportChatScreen onBack={() => setScreen('supportTopic')} topic={selectedSupportTopic} />;
  }
  if (screen === 'search') {
    return <SearchScreen onBack={() => setScreen('homeMain')} onProductPress={(product) => { setSelectedProduct(product); setScreen('productDetail'); }} />;
  }
  if (screen === 'notification') {
    return <NotificationScreen onBack={() => setScreen('homeMain')} />;
  }
  if (screen === 'editProfile') {
    return <EditProfileScreen
      user={user}
      onBack={() => setScreen('profile')}
      onSave={(newUser) => { setUser({ ...user, ...newUser }); setScreen('profile'); }}
    />;
  }
  return <WelcomeScreen navigation={{ navigate: (s) => setScreen(s === 'Register' ? 'register' : 'login') }} />;
}
