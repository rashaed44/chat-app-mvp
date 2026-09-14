import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatsScreen from '../screens/ChatsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { I18nManager } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const isRTL = I18nManager.isRTL;
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#2f95dc',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: { height: 62, paddingBottom: 6 },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarIcon: ({ color, size }) => {
        let iconName = 'home';
        if (route.name === 'Home') iconName = 'home';
        if (route.name === 'Chats') iconName = 'chatbubbles';
        if (route.name === 'Profile') iconName = 'person';
        if (route.name === 'Notifications') iconName = 'notifications';
        if (route.name === 'Favorites') iconName = 'heart';
        return <Ionicons name={iconName as any} size={24} color={color} />;
      },
    })}>
      <Tab.Screen name={isRTL ? 'الرئيسية' : 'Home'} component={HomeScreen} options={{ title: '🏠 الرئيسية' }} />
      <Tab.Screen name={isRTL ? 'المحادثات' : 'Chats'} component={ChatsScreen} options={{ title: '💬 المحادثات' }} />
      <Tab.Screen name={isRTL ? 'المفضلة' : 'Favorites'} component={FavoritesScreen} options={{ title: '❤️ المفضلة' }} />
      <Tab.Screen name={isRTL ? 'الإشعارات' : 'Notifications'} component={NotificationsScreen} options={{ title: '🔔 الإشعارات' }} />
      <Tab.Screen name={isRTL ? 'الملف' : 'Profile'} component={ProfileScreen} options={{ title: '👤 الملف' }} />
    </Tab.Navigator>
  );
}
