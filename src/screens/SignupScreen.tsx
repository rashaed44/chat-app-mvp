import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      await setDoc(doc(db, 'users', uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });
    } catch (e: any) {
      Alert.alert('خطأ', e.message || 'فشل إنشاء الحساب');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء حساب</Text>
      <TextInput placeholder="الاسم" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="البريد الإلكتروني" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="كلمة المرور" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <Button title="تسجيل" onPress={signup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginBottom: 12 },
});
