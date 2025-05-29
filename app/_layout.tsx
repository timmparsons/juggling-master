import { Stack } from 'expo-router';
import { SupabaseProvider } from '../contexts/SupabaseContext';

export default function Layout() {
  return (
    <SupabaseProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='challenge' options={{ headerShown: false }} />
        <Stack.Screen name='leaderboard' options={{ headerShown: false }} />
        <Stack.Screen name='pages/Profile' options={{ headerShown: false }} />
        <Stack.Screen name='signin' options={{ headerShown: false }} />
        <Stack.Screen name='subscribe' options={{ headerShown: false }} />
        <Stack.Screen name='teams' options={{ headerShown: false }} />
      </Stack>
    </SupabaseProvider>
  );
}
