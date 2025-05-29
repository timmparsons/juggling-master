import React from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';

const ComingSoon = () => {
  const bounceValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    bounceAnimation.start();
    return () => bounceAnimation.stop();
  }, [bounceValue]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Badges Coming Soon!</Text>
        <Text style={styles.message}>
          We're working on cool badges for your soccer juggling skills! Check
          back soon to see your rewards.
        </Text>
        <Animated.Image
          source={{ uri: 'https://via.placeholder.com/150?text=Soccer+Ball' }}
          style={[styles.image, { transform: [{ translateY: bounceValue }] }]}
        />
        <Text style={styles.footer}>Stay tuned for awesome achievements!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: '90%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A5F1A',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  footer: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ComingSoon;
