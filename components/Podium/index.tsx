// leaderboard.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const Podium = ({ players, onPlayerPress }) => {
  // Ensure players are ordered like: [1st, 2nd, 3rd]
  const first = players[0];
  const second = players[1];
  const third = players[2];

  return (
    <View style={styles.podiumContainer}>
      {/* 2nd Place - LEFT */}
      <Pressable
        style={styles.podiumBase}
        onPress={() => onPlayerPress(second)}
      >
        <View
          style={[
            styles.podiumBlock,
            { height: 80, backgroundColor: '#C0C0C0' },
          ]}
        >
          <Text style={styles.podiumLabel}>2</Text>
        </View>
        <Image
          source={require('@/assets/images/soccer-ball.png')}
          style={styles.avatarSmall}
        />
        <Text style={styles.name}>{second?.name}</Text>
        <Text style={styles.score}>{second?.score} juggles</Text>
      </Pressable>

      {/* 1st Place - CENTER */}
      <Pressable style={styles.podiumBase} onPress={() => onPlayerPress(first)}>
        <View
          style={[
            styles.podiumBlock,
            { height: 120, backgroundColor: '#FFD700' },
          ]}
        >
          <Text style={styles.podiumLabel}>1</Text>
        </View>
        <Image
          source={require('@/assets/images/soccer-ball.png')}
          style={styles.avatarLarge}
        />
        <Text style={styles.name}>{first?.name}</Text>
        <Text style={styles.score}>{first?.score} juggles</Text>
      </Pressable>

      {/* 3rd Place - RIGHT */}
      <Pressable style={styles.podiumBase} onPress={() => onPlayerPress(third)}>
        <View
          style={[
            styles.podiumBlock,
            { height: 60, backgroundColor: '#CD7F32' },
          ]}
        >
          <Text style={styles.podiumLabel}>3</Text>
        </View>
        <Image
          source={require('@/assets/images/soccer-ball.png')}
          style={styles.avatarSmall}
        />
        <Text style={styles.name}>{third?.name}</Text>
        <Text style={styles.score}>{third?.score} juggles</Text>
      </Pressable>
    </View>
  );
};

export default Podium;

const styles = StyleSheet.create({
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingVertical: 24,
  },
  podiumBase: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  podiumBlock: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  podiumLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 4,
  },
  avatarSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
});
