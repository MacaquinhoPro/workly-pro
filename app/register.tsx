import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { app } from '@/utils/firebaseconfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = async () => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Create account" onPress={register} />
      <View style={{ height: 12 }} />
      <Button title="Back to Login" onPress={() => router.back()} />
    </View>
  );
}
