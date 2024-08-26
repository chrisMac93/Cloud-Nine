import axios from 'axios';

const API_URL = 'http://192.168.1.105:5000/api/weather';

export const getCurrentWeather = async (lat: string, lon: string) => {
  try {
    const response = await axios.get(`${API_URL}/current`, {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};