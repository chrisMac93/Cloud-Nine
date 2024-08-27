import axios from "axios";

const API_URL = "http://192.168.1.105:5000/api/weather";

export const getCurrentWeather = async (lat: string, lon: string) => {
  try {
    const response = await axios.get(`${API_URL}/current`, {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// export const getSunMoonData = async (lat: string, lon: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/sunmoon`, {
//       params: { lat, lon },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching sun and moon data:", error);
//     throw error;
//   }
// };

// export const getAirQuality = async (lat: string, lon: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/airquality`, {
//       params: { lat, lon },
//     });
//     console.log('Response Headers:', response.headers);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching air quality data:", error);
//     throw error;
//   }
// };

export const getPollenOutlook = async (lat: string, lon: string) => {
  try {
    const response = await axios.get(`${API_URL}/pollen`, {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pollen and allergy outlook:", error);
    throw error;
  }
};
