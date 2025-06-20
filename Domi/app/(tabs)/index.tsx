import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import LoginScreen from '@/components/LoginScreen';
import RegisterScreen from '@/components/RegisterScreen';
import RegisterSuccessScreen from '@/components/RegisterSuccessScreen';
import HomeMainScreen from '@/components/HomeMainScreen';
import CategoryScreen from '@/components/CategoryScreen';
import ProductDetailScreen, { Product } from '@/components/ProductDetailScreen';
import CartScreen from '@/components/CartScreen';
import OrderInfoScreen from '@/components/OrderInfoScreen';
import OrderPaymentScreen from '@/components/OrderPaymentScreen';
import OrderSuccessScreen from '@/components/OrderSuccessScreen';
import ProfileScreen from '@/components/ProfileScreen';
import ChangePasswordScreen from '@/components/ChangePasswordScreen';
import FeedbackScreen from '@/components/FeedbackScreen';
import SupportTopicScreen from '@/components/SupportTopicScreen';
import SupportChatScreen from '@/components/SupportChatScreen';
import SearchScreen from '@/components/SearchScreen';
import NotificationScreen from '@/components/NotificationScreen';

export default function HomeScreen() {
  const [screen, setScreen] = useState<'welcome' | 'login' | 'register' | 'registerSuccess' | 'homeMain' | 'category' | 'productDetail' | 'cart' | 'orderInfo' | 'orderPayment' | 'orderSuccess' | 'profile' | 'changePassword' | 'feedback' | 'supportTopic' | 'supportChat' | 'search' | 'notification'>('welcome');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [shippingFee] = useState(30000);
  const [selectedSupportTopic, setSelectedSupportTopic] = useState<string | null>(null);

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
    return <HomeMainScreen onProductPress={(product: Product) => { setSelectedProduct(product); setScreen('productDetail'); }} onCartPress={() => setScreen('cart')} cart={cart} onProfilePress={() => setScreen('profile')} onSearch={() => setScreen('search')} onNotification={() => setScreen('notification')} />;
  }
  if (screen === 'category') {
    return <CategoryScreen />;
  }
  if (screen === 'productDetail' && selectedProduct) {
    return <ProductDetailScreen product={selectedProduct} onBack={() => setScreen('homeMain')} addToCart={addToCart} onPayNow={(product, quantity) => { addToCart(product, quantity); setScreen('cart'); }} />;
  }
  if (screen === 'cart') {
    return <CartScreen cart={cart} onBack={() => setScreen('homeMain')} onCheckout={handleGoToOrderInfo} />;
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
    return <ProfileScreen onLogout={() => setScreen('welcome')} onBack={() => setScreen('homeMain')} onChangePassword={() => setScreen('changePassword')} onFeedback={() => setScreen('feedback')} onGoSupport={() => setScreen('supportTopic')} />;
  }
  if (screen === 'changePassword') {
    return <ChangePasswordScreen onBack={() => setScreen('profile')} onSuccess={() => setScreen('profile')} />;
  }
  if (screen === 'feedback') {
    return <FeedbackScreen onBack={() => setScreen('profile')} onGoSupport={() => setScreen('supportTopic')} />;
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
  return <WelcomeScreen navigation={{ navigate: (s) => setScreen(s === 'Register' ? 'register' : 'login') }} />;
}
