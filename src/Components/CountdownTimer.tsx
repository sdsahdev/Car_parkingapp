import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {allColors} from '../Utils/AllColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface CountdownTimerProps {
  initialSeconds: number;
  onEnd?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onEnd,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (seconds === 0) {
      if (onEnd) {
        onEnd();
      }
    }
  }, [seconds, onEnd]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {hours, minutes, seconds};
  };

  const time = formatTime(seconds);

  const radius = wp(35); // Increased radius for a bigger circle
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (seconds / initialSeconds) * circumference;

  return (
    <View style={styles.container}>
      <Svg width="320" height="320" viewBox="0 0 320 320">
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx="160"
          cy="160"
          r={radius}
          strokeWidth="10"
        />
        <Circle
          stroke={allColors.primaryColor}
          fill="none"
          cx="160"
          cy="160"
          r={radius}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.timerContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.timerText}>
            {String(time.hours).padStart(2, '0')}
          </Text>
          <Text style={styles.label}>Hours</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.timerText}>
            {String(time.minutes).padStart(2, '0')}
          </Text>
          <Text style={styles.label}>Minutes</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.timerText}>
            {String(time.seconds).padStart(2, '0')}
          </Text>
          <Text style={styles.label}>Seconds</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timerText: {
    fontSize: wp(8), // Adjusted font size for bigger circle
    fontWeight: 'bold',
    color: allColors.primaryColor,
  },
  colon: {
    fontSize: wp(8), // Adjusted font size for bigger circle
    fontWeight: 'bold',
    color: allColors.primaryColor,
    marginHorizontal: 5,
  },
  label: {
    fontSize: wp(4), // Adjusted font size for bigger circle
    fontWeight: 'normal',
    textAlign: 'center',
    color: allColors.primaryColor,
  },
});

export default CountdownTimer;
