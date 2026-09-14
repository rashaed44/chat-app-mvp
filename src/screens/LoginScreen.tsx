import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      Alert.alert('خطأ', e.message || 'فشل تسجيل الدخول');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <TextInput placeholder="البريد الإلكتروني" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="كلمة المرور" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <Button title="دخول" onPress={login} />
      <View style={{ height: 12 }} />
      <Button title="إنشاء حساب" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginBottom: 12 },
});
