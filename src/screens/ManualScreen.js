import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ManualScreen() {
  const [selectedHz, setSelectedHz] = useState(165);
  const [isPlaying, setIsPlaying] = useState(false);

  const presets = [135, 165, 200, 300, 440];

  return (
    <SafeAreaView style={styles.darkContainer}>
      <View style={styles.contentPadding}>
        <Text style={styles.headerTitle}>Manual Tuner</Text>
        <Text style={styles.headerSubtitle}>Select specific frequency to clear stubborn water drops</Text>

        {/* Frequency Meter Box */}
        <View style={styles.hzDisplayBox}>
          <Text style={styles.hzValue}>{selectedHz}</Text>
          <Text style={styles.hzUnit}>Hz Frequency</Text>
        </View>

        {/* Presets Grid */}
        <Text style={styles.sectionTitle}>Preset Frequencies</Text>
        <View style={styles.presetGrid}>
          {presets.map((hz) => (
            <TouchableOpacity
              key={hz}
              style={[styles.presetCard, selectedHz === hz && styles.selectedPresetCard]}
              onPress={() => setSelectedHz(hz)}
            >
              <Text style={[styles.presetText, selectedHz === hz && styles.selectedPresetText]}>
                {hz} Hz
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Play Button */}
        <TouchableOpacity
          style={[styles.actionBtn, isPlaying ? styles.dangerBtn : styles.primaryBtn]}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.actionBtnText}>{isPlaying ? "STOP FREQUENCY" : "PLAY TONE"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  darkContainer: { flex: 1, backgroundColor: '#0F172A' },
  contentPadding: { flex: 1, padding: 20 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF', marginBottom: 6 },
  headerSubtitle: { fontSize: 14, color: '#94A3B8', marginBottom: 25 },
  hzDisplayBox: {
    backgroundColor: '#1E293B',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: '#334155',
    borderWidth: 1,
    marginBottom: 25,
  },
  hzValue: { fontSize: 52, fontWeight: 'bold', color: '#3B82F6' },
  hzUnit: { color: '#94A3B8', fontSize: 14, marginTop: 4 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  presetGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  presetCard: {
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderColor: '#334155',
    borderWidth: 1,
  },
  selectedPresetCard: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  presetText: { color: '#94A3B8', fontWeight: '600' },
  selectedPresetText: { color: '#FFF' },
  actionBtn: {
    flexDirection: 'row',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtn: { backgroundColor: '#3B82F6' },
  dangerBtn: { backgroundColor: '#EF4444' },
  actionBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
