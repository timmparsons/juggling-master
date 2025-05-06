import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header/index';
export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Header />
        <Text style={styles.title}>Hey name, let's get juggling! ⚽</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title='Start Juggling Session'
          onPress={() => router.push('/challenge')}
        />
        <View style={{ marginTop: 12 }}>
          <Button
            title='View Leaderboard'
            onPress={() => router.push('/leaderboard')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
