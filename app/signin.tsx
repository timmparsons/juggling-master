import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { supabase } from '../supabaseClient';
import { useRouter } from 'expo-router';
import { PADDING, TYPOGRAPHY } from '../theme';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else router.replace('/');
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      await supabase
        .from('users')
        .insert([
          {
            id: data.user?.id,
            name: email.split('@')[0],
            subscription_status: 'free',
          },
        ]);
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Juggling Master ⚽</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...PADDING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    ...TYPOGRAPHY.header,
    fontSize: 28,
    fontWeight: '600',
    color: '#1A5F1A',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#FF9F0A',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignInScreen;
