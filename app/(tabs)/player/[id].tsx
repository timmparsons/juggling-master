import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const mockPlayerData = {
  '1': { name: 'Alex', score: 99, avatarUrl: '', bio: 'Midfield maestro ⚽️' },
  '2': {
    name: 'Jordan',
    score: 82,
    avatarUrl: '',
    bio: 'Goalkeeper legend 🧤',
  },
  '3': { name: 'Sam', score: 75, avatarUrl: '', bio: 'Defensive wall 🛡️' },
};

export default function PlayerModal() {
  const { id } = useLocalSearchParams();
  const player = mockPlayerData[id as string];
  const navigation = useNavigation();

  if (!player) {
    return <Text style={{ padding: 20 }}>Player not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable>

      <Image
        source={
          player.avatarUrl
            ? { uri: player.avatarUrl }
            : require('@/assets/images/soccer-ball-icon.png')
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{player.name}</Text>
      <Text style={styles.score}>Score: {player.score}</Text>
      <Text style={styles.bio}>{player.bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  closeText: {
    fontSize: 16,
    color: '#007aff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
  },
  score: {
    fontSize: 18,
    marginVertical: 8,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
