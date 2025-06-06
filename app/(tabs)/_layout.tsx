import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSupabase } from '../../contexts/SupabaseContext';
import { useEffect } from 'react';

export default function TabLayout() {
  const { session } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    console.log('TabLayout rendered', { session: !!session });
  }, [session]);

  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-outline' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='juggle'
        options={{
          title: 'Juggle',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='football-outline' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='leaderboard'
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='trophy-outline' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='badges'
        options={{
          title: 'Badges',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='award' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
