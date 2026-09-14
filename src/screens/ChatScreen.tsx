import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { db, storage } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../contexts/AuthContext';
import MessageBubble from '../components/MessageBubble';
import Header from '../components/Header';

export default function ChatScreen({ route, navigation }: any) {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!conversationId) return;
    const q = query(collection(db, 'conversations', conversationId, 'messages'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setMessages(msgs);
    });
    return () => unsub();
  }, [conversationId]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const sendMessage = async (mediaUrl?: string) => {
    if ((!text || !text.trim()) && !mediaUrl) return;
    if (!user) return;
    try {
      await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
        senderId: user.uid,
        text: text || null,
        mediaUrl: mediaUrl || null,
        createdAt: serverTimestamp(),
      });
      setText('');
      const convRef = doc(db, 'conversations', conversationId);
      await updateDoc(convRef, {
        lastMessage: text || (mediaUrl ? 'صورة' : ''),
        updatedAt: serverTimestamp(),
      });
    } catch (e: any) {
      console.warn('Send message error', e);
    }
  };

  const pickImageAndSend = async () => {
    if (!user) return;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (result.canceled) return;
    const uri = result.assets[0].uri;
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = `${user.uid}_${Date.now()}`;
      const storageRef = ref(storage, `chat_media/${conversationId}/${filename}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await sendMessage(url);
    } catch (e: any) {
      console.warn('Upload error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="💬 المحادثة" onBack={() => navigation.goBack()} />
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} isMine={item.senderId === user?.uid} />}
      />
      <View style={styles.inputRow}>
        <TouchableOpacity onPress={pickImageAndSend} style={{ marginRight: 8 }}>
          <Text style={{ fontSize: 24 }}>📎</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="اكتب رسالة..." />
        <Button title="إرسال" onPress={() => sendMessage()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F8' },
  list: { flex: 1, padding: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginRight: 8, backgroundColor: '#fff' },
});
