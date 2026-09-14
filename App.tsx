import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainTabs from './src/navigation/MainTabs';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MainTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
