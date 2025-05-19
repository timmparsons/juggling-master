import React, { useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function JuggleScreen() {
  // const [showConfetti, setShowConfetti] = useState(false);
  // const confettiRef = useRef(null);

  // const handleJugglePress = () => {
  //   setShowConfetti(true);
  //   setTimeout(() => setShowConfetti(false), 3000);
  // };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Ready to Juggle?</Text>
      {/* <Button title='Start Juggling!' onPress={handleJugglePress} /> */}

      {/* {showConfetti && (
        <ConfettiCannon
          count={100}
          origin={{ x: 200, y: 0 }}
          fadeOut
          fallSpeed={3000}
          explosionSpeed={350}
          autoStart={true}
          ref={confettiRef}
        />
      )} */}
    </View>
  );
}
