import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Podium from '@/components/Podium';

type Player = {
  id: string;
  name: string;
  score: number;
  avatarUrl?: string;
};

type LeaderboardProps = {
  data: Player[];
  title?: string;
  onPlayerPress?: (player: Player) => void;
};

const medals = ['🥇', '🥈', '🥉'];

export default function Leaderboard({
  data,
  title = '🏆 Leaderboard',
  onPlayerPress,
}: LeaderboardProps) {
  const sortedData = [...data].sort((a, b) => b.score - a.score);
  const topPlayers = sortedData.slice(0, 3);
  const otherPlayers = sortedData.slice(3);

  // Animation refs for top 3
  const fadeAnimRefs = useRef(
    topPlayers.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    fadeAnimRefs.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnimRefs]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Top 3 Players */}
      <Podium players={topPlayers} />

      {/* Divider */}
      {otherPlayers.length > 0 && (
        <Text style={styles.subheader}>Rest of the Team</Text>
      )}

      {/* Other Players */}
      <FlatList
        data={otherPlayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPlayerPress?.(item)}
            style={styles.playerRow}
          >
            <Text style={styles.rank}>#{index + 4}</Text>
            {item.avatarUrl ? (
              <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallbackSmall}>
                <Text style={styles.avatarInitial}>{item.name[0]}</Text>
              </View>
            )}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score} ⚽️</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  top3Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  topPlayer: {
    alignItems: 'center',
    width: 90,
  },
  topAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  avatarFallback: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarFallbackSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarInitial: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  topName: {
    fontWeight: '600',
    fontSize: 14,
  },
  topScore: {
    fontSize: 12,
    color: '#333',
  },
  trophy: {
    marginTop: 2,
    fontSize: 14,
  },
  subheader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rank: {
    width: 30,
    fontWeight: '600',
    fontSize: 14,
    color: '#666',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  score: {
    fontWeight: '600',
    fontSize: 14,
  },
});
