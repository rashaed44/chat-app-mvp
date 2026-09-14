import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function MessageBubble({ message, isMine }: any) {
  return (
    <View style={[styles.container, isMine ? styles.myContainer : styles.otherContainer]}>
      {!isMine && message.senderAvatar ? <Image source={{ uri: message.senderAvatar }} style={styles.avatar} /> : null}
      <View style={[styles.bubble, isMine ? styles.myBubble : styles.otherBubble]}>
        {message.mediaUrl ? <Image source={{ uri: message.mediaUrl }} style={styles.media} /> : null}
        {message.text ? <Text style={styles.text}>{message.text}</Text> : null}
        <Text style={styles.time}>{message.createdAt ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString() : ''}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 6, alignItems: 'flex-end' },
  myContainer: { justifyContent: 'flex-end' },
  otherContainer: { justifyContent: 'flex-start' },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  bubble: { maxWidth: '75%', padding: 10, borderRadius: 12, overflow: 'hidden' },
  myBubble: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherBubble: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  text: { fontSize: 15, color: '#111' },
  time: { fontSize: 11, color: '#666', marginTop: 6, alignSelf: 'flex-end' },
  media: { width: 180, height: 120, borderRadius: 8, marginBottom: 6 },
});
