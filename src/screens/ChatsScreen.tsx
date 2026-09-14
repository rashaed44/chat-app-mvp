import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

type Conversation = {
  id: string;
  title?: string;
  lastMessage?: string;
  updatedAt?: any;
};

export default function ChatsScreen() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'conversations'),
      where('members', 'array-contains', user.uid),
      orderBy('updatedAt', 'desc')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data: Conversation[] = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
      setConversations(data);
    });
    return () => unsub();
  }, [user]);

  if (!user) return (
    <View style={styles.container}><Text>جاري التحميل...</Text></View>
  );

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
