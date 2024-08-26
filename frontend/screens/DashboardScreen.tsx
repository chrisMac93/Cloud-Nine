// screens/DashboardScreen.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Card from '../components/Card';

export default function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card 
        title="Current Temperature"
        content="72°F"
      />
      <Card 
        title="Today's Forecast"
        content="Partly cloudy with a high of 75°F and a low of 60°F."
      />
      <Card 
        title="Air Quality Index"
        content="Moderate (50)"
      />
      {/* Add more cards as needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});