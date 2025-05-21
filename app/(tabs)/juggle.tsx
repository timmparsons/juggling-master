import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function JuggleScreen() {
  const [timer, setTimer] = useState(60); // default 1 minute
  const [duration, setDuration] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const confettiRef = useRef(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    setTimer(duration);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimer(duration);
  };

  const handleCountdownFinish = () => {
    setIsRunning(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    alert('Time’s up! Record your juggles.');
  };

  useEffect(() => {
    if (isRunning && timer > 0) {
      countdownRef.current = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      handleCountdownFinish();
    }

    return () => countdownRef.current && clearTimeout(countdownRef.current);
  }, [isRunning, timer]);

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timer % 60).toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ready to Juggle?</Text>

      {/* <AnimatedCircularProgress
        size={200}
        width={10}
        fill={(timer / duration) * 100}
        tintColor='#0a84ff'
        backgroundColor='#e0e0e0'
      >
        {() => <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>}
      </AnimatedCircularProgress> */}
      <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
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

        <TouchableOpacity onPress={handleReset} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Set Time</Text>
        </TouchableOpacity>
      </View>

      {/* Duration Picker Modal */}
      <Modal visible={showPicker} transparent animationType='slide'>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Time (minutes)</Text>
          <ScrollView style={styles.pickerScroll}>
            {[...Array(31)].map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  const newTime = i * 60;
                  setDuration(newTime);
                  setTimer(newTime);
                  setShowPicker(false);
                }}
              >
                <Text style={styles.pickerItem}>{i} min</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>

      {showConfetti && (
        <ConfettiCannon
          count={80}
          origin={{ x: 200, y: 0 }}
          fadeOut
          fallSpeed={3000}
          explosionSpeed={400}
          autoStart
          ref={confettiRef}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0a84ff',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 10,
  },
  startButton: {
    backgroundColor: '#0a84ff',
    padding: 12,
    borderRadius: 8,
  },
  pauseButton: {
    backgroundColor: '#ff9f0a',
    padding: 12,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#ff3b30',
    padding: 12,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginTop: '40%',
    marginHorizontal: 30,
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  pickerScroll: {
    width: '100%',
    maxHeight: 200,
  },
  pickerItem: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
  },
});
