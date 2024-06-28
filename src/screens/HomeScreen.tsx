import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {fetchCryptoMarkets} from '../services/apiService';

const HomeScreen = ({navigation}) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const data = await fetchCryptoMarkets({vs_currency: 'usd'});
      setCryptoData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const filteredCryptoData = cryptoData.filter(
    crypto =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getPriceChangeColor = change => {
    if (change > 0) {
      return '#4CAF50';
    } else if (change < 0) {
      return '#FF5733';
    } else {
      return '#fff';
    }
  };

  const openModal = crypto => {
    setSelectedCrypto(crypto);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crypto Dashboard</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search cryptocurrencies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyLabel="Search"
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <ScrollView keyboardShouldPersistTaps>
          {filteredCryptoData.map(crypto => (
            <TouchableOpacity
              key={crypto.id}
              style={styles.cryptoContainer}
              onPress={() => openModal(crypto)}>
              <View style={styles.cryptoInfo}>
                <Text style={styles.cryptoName}>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </Text>
                <Text
                  style={[
                    styles.cryptoPrice,
                    {color: getPriceChangeColor(crypto.price_change_24h)},
                  ]}>
                  ${crypto.current_price.toFixed(2)}
                </Text>
              </View>
              <View style={styles.priceChanges}>
                <Text style={styles.priceChangeLabel}>Price Change (24h):</Text>
                <Text style={styles.priceChangeValue}>
                  {crypto.price_change_24h.toFixed(2)} (
                  {crypto.price_change_percentage_24h.toFixed(2)}%)
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                {selectedCrypto && (
                  <>
                    <Text style={styles.modalHeader}>
                      {selectedCrypto.name} (
                      {selectedCrypto.symbol.toUpperCase()})
                    </Text>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalText}>
                        Current Price: $
                        {selectedCrypto.current_price.toFixed(2)}
                      </Text>
                      <Text style={styles.modalText}>
                        Market Cap: ${selectedCrypto.market_cap}
                      </Text>
                      <Text style={styles.modalText}>
                        Total Volume: ${selectedCrypto.total_volume}
                      </Text>
                      <Text style={styles.modalText}>
                        High (24h): ${selectedCrypto.high_24h}
                      </Text>
                      <Text style={styles.modalText}>
                        Low (24h): ${selectedCrypto.low_24h}
                      </Text>
                      <Text style={styles.modalText}>
                        Price Change (24h): $
                        {selectedCrypto.price_change_24h.toFixed(2)}
                      </Text>
                      <Text style={styles.modalText}>
                        Change (%) (24h):{' '}
                        {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.viewChartButton}
                      onPress={() => {
                        closeModal();
                        navigation.navigate('Options', {
                          selectedCrypto: selectedCrypto.id,
                        });
                      }}>
                      <Text style={styles.viewChartButtonText}>View Chart</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424242',
    padding: 6,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  cryptoContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingBottom: 8,
  },
  cryptoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cryptoName: {
    fontSize: 16,
    color: '#fff',
  },
  cryptoPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceChanges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceChangeLabel: {
    fontSize: 12,
    color: '#ccc',
  },
  priceChangeValue: {
    fontSize: 14,
    color: '#ccc',
  },
  viewChartButton: {
    alignSelf: 'center',
    marginVertical: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  viewChartButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#424242',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalContent: {
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
