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
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../constants/Colors';

const Watchlist = ({navigation}) => {
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
      return Colors.green;
    } else if (change < 0) {
      return Colors.red;
    } else {
      return Colors.primaryTextColor;
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
      <Text style={styles.header}>Watchlist</Text>
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color={Colors.primaryTextColor}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search & add"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyLabel="Search"
          placeholderTextColor={Colors.primaryTextColor}
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.secondaryTextColor} />
        </View>
      ) : (
        <ScrollView keyboardShouldPersistTaps="handled">
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
                      <View style={styles.modalRow}>
                        <Text style={styles.modalKey}>Current Price:</Text>
                        <Text style={styles.modalValue}>
                          ${selectedCrypto.current_price.toFixed(2)}
                        </Text>
                      </View>
                      <View style={styles.modalRow}>
                        <Text style={styles.modalKey}>Market Cap:</Text>
                        <Text style={styles.modalValue}>
                          ${selectedCrypto.market_cap}
                        </Text>
                      </View>
                      <View style={styles.modalRow}>
                        <Text style={styles.modalKey}>Total Volume:</Text>
                        <Text style={styles.modalValue}>
                          ${selectedCrypto.total_volume}
                        </Text>
                      </View>
                      <View style={styles.modalRow}>
                        <Text style={styles.modalKey}>High (24h):</Text>
                        <Text style={styles.modalValue}>
                          ${selectedCrypto.high_24h}
                        </Text>
                      </View>
                      <View style={styles.modalRow}>
                        <Text style={styles.modalKey}>Low (24h):</Text>
                        <Text style={styles.modalValue}>
                          ${selectedCrypto.low_24h}
                        </Text>
                      </View>
                      <View style={styles.modalRow}>
                        <Text style={styles.modalKey}>Price Change (24h):</Text>
                        <Text style={styles.modalValue}>
                          ${selectedCrypto.price_change_24h.toFixed(2)}
                        </Text>
                      </View>
                      <View style={styles.modalRow}>
                        <Text style={styles.modalKey}>Change (%) (24h):</Text>
                        <Text style={styles.modalValue}>
                          {selectedCrypto.price_change_percentage_24h.toFixed(
                            2,
                          )}
                          %
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.viewChartButton}
                      onPress={() => {
                        closeModal();
                        navigation.navigate('Options', {
                          selectedCrypto: selectedCrypto.id,
                        });
                      }}>
                      <Text style={styles.viewChartButtonText}>
                        <Icon
                          name="line-chart"
                          size={20}
                          color={Colors.primaryTextColor}
                        />{' '}
                        View Chart{' '}
                      </Text>
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
    backgroundColor: Colors.primaryColor,
    padding: 6,
  },
  header: {
    fontSize: 20,
    color: Colors.primaryTextColor,
    textAlign: 'left',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: Colors.primaryTextColor,
  },
  cryptoContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.disabledState,
    paddingBottom: 8,
  },
  cryptoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cryptoName: {
    fontSize: 14,
    color: Colors.primaryTextColor,
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
    color: Colors.secondaryTextColor,
  },
  priceChangeValue: {
    fontSize: 14,
    color: Colors.secondaryTextColor,
  },
  viewChartButton: {
    alignSelf: 'center',
    marginVertical: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewChartButtonText: {
    fontSize: 16,
    color: Colors.primaryTextColor,
    textAlign: 'center',
    marginRight: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.primaryColor,
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    color: Colors.primaryTextColor,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalContent: {
    marginBottom: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalKey: {
    fontSize: 14,
    color: Colors.primaryTextColor,
    width: '45%',
    textAlign: 'left',
  },
  modalValue: {
    fontSize: 14,
    color: Colors.primaryTextColor,
    width: '55%',
    textAlign: 'right',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Watchlist;
