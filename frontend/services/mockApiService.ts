import { mockWeatherData, mockPollenData } from "./mockData";

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