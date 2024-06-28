import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {LineChart, BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchCryptoMarketChart} from '../services/apiService';

const OptionsScreen = ({route}) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [selectedDays, setSelectedDays] = useState(7);
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {selectedCrypto} = route.params || {};
    if (selectedCrypto) {
      setSelectedCrypto(selectedCrypto);
    }
    fetchCryptoData();
  }, [selectedCrypto, selectedDays, route.params]);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const params = {vs_currency: 'usd', days: selectedDays.toString()};
      const data = await fetchCryptoMarketChart(selectedCrypto, params);
      setCryptoData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getXAxisLabels = () => {
    switch (selectedDays) {
      case 1:
        return Array.from({length: 24}, (_, index) => `${index + 1}`);
      case 5:
        return Array.from({length: 5}, (_, index) => `${index + 1}`);
      case 7:
        return Array.from({length: 7}, (_, index) => `${index + 1}`);
      case 30:
        return Array.from({length: 4}, (_, index) => `${index + 1}`);
      default:
        return [];
    }
  };

  const toggleChartType = () => {
    setSelectedChartType(prevType => (prevType === 'line' ? 'bar' : 'line'));
  };

  const renderTopButtons = () => {
    return (
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={[styles.topButton, styles.selectedButton]}
          onPress={() => setSelectedCrypto('bitcoin')}>
          <Text style={styles.buttonText}>{selectedCrypto}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconButton,
            selectedChartType === 'bar' && styles.selectedButton,
          ]}
          onPress={toggleChartType}>
          <Icon
            name={selectedChartType === 'bar' ? 'bar-chart' : 'line-chart'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBottomButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, selectedDays === 1 && styles.selectedButton]}
          onPress={() => setSelectedDays(1)}>
          <Text style={styles.buttonText}>1 Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedDays === 5 && styles.selectedButton]}
          onPress={() => setSelectedDays(5)}>
          <Text style={styles.buttonText}>5 Days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedDays === 7 && styles.selectedButton]}
          onPress={() => setSelectedDays(7)}>
          <Text style={styles.buttonText}>7 Days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedDays === 30 && styles.selectedButton]}
          onPress={() => setSelectedDays(30)}>
          <Text style={styles.buttonText}>30 Days</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Options Trading</Text>
      {renderTopButtons()}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {selectedChartType === 'line' ? (
            <LineChart
              style={{flex: 1}}
              data={cryptoData}
              svg={{stroke: 'green'}}
              contentInset={{top: 20, bottom: 20}}
              curve={shape.curveNatural}
              animate={true}
              animationDuration={500}>
              <Grid />
            </LineChart>
          ) : (
            <BarChart
              style={{flex: 1}}
              data={cryptoData}
              svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
              contentInset={{top: 20, bottom: 20}}>
              <Grid />
            </BarChart>
          )}
          <YAxis
            data={cryptoData}
            contentInset={{top: 0, bottom: 20}}
            svg={{fontSize: 10, fill: 'white'}}
            style={{
              position: 'absolute',
              top: 20,
              bottom: 20,
              left: 0,
              marginLeft: 3,
            }}
          />
          <View style={{height: 20}}>
            <XAxis
              data={getXAxisLabels()}
              contentInset={{left: 10, right: 10}}
              svg={{fontSize: 10, fill: 'white'}}
              style={{marginHorizontal: 10}}
            />
          </View>
        </View>
      )}
      {renderBottomButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424242',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  topButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  button: {
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  selectedButton: {
    backgroundColor: '#689F38',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OptionsScreen;
