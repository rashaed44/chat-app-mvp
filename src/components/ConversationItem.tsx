import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConversationItem() {
  return (
    <View style={styles.item}>
      <Text>Conversation item</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
});
