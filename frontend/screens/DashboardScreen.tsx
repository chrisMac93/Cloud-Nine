import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import axios from "axios";
import { styled } from "nativewind";
import Card from "../components/Card";
import { getCurrentWeather as realGetCurrentWeather, getPollenOutlook as realGetPollenOutlook } from "../services/apiService";
import { getCurrentWeather as mockGetCurrentWeather, getPollenOutlook as mockGetPollenOutlook } from "../services/mockApiService";
import { PollenOutlook, WeatherData } from "../types/weather";
import { saveToLocalStorage, getFromLocalStorage, getTimestamp } from "../services/localStorage";

const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);

const CACHE_KEY_WEATHER = "weatherData";
const CACHE_KEY_POLLEN = "pollenData";
const CACHE_KEY_TIMESTAMP = "dataTimestamp";
const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes

export default function DashboardScreen() {
  const [weather, setWeather] = useState<WeatherData[] | null>(null);
  const [pollenData, setPollenData] = useState<PollenOutlook[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  const fetchWeatherData = async (useMock = false) => {
    try {
      const lat = "38.093935";
      const lon = "-87.554348";

      console.log("Fetching weather data...");

      const getCurrentWeather = useMock ? mockGetCurrentWeather : realGetCurrentWeather;
      const getPollenOutlook = useMock ? mockGetPollenOutlook : realGetPollenOutlook;

      const weatherData = await getCurrentWeather(lat, lon);
      const pollen = await getPollenOutlook(lat, lon);

      setWeather(weatherData);
      setPollenData(pollen);
      setLoading(false);
      setUsingMockData(useMock);

      // Save data to local storage
      await saveToLocalStorage(CACHE_KEY_WEATHER, weatherData);
      await saveToLocalStorage(CACHE_KEY_POLLEN, pollen);
      await saveToLocalStorage(CACHE_KEY_TIMESTAMP, getTimestamp());
    } catch (error) {
      console.error("Error fetching data:", error);
      if (!useMock && axios.isAxiosError(error) && error.response && error.response.status === 500) {
        console.log("Switching to mock data...");
        fetchWeatherData(true);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const loadCachedData = async () => {
      const cachedWeatherData = await getFromLocalStorage(CACHE_KEY_WEATHER);
      const cachedPollenData = await getFromLocalStorage(CACHE_KEY_POLLEN);
      const cachedTimestamp = await getFromLocalStorage(CACHE_KEY_TIMESTAMP);

      if (cachedWeatherData && cachedPollenData && cachedTimestamp) {
        const currentTime = getTimestamp();
        if (currentTime - cachedTimestamp < CACHE_EXPIRY_TIME) {
          console.log("Using cached data");
          setWeather(cachedWeatherData);
          setPollenData(cachedPollenData);
          setLoading(false);
          return;
        }
      }

      console.log("Fetching new data");
      fetchWeatherData();
    };

    loadCachedData();
  }, []);

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText>Loading...</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledScrollView className="p-4 pt-6 mt-5 pb-20">
      {usingMockData && (
        <StyledView className="mb-4 p-2 bg-yellow-200 rounded">
          <StyledText className="text-yellow-800">
            Using mock data temporarily due to an error fetching real data.
          </StyledText>
        </StyledView>
      )}
      {weather && weather.length > 0 ? (
        <>
          <Card
            title="Weather Overview"
            content={`Tomorrow: ${weather[0].TomorrowWeatherText}\n
                      Today: ${weather[0].TodayOutlook}\n
                      Tonight: ${weather[0].TonightOutlook}`}
            icon="sunny"
          />
          <Card
            title="Current Conditions"
            content={`Temp: ${Math.round(
              weather[0].Temperature.Imperial.Value
            )}°F\n
                      RealFeel: ${Math.round(
                        weather[0].RealFeelTemperature.Imperial.Value
                      )}°F\n
                      RealFeel Shade: ${Math.round(
                        weather[0].RealFeelTemperatureShade.Imperial.Value
                      )}°F\n
                      Wind: ${weather[0].Wind.Speed.Imperial.Value} mph ${
              weather[0].Wind.Direction.Localized
            }\n
                      Wind Gust: ${
                        weather[0].WindGust?.Speed.Imperial.Value || "N/A"
                      } mph\n
                      UV Index: ${weather[0].UVIndexText}\n
                      Visibility: ${
                        weather[0].Visibility.Imperial.Value
                      } miles\n
                      Humidity: ${weather[0].RelativeHumidity}%\n
                      Indoor Humidity: ${
                        weather[0].IndoorRelativeHumidity || "N/A"
                      }%`}
            icon="water"
          />
          {pollenData && pollenData.length > 0 && (
            <Card
              title="Pollen Levels"
              content={pollenData
                .map((pollen) => {
                  const message =
                    pollen.Category.toLowerCase() === "high" ||
                    pollen.Category.toLowerCase() === "very high"
                      ? ` - ${pollen.Text || ""}`
                      : "";
                  return `${pollen.Name}: ${pollen.Category}${message}`;
                })
                .join("\n")}
              icon="leaf"
            />
          )}
          <StyledView className="h-6" />
        </>
      ) : (
        <StyledText>No weather data available.</StyledText>
      )}
    </StyledScrollView>
  );
}