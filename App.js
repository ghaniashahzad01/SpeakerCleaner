import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import ManualScreen from './src/screens/ManualScreen';
import TestScreen from './src/screens/TestScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#64748B',
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Clean') {
              return <MaterialCommunityIcons name="water-eject" size={size} color={color} />;
            } else if (route.name === 'Manual') {
              return <Ionicons name="options" size={size} color={color} />;
            } else if (route.name === 'Test') {
              return <MaterialCommunityIcons name="speaker-group" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Clean" component={HomeScreen} />
        <Tab.Screen name="Manual" component={ManualScreen} />
        <Tab.Screen name="Test" component={TestScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: { 
    backgroundColor: '#0F172A', 
    borderTopColor: '#1E293B', 
    height: 60, 
    paddingBottom: 8 
  },
});