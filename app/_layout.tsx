import { Stack } from 'expo-router';
import { SupabaseProvider } from '../contexts/SupabaseContext';

export default function RootLayout() {
  return (
    <SupabaseProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        {/* <Stack.Screen
          name='signin'
          options={{
            headerShown: true,
            headerTitle: 'Sign In',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1A5F1A',
          }}
        />
        <Stack.Screen
          name='subscribe'
          options={{
            headerShown: true,
            headerTitle: 'Subscribe',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1A5F1A',
          }}
        />
        <Stack.Screen
          name='teams'
          options={{
            headerShown: true,
            headerTitle: 'Teams',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1A5F1A',
          }}
        /> */}
      </Stack>
    </SupabaseProvider>
  );
}
