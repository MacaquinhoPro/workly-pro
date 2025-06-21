// app/index.tsx
import { auth } from '@/utils/firebaseconfig';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      if (!usr) {
        router.replace('/login');
      }
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ marginBottom: 20 }}>¡Bienvenido, {user?.email}!</Text>
      <Button title="Cerrar sesión" onPress={() => signOut(auth)} />
    </View>
  );
}