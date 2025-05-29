import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  Image,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { supabase } from '../../supabaseClient';
import { PADDING, TYPOGRAPHY } from '../../theme';

const JuggleScreen: React.FC = () => {
  const [timer, setTimer] = useState<number>(60);
  const [duration, setDuration] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const confettiRef = useRef<any>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning && timer > 0) {
      countdownRef.current = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      saveSession();
      alert("Time's up! Record your juggles.");
    }
    return () => {
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, [isRunning, timer]);

  useEffect(() => {
    Animated.loop(
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
    ).start();
  }, [bounceValue]);

  const saveSession = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: membership } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)
        .single();
      const score = timer; // Example: use timer duration as score
      await supabase.from('leaderboard').insert([
        {
          user_id: user.id,
          score,
          team_id: membership?.team_id || null,
        },
      ]);
      await supabase
        .from('timer_sessions')
        .insert([{ user_id: user.id, duration: timer }]);
    }
  };

  const handleStart = () => {
    setTimer(duration);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimer(duration);
    setShowConfetti(false);
    saveSession();
  };

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timer % 60).toString().padStart(2, '0');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Ready to Juggle?</Text>
        <View style={styles.timerContainer}>
          <Animated.Image
            source={{ uri: 'https://via.placeholder.com/80?text=Soccer+Ball' }}
            style={[
              styles.soccerBall,
              { transform: [{ translateY: bounceValue }] },
            ]}
          />
          <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        </View>
        <View style={styles.buttonRow}>
          {isRunning ? (
            <TouchableOpacity onPress={handlePause} style={styles.pauseButton}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleStart} style={styles.startButton}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Set Time</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={showPicker} transparent animationType='slide'>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Pick Your Time</Text>
              <ScrollView
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
              >
                {[...Array(31)].map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.pickerItemContainer}
                    onPress={() => {
                      const newTime = i * 60 || 60;
                      setDuration(newTime);
                      setTimer(newTime);
                      setShowPicker(false);
                    }}
                  >
                    <Text style={styles.pickerItem}>{i} min</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {showConfetti && (
          <ConfettiCannon
            count={100}
            origin={{ x: -10, y: 0 }}
            fadeOut
            fallSpeed={3000}
            explosionSpeed={400}
            autoStart
            ref={confettiRef}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...PADDING,
  },
  header: {
    ...TYPOGRAPHY.header,
    fontSize: 28,
    fontWeight: '600',
    color: '#1A5F1A',
    marginBottom: 24,
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  soccerBall: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  timerText: {
    ...TYPOGRAPHY.title,
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1A5F1A',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  startButton: {
    backgroundColor: '#1A5F1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#FF9F0A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalTitle: {
    ...TYPOGRAPHY.title,
    fontSize: 20,
    fontWeight: '600',
    color: '#1A5F1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerItemContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pickerItem: {
    ...TYPOGRAPHY.body,
    fontSize: 18,
    color: '#333',
  },
  cancelModalButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
});

export default JuggleScreen;
