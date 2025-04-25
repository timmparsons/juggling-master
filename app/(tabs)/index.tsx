import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚽ Welcome Juggling Legends!</Text>

      <Button
        title='Start Juggling Session'
        onPress={() => router.push('/leaderboard')}
      />
      <View style={{ marginTop: 10 }}>
        <Button
          title='View Leaderboard'
          onPress={() => navigation.navigate('Leaderboard')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
});
