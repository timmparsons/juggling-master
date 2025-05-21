import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LeaderboardComponent from '@/components/Leaderboard';

const players = [
  { id: '1', name: 'Beau', score: 150 },
  { id: '2', name: 'Joey', score: 120 },
  { id: '3', name: 'Van', score: 90 },
  { id: '4', name: 'Lorenzo', score: 60 },
  { id: '5', name: 'Jude', score: 45 },
];

const Leaderboard = () => {
  return (
    <SafeAreaView>
      <LeaderboardComponent data={players} />
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
