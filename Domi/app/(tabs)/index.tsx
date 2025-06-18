import ChangePasswordScreen from '@/components/ChangePasswordScreen';
import HomeMainScreen from '@/components/HomeMainScreen';
import LoginScreen from '@/components/LoginScreen';
import ProfileScreen from '@/components/ProfileScreen';
import RegisterScreen from '@/components/RegisterScreen';
import RegisterSuccessScreen from '@/components/RegisterSuccessScreen';
import SearchScreen from '@/components/SearchScreen';
import FeedbackScreen from '@/components/FeedbackScreen';
import NotificationScreen from '@/components/NotificationScreen';


import { useState } from 'react';

export default function HomeScreen() {
  const [screen, setScreen] = useState<'login' | 'register' | 'registerSuccess' | 'homeMain' | 'profile' | 'changePassword' | 'feedback' | 'supportTopic' | 'supportChat' | 'search' | 'notification' | 'orderSuccess' | 'productDetail'>('login');
  
  // Thêm các state còn thiếu
  const [selectedSupportTopic, setSelectedSupportTopic] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  if (screen === 'login') {
    return <LoginScreen onLogin={() => setScreen('homeMain')} onRegister={() => setScreen('register')} onForgotPassword={() => setScreen('changePassword')} />;
  }
  if (screen === 'register') {
    return <RegisterScreen onRegister={() => setScreen('registerSuccess')} onLogin={() => setScreen('login')} />;
  }
  if (screen === 'registerSuccess') {
    return <RegisterSuccessScreen onLogin={() => setScreen('login')} />;
  }
  if (screen === 'homeMain') {
    return <HomeMainScreen 
      onProfilePress={() => setScreen('profile')} 
      onSearch={() => setScreen('search')}
      onNotification={() => setScreen('notification')}
      onProductPress={(product) => { setSelectedProduct(product); setScreen('productDetail'); }}
      onCartPress={() => setScreen('orderSuccess')}
      cart={cart}
    />;
  }
  if (screen === 'profile') {
    return <ProfileScreen 
      onLogout={() => setScreen('login')} 
      onBack={() => setScreen('homeMain')} 
      onChangePassword={() => setScreen('changePassword')}
      onFeedback={() => setScreen('feedback')}
      onGoSupport={() => setScreen('supportTopic')}
    />;
  }
  if (screen === 'changePassword') {
    return <ChangePasswordScreen onBack={() => setScreen('profile')} onSuccess={() => setScreen('profile')} />;
  }
  if (screen === 'feedback') {
    return <FeedbackScreen onBack={() => setScreen('profile')} onGoSupport={() => setScreen('supportTopic')} />;
  }

  if (screen === 'notification') {
    return <NotificationScreen onBack={() => setScreen('homeMain')} />;
  }
 
  if (screen === 'productDetail') {
    // Thêm component ProductDetailScreen nếu cần
    return <div>Product Detail Screen - Product: {JSON.stringify(selectedProduct)}</div>;
  }
   if (screen === 'search') {
    return <SearchScreen onBack={() => setScreen('homeMain')} onProductPress={(product) => { setSelectedProduct(product); setScreen('productDetail'); }} />;
  }

  return null;
}
