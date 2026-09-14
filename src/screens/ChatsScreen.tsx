import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConversationItem from '../components/ConversationItem';

const sampleConversations = [
  { id: '1', title: 'أم حسين', lastMessage: 'كيف الحال؟', updatedAt: { seconds: Math.floor(Date.now() / 1000) }, avatar: 'https://placehold.co/64x64', unreadCount: 2 },
  { id: '2', title: 'مشروع الفريق', lastMessage: 'تم رفع النسخة الجديدة', updatedAt: { seconds: Math.floor(Date.now() / 1000) - 3600 }, avatar: 'https://placehold.co/64x64' },
];

export default function ChatsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleConversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat' as any, { conversationId: item.id })}>
            <ConversationItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F8' },
});
