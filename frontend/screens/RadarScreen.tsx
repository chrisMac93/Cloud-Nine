import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RadarScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Radar </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RadarScreen;
