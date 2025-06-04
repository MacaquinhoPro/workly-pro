import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { app } from '@/utils/firebaseconfig';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';

const Index = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) router.replace('/login');
    });
    return unsub;
  }, [auth, router]);

  const logout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Welcome {user.email}</Text>
      <View style={{ height: 12 }} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Index;
