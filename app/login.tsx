import { auth } from '@/utils/firebaseconfig';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

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

    <View className="flex-1 justify-center items-center p-5 bg-white">

    <View className="flex-1 justify-center p-5 bg-white">

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"

        className="w-full border mb-3 p-2 rounded"

        className="border mb-3 p-2 rounded"

      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry

        className="w-full border mb-3 p-2 rounded"

        className="border mb-3 p-2 rounded"

      />
      {error ? <Text className="text-red-500 mb-3">{error}</Text> : null}
      <TouchableOpacity
        onPress={login}

        className="w-full bg-blue-500 py-3 rounded"

        className="bg-blue-500 py-3 rounded"

      >
        <Text className="text-white text-center font-semibold">Login</Text>
      </TouchableOpacity>
      <View className="h-3" />
      <TouchableOpacity
        onPress={() => router.push('/register')}

        className="w-full bg-gray-500 py-3 rounded"

        className="bg-gray-500 py-3 rounded"

      >
        <Text className="text-white text-center font-semibold">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
