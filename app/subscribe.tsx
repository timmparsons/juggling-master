import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PADDING, TYPOGRAPHY } from '../theme';

const SubscribeScreen: React.FC = () => {
  const router = useRouter();

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    const url =
      plan === 'monthly'
        ? 'https://your-store.lemonsqueezy.com/checkout/buy/your-monthly-product-id'
        : 'https://your-store.lemonsqueezy.com/checkout/buy/your-yearly-product-id';
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Unlock the Leaderboard! ⚽</Text>
      <Text style={styles.subtitle}>
        Get access to the leaderboard and teams with a subscription.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubscribe('monthly')}
      >
        <Text style={styles.buttonText}>Monthly - $5/month</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => handleSubscribe('yearly')}
      >
        <Text style={styles.buttonText}>Yearly - $50/year</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>Maybe Later</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...PADDING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    ...TYPOGRAPHY.h1,
    fontSize: 28,
    fontWeight: '600',
    color: '#1A5F1A',
    marginBottom: 20,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#FF9F0A',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 12,
  },
  cancelText: {
    ...TYPOGRAPHY.body,
    color: '#FF3B30',
    fontSize: 16,
  },
});

export default SubscribeScreen;
