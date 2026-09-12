import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

type Conversation = {
  id: string;
  title?: string;
  lastMessage?: string;
  updatedAt?: any;
};

export default function ChatsScreen() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const navigation = useNavigation();
  const currentUserId = 'CURRENT_USER_ID'; // TODO: replace after auth implemented

  useEffect(() => {
    const q = query(
      collection(db, 'conversations'),
      where('members', 'array-contains', currentUserId),
      orderBy('updatedAt', 'desc')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data: Conversation[] = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
      setConversations(data);
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Chat' as any, { conversationId: item.id })}
          >
            <Text style={styles.title}>{item.title || 'محادثة'}</Text>
            <Text style={styles.subtitle}>{item.lastMessage || ''}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
});
