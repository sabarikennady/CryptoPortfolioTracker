import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RewardsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rewards</Text>
      {/* Rewards content will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424242',
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default RewardsScreen;
