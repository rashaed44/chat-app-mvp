import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ChatScreen({ route }: any) {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const currentUserId = 'CURRENT_USER_ID'; // TODO: replace after auth implemented

  useEffect(() => {
    const q = query(collection(db, 'conversations', conversationId, 'messages'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setMessages(msgs);
    });
    return () => unsub();
  }, [conversationId]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
      senderId: currentUserId,
      text,
      createdAt: serverTimestamp(),
    });
    setText('');
    // TODO: update lastMessage/updatedAt on conversation doc (server or transaction)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.senderId === currentUserId ? styles.myBubble : styles.otherBubble]}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="اكتب رسالة..." />
        <Button title="إرسال" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  bubble: { padding: 10, borderRadius: 8, marginVertical: 6, maxWidth: '80%' },
  myBubble: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherBubble: { backgroundColor: '#fff', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#eee' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginRight: 8 },
});
