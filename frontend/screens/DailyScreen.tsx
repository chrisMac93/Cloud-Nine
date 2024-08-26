import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DailyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Daily </Text>
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

export default DailyScreen;
