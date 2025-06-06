import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Alert,
} from 'react-native';
import { supabase } from '../../../supabaseClient';
import { useRouter } from 'expo-router';
import { useSupabase } from '../../../contexts/SupabaseContext';
import { PADDING, TYPOGRAPHY } from '../../../theme';

const ProfileScreen: React.FC = () => {
  const { session } = useSupabase();
  const router = useRouter();
  const [user, setUser] = useState({
    name: 'Tim',
    totalJuggles: 150,
    highScore: 0,
    sessionsCompleted: 10,
    avatar: require('../../../assets/images/soccer-ball.png'),
  });
  const [team, setTeam] = useState(null);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) {
        router.push('/signin');
        return;
      }
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        const { data: userData } = await supabase
          .from('users')
          .select('name')
          .eq('id', authUser.id)
          .single();
        const { data: sessions } = await supabase
          .from('timer_sessions')
          .select('duration')
          .eq('user_id', authUser.id);
        let { data: leaderboard, error } = await supabase
          .from('leaderboard')
          .select('score')
          .eq('user_id', authUser.id)
          .single();
        const totalJuggles =
          sessions?.reduce((sum, s) => sum + s.duration, 0) || 0;
        console.log('QQQ ', leaderboard.score);
        setUser({
          name: userData?.name || authUser.email || 'User',
          highScore: leaderboard?.score,
          totalJuggles,
          sessionsCompleted: sessions?.length || 0,
          avatar: require('../../../assets/images/soccer-ball.png'),
        });

        const { data: membership } = await supabase
          .from('team_members')
          .select('team_id, teams(name)')
          .eq('user_id', authUser.id)
          .single();
        setTeam(
          membership
            ? { id: membership.team_id, name: membership.teams.name }
            : null
        );
      }
    };
    fetchUserData();
  }, [session, router]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // const handleEditProfile = () => {
  //   Alert.alert('Edit Profile', 'Edit Profile coming soon!');
  // };

  const handleLogout = async () => {
    try {
      console.log('Logging out user:', session?.user.id);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Logout successful, redirecting to signin');
      router.replace('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>
      <View style={styles.profileCard}>
        <Animated.Image
          source={user.avatar}
          style={[styles.avatar, { transform: [{ rotate: spin }] }]}
        />
        <Text style={styles.name}>{user.name}</Text>
        {team && <Text style={styles.team}>Team: {team.name}</Text>}
        <View style={styles.statsContainer}>
          <View style={{}}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{user.highScore}</Text>
              <Text style={styles.statLabel}>High Score</Text>
            </View>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.totalJuggles}</Text>
            <Text style={styles.statLabel}>Total Juggles</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.sessionsCompleted}</Text>
            <Text style={styles.statLabel}>Sessions Completed</Text>
          </View>
        </View>
        {/* <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[styles.button, styles.teamButton]}
          onPress={() => router.push('/teams')}
        >
          <Text style={styles.buttonText}>
            {team ? 'Manage Team' : 'Join a Team'}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...PADDING,
    alignItems: 'center',
  },
  header: {
    ...TYPOGRAPHY.header,
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginVertical: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 2,
  },
  name: {
    ...TYPOGRAPHY.title,
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  team: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.body,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A5F1A',
  },
  statLabel: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#1A5f1A',
  },
  teamButton: {
    backgroundColor: '#FF9F0A',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
