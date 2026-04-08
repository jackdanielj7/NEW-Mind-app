import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

type BreathPhase = 'idle' | 'breatheIn' | 'hold' | 'breatheOut';

export default function BreathingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('idle');
  const [cycles, setCycles] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  const phaseText: Record<BreathPhase, string> = {
    idle: 'დაიწყეთ',
    breatheIn: 'ჩაისუნთქეთ',
    hold: 'შეაჩერეთ',
    breatheOut: 'ამოისუნთქეთ',
  };

  const phaseSubtext: Record<BreathPhase, string> = {
    idle: 'დააჭირეთ წრეს',
    breatheIn: '4 წამი',
    hold: '7 წამი',
    breatheOut: '8 წამი',
  };

  const runBreathingCycle = () => {
    // Breathe In - 4 seconds
    setPhase('breatheIn');
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.8,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Hold - 7 seconds
      setPhase('hold');
      setTimeout(() => {
        // Breathe Out - 8 seconds
        setPhase('breatheOut');
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 8000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCycles((prev) => prev + 1);
        });
      }, 7000);
    });
  };

  useEffect(() => {
    if (isActive && phase === 'idle') {
      runBreathingCycle();
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && phase === 'breatheOut' && cycles > 0) {
      // Small delay before starting next cycle
      const timeout = setTimeout(() => {
        runBreathingCycle();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [cycles]);

  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      setCycles(0);
    }
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase('idle');
    scaleAnim.setValue(1);
    opacityAnim.setValue(0.6);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0099cc', '#006699', '#004466']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>სუნთქვის სავარჯიშო</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Breathing Circle */}
        <View style={styles.circleContainer}>
          <TouchableOpacity
            onPress={isActive ? handleStop : handleStart}
            activeOpacity={0.9}
          >
            <Animated.View
              style={[
                styles.outerCircle,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim,
                },
              ]}
            >
              <View style={styles.middleCircle}>
                <View style={styles.innerCircle} />
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.phaseText}>{phaseText[phase]}</Text>
          <Text style={styles.phaseSubtext}>{phaseSubtext[phase]}</Text>
        </View>

        {/* Cycles Counter */}
        {cycles > 0 && (
          <View style={styles.cyclesContainer}>
            <Text style={styles.cyclesText}>{cycles} ციკლი დასრულებული</Text>
          </View>
        )}

        {/* Controls */}
        <View style={[styles.controls, { paddingBottom: insets.bottom + 20 }]}>
          {isActive ? (
            <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
              <Ionicons name="stop" size={24} color="#fff" />
              <Text style={styles.buttonText}>გაჩერება</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Ionicons name="play" size={24} color="#004466" />
              <Text style={styles.startButtonText}>დაწყება</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>4-7-8 ტექნიკა</Text>
          <Text style={styles.infoDescription}>
            ჩაისუნთქეთ 4 წამი, შეაჩერეთ 7 წამი, ამოისუნთქეთ 8 წამი
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    width: 44,
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(200, 230, 255, 0.6)',
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  phaseText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  phaseSubtext: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cyclesContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cyclesText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  controls: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 40,
    gap: 10,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004466',
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    gap: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});
