import axios from 'axios';
import {API_BASE_URL} from '@env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCryptoMarkets = async params => {
  try {
    const response = await apiClient.get('/coins/markets', {params});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCryptoMarketChart = async (cryptoId, params) => {
  try {
    const response = await apiClient.get(`/coins/${cryptoId}/market_chart`, {
      params,
    });
    return response.data.prices.map(price => price[1]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
