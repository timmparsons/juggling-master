import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PADDING } from '../../theme';

const challenge = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Challenge</Text>
        <Text>new challenge</Text>
      </View>
    </SafeAreaView>
  );
};

export default challenge;

const styles = StyleSheet.create({
  container: {
    ...PADDING,
  },
  header: {
    fontSize: 40,
    fontWeight: 300,
    // padding: SPACING.paddingLeft,
  },
});
