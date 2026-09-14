import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { db, storage } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../contexts/AuthContext';

export default function ChatScreen({ route }: any) {
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
      // update conversation summary
      const convRef = doc(db, 'conversations', conversationId);
      await updateDoc(convRef, {
        lastMessage: text || (mediaUrl ? 'صورة' : ''),
        updatedAt: serverTimestamp(),
      });
    } catch (e: any) {
      Alert.alert('خطأ', e.message || 'فشل إرسال الرسالة');
    }
  };

  const pickImageAndSend = async () => {
    if (!user) return;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('أذن مرفوض', 'الرجاء منح إذن الوصول للصور');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (result.cancelled) return;
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
      Alert.alert('خطأ', e.message || 'فشل رفع الصورة');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.senderId === user?.uid ? styles.myBubble : styles.otherBubble]}>
            {item.mediaUrl ? <Image source={{ uri: item.mediaUrl }} style={{ width: 180, height: 120, borderRadius: 8 }} /> : null}
            {item.text ? <Text>{item.text}</Text> : null}
          </View>
        )}
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
  container: { flex: 1, padding: 12 },
  bubble: { padding: 10, borderRadius: 8, marginVertical: 6, maxWidth: '80%' },
  myBubble: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherBubble: { backgroundColor: '#fff', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#eee' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginRight: 8 },
});
