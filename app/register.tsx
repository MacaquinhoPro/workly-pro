import { app, firestore } from '@/utils/firebaseconfig';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Register = () => {
  const router = useRouter();
  const auth = getAuth(app);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [cedula, setCedula] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (step === 1) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(iconScale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      iconScale.setValue(0);
    }
  }, [step]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && (!email || !password)) {
      setError('Por favor completa email y contraseña');
      return;
    }
    if (step === 2 && (!edad || !cedula || !foto)) {
      setError('Completa todos los campos y sube una foto');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setStep((prev) => prev - 1);
  };

  const register = async () => {
    setError('');
    try {
      // 1. Crear usuario con email y contraseña
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const userId = user.uid;
      console.log('Firebase Auth UID:', userId);

      // 2. Subir foto de perfil si existe
      let photoURL = '';
      if (foto) {
        const response = await fetch(foto);
        const blob = await response.blob();
        const storageRef = ref(getStorage(app), `users/${userId}/profile.jpg`);
        await uploadBytes(storageRef, blob);
        photoURL = await getDownloadURL(storageRef);
      }

      // 3. Guardar datos del usuario en Firestore
      const userData = {
        email,
        edad: Number(edad),
        cedula,
        foto: photoURL,
        createdAt: serverTimestamp(),
      };
      console.log('Saving user document to Firestore (collection "usuarios"):', userData);

      try {
        await setDoc(doc(firestore, 'usuarios', userId), userData);
        console.log('Firestore document written successfully');
      } catch (fireErr) {
        console.error('Error writing Firestore document:', fireErr);
        setError((fireErr as Error).message);
      }

      // 4. Redirigir al feed
      router.replace('/feed');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Barra de progreso */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${(step / 3) * 100}%` }]} />
      </View>

      {/* Instrucciones animadas */}
      <View style={styles.instructionWrapper}>
        <Animated.Text style={[styles.instructionText, { opacity: fadeAnim }]}>          
          {step === 1 && 'Tu acceso seguro\nEmail y contraseña'}
          {step === 2 && 'Conócenos más\nEdad, cédula y una foto tuya'}
          {step === 3 && 'Verifica tu información'}
        </Animated.Text>
        {step === 1 && (
          <View style={{ height: 140, width: 140, alignSelf: 'center', marginTop: 8 }}>
            <LottieView source={require('../assets/person-icon.json')} autoPlay loop style={{ height: 140, width: 140 }} />
          </View>
        )}
      </View>

      {/* Formulario de registro por pasos */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.centeredBox}>
          {step === 1 && (
            <>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.explainer}>
                Esta información nos ayuda a validar tu perfil y conectar mejor contigo.
              </Text>
              <TextInput
                placeholder="Edad"
                placeholderTextColor="#9ca3af"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Cédula"
                placeholderTextColor="#9ca3af"
                value={cedula}
                onChangeText={setCedula}
                keyboardType="numeric"
                style={styles.input}
              />
              <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                <Text style={styles.uploadText}>{foto ? 'Cambiar foto' : 'Subir foto'}</Text>
              </TouchableOpacity>
              {foto && <Image source={{ uri: foto }} style={styles.image} />}
            </>
          )}

          {step === 3 && (
            <View style={styles.summaryBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
                <Ionicons name="person-circle-outline" size={24} color="#4b5563" />
                <Text style={styles.sectionTitle}>Tu perfil</Text>
              </View>
              {foto && <Image source={{ uri: foto }} style={styles.summaryImage} />}
              <View style={styles.summaryItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="mail-outline" size={16} color="#6b7280" />
                  <Text style={styles.summaryLabel}>Email</Text>
                </View>
                <Text style={styles.summaryText}>{email}</Text>
              </View>
              <View style={styles.summaryItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="calendar-outline" size={16} color="#6b7280" />
                  <Text style={styles.summaryLabel}>Edad</Text>
                </View>
                <Text style={styles.summaryText}>{edad}</Text>
              </View>
              <View style={styles.summaryItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="card-outline" size={16} color="#6b7280" />
                  <Text style={styles.summaryLabel}>Cédula</Text>
                </View>
                <Text style={styles.summaryText}>{cedula}</Text>
              </View>
            </View>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {step > 1 && (
            <TouchableOpacity onPress={handleBack} style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Volver</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Footer con botón */}
      <View style={styles.footer}>
        {step < 3 ? (
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={register} style={styles.button}>
            <Text style={styles.buttonText}>Crear cuenta</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  centeredBox: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginTop: -180,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f3f4f6',
    color: '#111827',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderColor: '#d1d5db',
    borderWidth: 1,
    backgroundColor: '#f3f4f6',
    marginTop: 12,
    alignSelf: 'center',
  },
  secondaryText: {
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    marginVertical: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  uploadText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 16,
  },
  summaryBox: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryItem: {
    marginTop: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  summaryText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  summaryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#374151',
  },
  progressContainer: {
    height: 6,
    width: '80%',
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
    marginTop: 24,
    alignSelf: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 5,
  },
  instructionWrapper: {
    marginTop: 80,
    marginBottom: 4,
    paddingHorizontal: 24,
    alignSelf: 'center',
    maxWidth: 400,
  },
  instructionText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Platform.select({ ios: 'Helvetica Neue', android: 'Roboto' }),
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 45,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  explainer: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 15,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
});