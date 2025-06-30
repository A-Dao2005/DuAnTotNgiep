import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data từ AsyncStorage khi app khởi động
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Lỗi load user từ storage:', error);
    }
  };

  const updateUser = async (newUserData) => {
    try {
      setUser(newUserData);
      // Lưu user data vào AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(newUserData));
    } catch (error) {
      console.error('Lỗi lưu user vào storage:', error);
    }
  };

  const clearUser = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('authToken'); // Xóa cả authToken
    } catch (error) {
      console.error('Lỗi xóa user từ storage:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};