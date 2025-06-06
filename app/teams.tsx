import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabaseClient';
import { useSupabase } from '../contexts/SupabaseContext';
import { PADDING, TYPOGRAPHY } from '../theme';

const TeamScreen: React.FC = () => {
  const { session } = useSupabase();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [userTeam, setUserTeam] = useState(null);

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
        const { data: allTeams } = await supabase.from('teams').select('*');
        setTeams(allTeams || []);

        const { data: membership } = await supabase
          .from('team_members')
          .select('team_id, teams(name)')
          .eq('user_id', session.user.id)
          .single();
        setUserTeam(
          membership
            ? { id: membership.team_id, name: membership.teams.name }
            : null
        );
      }
    };
    checkAccess();
  }, [session]);

  const handleCreateTeam = async () => {
    if (!teamName) return alert('Enter a team name');
    const { data: team, error } = await supabase
      .from('teams')
      .insert([{ name: teamName, created_by: session?.user.id }])
      .select()
      .single();
    if (error) return alert(error.message);
    await supabase
      .from('team_members')
      .insert([{ team_id: team.id, user_id: session?.user.id }]);
    setUserTeam({ id: team.id, name: teamName });
    setTeamName('');
    const { data: allTeams } = await supabase.from('teams').select('*');
    setTeams(allTeams || []);
  };

  const handleJoinTeam = async (teamId: number) => {
    const { error } = await supabase
      .from('team_members')
      .insert([{ team_id: teamId, user_id: session?.user.id }]);
    if (error) return alert(error.message);
    const { data: team } = await supabase
      .from('teams')
      .select('name')
      .eq('id', teamId)
      .single();
    setUserTeam({ id: teamId, name: team.name });
  };

  if (!session) return null;

  if (!hasAccess) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Teams Locked 🔒</Text>
        <Text style={styles.subtitle}>Subscribe to join or create teams!</Text>
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
      <Text style={styles.header}>Your Team ⚽</Text>
      {userTeam ? (
        <View style={styles.teamCard}>
          <Text style={styles.teamName}>{userTeam.name}</Text>
          <TouchableOpacity
            style={styles.viewLeaderboardButton}
            onPress={() =>
              router.push(`/(tabs)/leaderboard?teamId=${userTeam.id}`)
            }
          >
            <Text style={styles.buttonText}>View Team Leaderboard</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.subtitle}>
            Create a new team or join an existing one!
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Team Name'
            value={teamName}
            onChangeText={setTeamName}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreateTeam}>
            <Text style={styles.buttonText}>Create Team</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeader}>Available Teams</Text>
          <FlatList
            data={teams}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.teamItem}
                onPress={() => handleJoinTeam(item.id)}
                disabled={userTeam !== null}
              >
                <Text style={styles.teamItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
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
  teamCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamName: {
    ...TYPOGRAPHY.title,
    fontSize: 24,
    fontWeight: '600',
    color: '#1A5F1A',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  viewLeaderboardButton: {
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
  sectionHeader: {
    ...TYPOGRAPHY.title,
    fontSize: 20,
    fontWeight: '600',
    color: '#1A5F1A',
    marginVertical: 16,
  },
  teamItem: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  teamItemText: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: '#333',
  },
});

export default TeamScreen;
