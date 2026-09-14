import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header title="🏠 الرئيسية" />
      <View style={styles.body}>
        <Text style={styles.welcome}>مرحباً! اختر محادثة للبدء أو اضغط على زر + لبدء محادثة جديدة.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F8' },
  body: { flex: 1, padding: 16 },
  welcome: { fontSize: 16, color: '#333' },
});
