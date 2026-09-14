import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header title="👤 الملف الشخصي" />
      <View style={styles.body}>
        <Text style={styles.title}>اسم المستخدم</Text>
        <Text style={styles.subtitle}>حالة المستخدم أو وصف قصير هنا.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F8' },
  body: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { marginTop: 8, color: '#666' },
});
