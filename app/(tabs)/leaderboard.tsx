import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LeaderboardComponent from '@/components/Leaderboard';
import { router } from 'expo-router';

const players = [
  { id: '1', name: 'Tim', score: 150 },
  { id: '2', name: 'Lily', score: 120 },
  { id: '3', name: 'Alex', score: 90 },
  { id: '4', name: 'Sam', score: 60 },
  { id: '5', name: 'Jordan', score: 45 },
];

const handlePlayerPress = (player: Player) => {
  router.push(`/player/${player.id}`);
};

const Leaderboard = () => {
  return (
    <SafeAreaView>
      <LeaderboardComponent data={players} onPlayerPress={handlePlayerPress} />{' '}
    </SafeAreaView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: 'center',
  },
});
