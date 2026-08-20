import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TestScreen() {
  return (
    <SafeAreaView style={styles.darkContainer}>
      <View style={styles.contentPadding}>
        <Text style={styles.headerTitle}>Speaker Diagnostics</Text>
        <Text style={styles.headerSubtitle}>Test left and right channel audio clarity post-cleaning</Text>

        <View style={styles.testCardGrid}>
          {/* Left Speaker Test */}
          <TouchableOpacity style={styles.testCard} onPress={() => Alert.alert("Testing", "Playing Left Channel Sound...")}>
            <MaterialCommunityIcons name="speaker-wireless" size={40} color="#3B82F6" />
            <Text style={styles.testCardTitle}>Left Speaker</Text>

            <View style={styles.smallPlayBadge}>
              <Ionicons name="volume-high" size={16} color="#FFF" />
              <Text style={styles.badgeText}>Test L</Text>
            </View>
          </TouchableOpacity>

          {/* Right Speaker Test */}
          <TouchableOpacity style={styles.testCard} onPress={() => Alert.alert("Testing", "Playing Right Channel Sound...")}>
            <MaterialCommunityIcons name="speaker-wireless" size={40} color="#06B6D4" />
            <Text style={styles.testCardTitle}>Right Speaker</Text>

            <View style={[styles.smallPlayBadge, { backgroundColor: '#06B6D4' }]}>
              <Ionicons name="volume-high" size={16} color="#FFF" />
              <Text style={styles.badgeText}>Test R</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Full Sound Quality Check */}
        <TouchableOpacity style={styles.fullTestBtn}>
          <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          <Text style={styles.fullTestText}>Run Audio Quality Check</Text>
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
  testCardGrid: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  testCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderColor: '#334155',
    borderWidth: 1,
  },
  testCardTitle: { color: '#FFF', fontWeight: '600', marginTop: 12, marginBottom: 15 },
  smallPlayBadge: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  fullTestBtn: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#334155',
    borderWidth: 1,
  },
  fullTestText: { color: '#FFF', fontWeight: '600', marginLeft: 10 },
});