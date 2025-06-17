import ChangePasswordScreen from '@/components/ChangePasswordScreen';
import HomeMainScreen from '@/components/HomeMainScreen';
import LoginScreen from '@/components/LoginScreen';
import ProfileScreen from '@/components/ProfileScreen';
import RegisterScreen from '@/components/RegisterScreen';
import RegisterSuccessScreen from '@/components/RegisterSuccessScreen';
import React, { useState } from 'react';

export default function HomeScreen() {
  const [screen, setScreen] = useState<'login' | 'register' | 'registerSuccess' | 'homeMain' | 'profile' | 'changePassword'>('login');

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
    return <HomeMainScreen onProfilePress={() => setScreen('profile')} />;
  }
  if (screen === 'profile') {
    return <ProfileScreen onLogout={() => setScreen('login')} onBack={() => setScreen('homeMain')} onChangePassword={() => setScreen('changePassword')} />;
  }
  if (screen === 'changePassword') {
    return <ChangePasswordScreen onBack={() => setScreen('profile')} onSuccess={() => setScreen('profile')} />;
  }
  return null;
}
