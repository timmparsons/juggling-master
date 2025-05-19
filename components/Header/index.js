import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Header = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='face-man-profile' size={28} color='black' />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
});
