import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title, onBack }: { title: string; onBack?: (() => void) | null }) {
  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.left}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
      ) : (
        <View style={styles.left} />
      )}
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      <View style={styles.right} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff'
  },
  left: { width: 40 },
  right: { width: 40 },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700' },
});
