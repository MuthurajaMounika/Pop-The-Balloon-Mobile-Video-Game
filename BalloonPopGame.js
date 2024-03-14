import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const BalloonPopGame = () => {
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(timer);
        // Game over logic here
      } else {
        setTimeLeft(timeLeft - 1);
        generateBalloon();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const generateBalloon = () => {
    const newBalloon = (
      <Balloon
        key={balloons.length}
        onPress={() => handleBalloonPop()}
        onMiss={() => handleMiss()}
      />
    );
    setBalloons([...balloons, newBalloon]);
  };

  const handleBalloonPop = () => {
    setScore(score + 2);
    setBalloons(balloons.slice(1)); // Remove popped balloon
  };

  const handleMiss = () => {
    setMissed(missed + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.missed}>Missed: {missed}</Text>
      <View style={styles.balloonContainer}>{balloons}</View>
    </View>
  );
};

const Balloon = ({ onPress, onMiss }) => {
  const windowWidth = Dimensions.get('window').width;
  const position = {
    left: Math.random() * (windowWidth - 50),
    bottom: 0,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onMiss();
    }, 5000); // Balloon disappears after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableOpacity style={[styles.balloon, position]} onPress={onPress}>
      <Image source={require('./balloon.png')} style={{ width: 50, height: 70 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 20,
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    marginBottom: 5,
    color: 'green',
  },
  missed: {
    fontSize: 20,
    marginBottom: 20,
    color: 'red',
  },
  balloonContainer: {
    position: 'relative',
  },
  balloon: {
    position: 'absolute',
  },
});

export default BalloonPopGame;
