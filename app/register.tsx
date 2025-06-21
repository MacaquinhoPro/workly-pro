import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app } from '@/utils/firebaseconfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
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
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        className="w-full border mb-3 p-2 rounded"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border mb-3 p-2 rounded"
      />
      {error ? <Text className="text-red-500 mb-3">{error}</Text> : null}
      <TouchableOpacity
        onPress={register}
        className="w-full bg-blue-500 py-3 rounded"
      >
        <Text className="text-white text-center font-semibold">Create account</Text>
      </TouchableOpacity>
      <View className="h-3" />
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-full bg-gray-500 py-3 rounded"
      >
        <Text className="text-white text-center font-semibold">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
