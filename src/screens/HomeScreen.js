import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  ScrollView,
  Alert
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [progress, setProgress] = useState(0);
  const [activeMode, setActiveMode] = useState('30s');
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPlaying]);

  async function startCleaning(durationSeconds = 30) {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/clean_tone_165hz.mp3'),
        { shouldPlay: true, isLooping: true }
      );

      setSound(newSound);
      setIsPlaying(true);
      setProgress(0);

      const interval = 100;
      const totalSteps = (durationSeconds * 1000) / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const currentProgress = Math.min((currentStep / totalSteps) * 100, 100);
        setProgress(Math.round(currentProgress));

        if (currentStep >= totalSteps) {
          clearInterval(timer);
          stopCleaning(newSound);
          Alert.alert("Success!", "Cleaning cycle completed. Speaker is clear!");
        }
      }, interval);

    } catch (error) {
      Alert.alert("Audio Error", "Please place 'clean_tone_165hz.mp3' inside assets/sounds/ folder.");
    }
  }

  async function stopCleaning(soundInstance = sound) {
    if (soundInstance) {
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
    }
    setSound(null);
    setIsPlaying(false);
    setProgress(0);
  }

  return (
    <SafeAreaView style={styles.darkContainer}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Warning Banner */}
        <View style={styles.warningCard}>
          <Ionicons name="alert-circle" size={22} color="#F59E0B" />
          <Text style={styles.warningText}>
            Set Volume to 100% & Place Phone Facing Down
          </Text>
        </View>

        {/* Cleaning Mode Selector */}
        <View style={styles.modeContainer}>
          <TouchableOpacity
            style={[styles.modeTab, activeMode === '30s' && styles.activeModeTab]}
            onPress={() => setActiveMode('30s')}
          >
            <Text style={[styles.modeText, activeMode === '30s' && styles.activeModeText]}>Quick (30s)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeTab, activeMode === '60s' && styles.activeModeTab]}
            onPress={() => setActiveMode('60s')}
          >
            <Text style={[styles.modeText, activeMode === '60s' && styles.activeModeText]}>Deep (60s)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeTab, activeMode === 'dust' && styles.activeModeTab]}
            onPress={() => setActiveMode('dust')}
          >
            <Text style={[styles.modeText, activeMode === 'dust' && styles.activeModeText]}>Dust Clean</Text>
          </TouchableOpacity>
        </View>

        {/* Big Action Button / Animated Ring */}
        <View style={styles.circleWrapper}>
          <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }] }, isPlaying && styles.activePulseRing]} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.mainButton, isPlaying ? styles.stopButton : styles.startButton]}
            onPress={() => (isPlaying ? stopCleaning() : startCleaning(activeMode === '60s' ? 60 : 30))}
          >
            <MaterialCommunityIcons
              name={isPlaying ? "stop-circle-outline" : "water-outline"}
              size={56}
              color="#FFF"
            />
            <Text style={styles.mainButtonText}>
              {isPlaying ? "STOP" : "EJECT WATER"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Display */}
        {isPlaying && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressValue}>{progress}%</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkContainer: { flex: 1, backgroundColor: '#0F172A' },
  scrollContent: { padding: 20, alignItems: 'center' },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: '#F59E0B',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  warningText: { color: '#FBBF24', marginLeft: 8, fontSize: 13, fontWeight: '600' },
  modeContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 30,
    padding: 4,
    marginBottom: 35,
    width: '100%',
  },
  modeTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 25 },
  activeModeTab: { backgroundColor: '#3B82F6' },
  modeText: { color: '#94A3B8', fontWeight: '600', fontSize: 13 },
  activeModeText: { color: '#FFF' },
  circleWrapper: { width: 220, height: 220, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  pulseRing: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(59, 130, 246, 0.15)' },
  activePulseRing: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  mainButton: {
    width: 170,
    height: 170,
    borderRadius: 85,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  startButton: { backgroundColor: '#3B82F6' },
  stopButton: { backgroundColor: '#EF4444' },
  mainButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginTop: 6 },
  progressContainer: { width: '100%', alignItems: 'center', marginTop: 30 },
  progressValue: { color: '#3B82F6', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  progressBarBackground: { width: '100%', height: 8, backgroundColor: '#1E293B', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#3B82F6' },
});