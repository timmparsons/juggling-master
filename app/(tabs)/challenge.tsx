import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PADDING, TYPOGRAPHY } from '../../theme';

const Challenge = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Challenge</Text>
        <View style={styles.challengeContainer}>
          <Text style={styles.challengeTitle}>Catch on Foot</Text>
          <Text style={styles.challengeDescription}>
            One of the simplest juggling tricks to perform. You got this!
          </Text>
          <Button
            title='Join Challenge'
            onPress={() => console.log('Catch on foot')}
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
    fontWeight: 300,
    // padding: SPACING.paddingLeft,
  },
  challengeContainer: {
    marginTop: 20,
    width: '70%',
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 9,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  challengeDescription: {
    paddingTop: 15,
  },
});
