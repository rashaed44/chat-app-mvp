import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ text, isMine }: any) {
  return (
    <View style={[styles.bubble, isMine ? styles.myBubble : styles.otherBubble]}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: { padding: 10, borderRadius: 8, marginVertical: 6, maxWidth: '80%' },
  myBubble: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherBubble: { backgroundColor: '#fff', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#eee' },
});
