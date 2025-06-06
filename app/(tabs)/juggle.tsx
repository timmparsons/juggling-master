import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSupabase } from '../../contexts/SupabaseContext';
import { supabase } from '../../supabaseClient';
import { useRouter } from 'expo-router';
import { PADDING, TYPOGRAPHY } from '../../theme';
import ConfettiCannon from 'react-native-confetti-cannon';

const JuggleScreen: React.FC = () => {
  const { session } = useSupabase();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    console.log('JuggleScreen state:', {
      timeLeft,
      isRunning,
      modalVisible,
      score,
      session: !!session,
    });

    if (!session) {
      console.log('No session, redirecting to signin');
      router.push('/signin');
      return;
    }

    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          console.log('Timer tick:', prev - 1);
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      console.log('Timer ended, showing modal');
      setIsRunning(false);
      setModalVisible(true);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, session, router]);

  const startTimer = () => {
    console.log('Starting timer');
    setIsRunning(true);
    setTimeLeft(60);
    setConfetti(false);
  };

  const stopTimer = () => {
    console.log('Stopping timer');
    setIsRunning(false);
    setModalVisible(true);
  };

  const openScoreInput = () => {
    console.log('Opening score input modal');
    setModalVisible(true);
  };

  const handleScoreSubmit = async () => {
    console.log('Submitting score:', score);
    if (!score || isNaN(Number(score)) || Number(score) < 0) {
      Alert.alert('Invalid Score', 'Please enter a valid number.');
      return;
    }

    const scoreValue = Number(score);
    try {
      await supabase.from('timer_sessions').insert([
        {
          user_id: session?.user.id,
          duration: isRunning || timeLeft < 60 ? 60 - timeLeft : 0, // 0 for manual entry
          score: scoreValue,
          created_at: new Date().toISOString(),
        },
      ]);

      const { data: currentHighScore } = await supabase
        .from('leaderboard')
        .select('score')
        .eq('user_id', session?.user.id)
        .single();

      const currentScore = currentHighScore?.score || 0;

      if (scoreValue > currentScore) {
        await supabase.from('leaderboard').upsert([
          {
            user_id: session?.user.id,
            score: scoreValue,
            team_id: null,
          },
        ]);
        setConfetti(true);
        Alert.alert(
          'New High Score!',
          `You've set a new personal best: ${scoreValue}!`
        );
      }

      setModalVisible(false);
      setScore('');
      setTimeLeft(60);
    } catch (error) {
      console.error('Score submission error:', error);
      Alert.alert('Error', 'Failed to save score. Try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      {confetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
      <Text style={styles.header}>Juggle Challenge ⚽</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      {!isRunning ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>Start Session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.inputScoreButton]}
            onPress={openScoreInput}
          >
            <Text style={styles.buttonText}>Input New Score</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={stopTimer}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType='slide'
        onRequestClose={() => {
          console.log('Modal close requested');
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Session Complete!</Text>
            <Text style={styles.modalSubtitle}>
              Enter your score (number of juggles):
            </Text>
            <TextInput
              style={styles.input}
              value={score}
              onChangeText={(text) => {
                console.log('Score input changed:', text);
                setScore(text);
              }}
              keyboardType='numeric'
              placeholder='Enter score'
              placeholderTextColor='#555'
              autoFocus={true}
              testID='score-input'
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  console.log('Cancel pressed');
                  setModalVisible(false);
                  setScore('');
                  setTimeLeft(60);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleScoreSubmit}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    ...PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    ...TYPOGRAPHY.header,
    fontSize: 24,
    fontWeight: '600',
    color: '#1A5F1A',
    marginBottom: 20,
  },
  timer: {
    ...TYPOGRAPHY.title,
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1A5F1A',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    gap: 12,
  },
  button: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  inputScoreButton: {
    backgroundColor: '#FF9F0A',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
    width: '80%',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalHeader: {
    ...TYPOGRAPHY.header,
    fontSize: 24,
    fontWeight: '600',
    color: '#1A5F1A',
    marginBottom: 12,
  },
  modalSubtitle: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1A5F1A',
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  modalButtonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JuggleScreen;
