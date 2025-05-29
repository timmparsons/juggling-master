import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
} from 'react-native';
import { PADDING, TYPOGRAPHY } from '../../theme';
import { challenges } from '@/components/fixtures/challenges';

// Define TypeScript interface for challenge data
interface Challenge {
  id: string;
  title: string;
  description: string;
}

// Define props for ChallengeCard
interface ChallengeCardProps {
  title: string;
  description: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.challengeContainer}>
      <Text style={styles.challengeTitle}>{title}</Text>
      <Text style={styles.challengeDescription}>{description}</Text>
      <Pressable
        style={styles.button}
        onPress={() => console.log(`Challenge: ${title} pressed`)}
      >
        <Text style={styles.buttonText}>Coming Soon</Text>
      </Pressable>
    </View>
  );
};

const Challenges: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Challenges</Text>
        <FlatList
          data={challenges}
          keyExtractor={(item: Challenge) => item.id}
          renderItem={({ item }: { item: Challenge }) => (
            <ChallengeCard title={item.title} description={item.description} />
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background for consistency with Coming Soon page
  },
  container: {
    ...PADDING,
  },
  header: {
    ...TYPOGRAPHY.header, // Use theme typography if available
    fontSize: 32,
    fontWeight: '600',
    color: '#1A5F1A', // Green for soccer theme
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  challengeContainer: {
    backgroundColor: '#F0F8FF', // Light blue-gray for a clean, kid-friendly look
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeTitle: {
    ...TYPOGRAPHY.title, // Use theme typography if available
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  challengeDescription: {
    ...TYPOGRAPHY.body, // Use theme typography if available
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#1A5F1A', // Green button for soccer theme
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Challenges;
