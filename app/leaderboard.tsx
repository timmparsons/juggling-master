import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import { supabase } from '../supabaseClient';
import { useSupabase } from '../contexts/SupabaseContext';
import { PADDING, TYPOGRAPHY } from '../theme';

const LeaderboardScreen: React.FC = () => {
  const { session } = useSupabase();
  const router = useRouter();
  const { teamId } = useSearchParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [viewMode, setViewMode] = useState<'global' | 'team'>('global');

  useEffect(() => {
    if (!session) {
      router.push('/signin');
      return;
    }

    const checkAccess = async () => {
      const { data: user } = await supabase
        .from('users')
        .select('subscription_status')
        .eq('id', session.user.id)
        .single();
      const allowed =
        user?.subscription_status === 'monthly' ||
        user?.subscription_status === 'yearly';
      setHasAccess(allowed);

      if (allowed) {
        let query = supabase
          .from('leaderboard')
          .select('score, users(name)')
          .order('score', { ascending: false });

        if (teamId && viewMode === 'team') {
          query = query.eq('team_id', teamId);
        } else {
          query = query.is('team_id', null);
        }

        const { data } = await query;
        setLeaderboard(data || []);
      }
    };
    checkAccess();
  }, [session, teamId, viewMode]);

  if (!session) return null;

  if (!hasAccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Leaderboard Locked 🔒</Text>
        <Text style={styles.subtitle}>Subscribe to view the leaderboard!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/subscribe')}
        >
          <Text style={styles.buttonText}>Unlock Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard ⚽</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            viewMode === 'global' && styles.activeToggle,
          ]}
          onPress={() => setViewMode('global')}
        >
          <Text style={styles.toggleText}>Global</Text>
        </TouchableOpacity>
        {teamId && (
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'team' && styles.activeToggle,
            ]}
            onPress={() => setViewMode('team')}
          >
            <Text style={styles.toggleText}>Team</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={leaderboard}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{item.users?.name || 'Unknown'}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...PADDING,
  },
  header: {
    ...TYPOGRAPHY.header,
    fontSize: 28,
    fontWeight: '600',
    color: '#1A5F1A',
    marginVertical: 20,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  activeToggle: {
    backgroundColor: '#1A5F1A',
  },
  toggleText: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 8,
  },
  rank: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A5F1A',
  },
  name: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: '#333',
  },
  score: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A5F1A',
  },
});

export default LeaderboardScreen;
