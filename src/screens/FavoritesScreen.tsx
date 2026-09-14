import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Header title="❤️ المفضلة" />
      <View style={styles.body}>
        <Text>المحادثات المفضلة ستظهر هنا.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F8' },
  body: { flex: 1, padding: 16 },
});
