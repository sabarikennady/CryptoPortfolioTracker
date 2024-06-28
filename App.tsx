import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {PortfolioProvider} from './src/context/PortfolioContext';

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </SafeAreaView>
    </PortfolioProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424242',
  },
});

export default App;
