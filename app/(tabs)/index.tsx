import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient';
import { useSupabase } from '../../contexts/SupabaseContext';
import { PADDING, TYPOGRAPHY } from '../../theme';
import Header from '../../components/Header/index';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { session } = useSupabase();
  const [isPaidUser, setIsPaidUser] = useState(false);
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -15,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue]);

  useEffect(() => {
    const checkSubscription = async () => {
      if (session) {
        const { data: user } = await supabase
          .from('users')
          .select('subscription_status')
          .eq('id', session.user.id)
          .single();
        setIsPaidUser(
          user?.subscription_status === 'monthly' ||
            user?.subscription_status === 'yearly'
        );
      }
    };
    checkSubscription();
  }, [session]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <Header />
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/pages/Profile')}
          >
            <Text style={styles.profileButtonText}>👤</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Hey Tim, let's get juggling! ⚽</Text>
        <Text style={styles.subtitle}>
          Master your soccer skills with fun challenges!
        </Text>
      </View>
      <Animated.Image
        source={{ uri: 'https://via.placeholder.com/120?text=Soccer+Ball' }}
        style={[
          styles.soccerBall,
          { transform: [{ translateY: bounceValue }] },
        ]}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/challenge')}
        >
          <Text style={styles.buttonText}>Start Juggling Session</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.push('/leaderboard')}
        >
          <Text style={styles.buttonText}>View Leaderboard</Text>
        </TouchableOpacity>
        {isPaidUser && (
          <TouchableOpacity
            style={[styles.button, styles.teamButton]}
            onPress={() => router.push('/teams')}
          >
            <Text style={styles.buttonText}>Your Team</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...PADDING,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  profileButton: {
    backgroundColor: '#1A5F1A',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 20,
  },
  title: {
    ...TYPOGRAPHY.header,
    fontSize: 28,
    fontWeight: '600',
    color: '#1A5F1A',
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  soccerBall: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#FF9F0A',
  },
  teamButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
