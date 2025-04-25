import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontSize: 8,
          fontWeight: '500',
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='house.fill' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='challenge'
        options={{
          title: 'Daily Challenge',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='soccer-ball-o' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='leaderboard'
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => (
            <AntDesign name='Trophy' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='friends'
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='user-friends' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='face-man-profile'
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
