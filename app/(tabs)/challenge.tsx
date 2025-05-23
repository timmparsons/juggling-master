import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { PADDING, TYPOGRAPHY } from '../../theme';
import { challenges } from '@/components/fixtures/challenges';

type ItemProps = {
  title: string;
  description: string;
};

const ChallengeCard = ({ title, description }: ItemProps) => {
  return (
    <View style={styles.challengeContainer}>
      <Text style={styles.challengeTitle}>{title}</Text>
      <Text style={styles.challengeDescription}>{description}</Text>
      <Button
        title='Coming soon'
        onPress={() => console.log('Catch on foot')}
      />
    </View>
  );
};

const Challenge = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Challenges</Text>
        <View style={styles.rowContainer}>
          <FlatList
            data={challenges}
            renderItem={({ item }) => (
              <ChallengeCard
                title={item.title}
                description={item.description}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  container: {
    ...PADDING,
  },
  header: {
    fontSize: 40,
    fontWeight: '300',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  challengeContainer: {
    // width: '48%', // Two containers side by side
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 9,
    marginHorizontal: 4,
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  challengeDescription: {
    paddingTop: 15,
    flexWrap: 'wrap',
  },
});
