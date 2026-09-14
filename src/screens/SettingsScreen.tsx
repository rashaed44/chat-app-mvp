import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header title="⚙️ الإعدادات" />
      <View style={styles.body}>
        <Text>الخصوصية، الإشعارات، اللغة، تسجيل الخروج.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F8' },
  body: { flex: 1, padding: 16 },
});
