import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ConversationItem({ item }: any) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.avatar || 'https://placehold.co/64x64' }} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.title}>{item.title || item.name || 'محادثة'}</Text>
          <Text style={styles.time}>{item.updatedAt ? new Date(item.updatedAt.seconds * 1000).toLocaleTimeString() : ''}</Text>
        </View>
        <Text numberOfLines={1} style={styles.subtitle}>{item.lastMessage || ''}</Text>
      </View>
      {item.unreadCount ? <View style={styles.badge}><Text style={styles.badgeText}>{item.unreadCount}</Text></View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#f0f0f0', backgroundColor: '#fff' },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  content: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '600' },
  time: { fontSize: 12, color: '#999' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  badge: { backgroundColor: '#FF3B30', minWidth: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, marginLeft: 8 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
