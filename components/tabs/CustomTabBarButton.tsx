import React from 'react';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.button}>{children}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  button: {
    width: 70,
    height: 70,
    paddingTop: 10,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBarButton;
