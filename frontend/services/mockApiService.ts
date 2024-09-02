import {
  mockWeatherData,
  mockPollenData,
  mockSunMoonData,
  mockAirQualityData,
  mockHourlyWeatherData,
} from "./mockData";

export const getCurrentWeather = async (lat: string, lon: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData);
    }, 500); // Simulate network delay
  });
};

export const getPollenOutlook = async (lat: string, lon: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPollenData);
    }, 500); // Simulate network delay
  });
};

export const getSunMoonData = async (lat: string, lon: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSunMoonData);
    }, 500); // Simulate network delay
  });
};

export const getAirQuality = async (lat: string, lon: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAirQualityData);
    }, 500); // Simulate network delay
  });
};

export const getHourlyWeather = async (lat: string, lon: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHourlyWeatherData);
    }, 500); // Simulate network delay
  });
};
