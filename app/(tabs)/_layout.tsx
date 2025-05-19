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
import CustomTabBarButton from '@/components/tabs/CustomTabBarButton';

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
          title: 'Challenges',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='target' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='juggle'
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name='soccer-ball-o'
              size={28}
              color={focused ? Colors[colorScheme ?? 'light'].tint : color}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
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
        name='badges'
        options={{
          title: 'badges',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='medal' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
