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
import { supabase } from '../../supabaseClient';
import { useRouter } from 'expo-router';
import { PADDING, TYPOGRAPHY } from '../../theme';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState({
    name: 'Tim',
    totalJuggles: 150,
    sessionsCompleted: 10,
    avatar: 'https://via.placeholder.com/100?text=Soccer+Ball',
  });
  const [team, setTeam] = useState(null);
  const router = useRouter();
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
        const totalJuggles =
          sessions?.reduce((sum, s) => sum + s.duration, 0) || 0;
        setUser({
          name: userData?.name || authUser.email || 'User',
          totalJuggles,
          sessionsCompleted: sessions?.length || 0,
          avatar: user.avatar,
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
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleEditProfile = () => {
    alert('Edit Profile coming soon!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>
      <View style={styles.profileCard}>
        <Animated.Image
          source={{ uri: user.avatar }}
          style={[styles.avatar, { transform: [{ rotate: spin }] }]}
        />
        <Text style={styles.name}>{user.name}</Text>
        {team && <Text style={styles.team}>Team: {team.name}</Text>}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.totalJuggles}</Text>
            <Text style={styles.statLabel}>Total Juggles</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user.sessionsCompleted}</Text>
            <Text style={styles.statLabel}>Sessions Completed</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.teamButton}
          onPress={() => router.push('/teams')}
        >
          <Text style={styles.buttonText}>
            {team ? 'Manage Team' : 'Join a Team'}
          </Text>
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
    color: '#1A5F1A',
    marginVertical: 20,
  },
  profileCard: {
    backgroundColor: '#F5F5F5',
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
    marginBottom: 12,
  },
  name: {
    ...TYPOGRAPHY.header,
    fontSize: 24,
    fontWeight: '600',
    color: '#1A5F1A',
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
  editButton: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamButton: {
    backgroundColor: '#FF9F0A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
