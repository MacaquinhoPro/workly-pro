import { auth } from '@/utils/firebaseconfig';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Si ya hay usuario, redirige
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) router.replace('/');
    });
    return unsub;
  }, []);

  const login = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 12 }}>{error}</Text> : null}
      <Button title="Login" onPress={login} />
      <View style={{ height: 12 }} />
      <Button title="Register" onPress={() => router.push('/register')} />
    </View>
  );
}