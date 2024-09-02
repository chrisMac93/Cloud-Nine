import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import axios from "axios";
import { styled } from "nativewind";
import Card from "../components/Card";
import WeatherOverviewCard from "../components/WeatherOverviewCard";
import CurrentConditionsCard from "../components/CurrentConditionsCard";
import SunMoonCard from "../components/SunMoonCard";
import PollenLevelsCard from "../components/PollenLevelsCard";
import AirQualityCard from "../components/AirQualityCard";
import {
  getCurrentWeather as realGetCurrentWeather,
  getPollenOutlook as realGetPollenOutlook,
  getSunMoonData as realGetSunMoonData,
  getAirQuality as realGetAirQuality,
} from "../services/apiService";
import {
  getCurrentWeather as mockGetCurrentWeather,
  getPollenOutlook as mockGetPollenOutlook,
  getSunMoonData as mockGetSunMoonData,
  getAirQuality as mockGetAirQuality,
} from "../services/mockApiService";
import {
  PollenOutlook,
  WeatherData,
  SunMoonData,
  AirQualityData,
} from "../types/weather";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  getTimestamp,
} from "../services/localStorage";

const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);

const CACHE_KEY_WEATHER = "weatherData";
const CACHE_KEY_POLLEN = "pollenData";
const CACHE_KEY_TIMESTAMP = "dataTimestamp";
const CACHE_KEY_SUN_MOON = "sunMoonData";
const CACHE_KEY_AIR_QUALITY = "airQualityData";
const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes

export default function DashboardScreen() {
  const [weather, setWeather] = useState<WeatherData[] | null>(null);
  const [pollenData, setPollenData] = useState<PollenOutlook[] | null>(null);
  const [sunMoonData, setSunMoonData] = useState<SunMoonData | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  const fetchWeatherData = async (useMock = false) => {
    try {
      const lat = "38.093935";
      const lon = "-87.554348";

      console.log("Fetching weather data...");

      const getCurrentWeather = useMock
        ? mockGetCurrentWeather
        : realGetCurrentWeather;
      const getPollenOutlook = useMock
        ? mockGetPollenOutlook
        : realGetPollenOutlook;
      const getSunMoonData = useMock ? mockGetSunMoonData : realGetSunMoonData;
      const getAirQuality = useMock ? mockGetAirQuality : realGetAirQuality;

      const weatherData = await getCurrentWeather(lat, lon);
      const pollen = await getPollenOutlook(lat, lon);
      const sunMoon = await getSunMoonData(lat, lon);
      const airQuality = await getAirQuality(lat, lon);

      setWeather(weatherData);
      setPollenData(pollen);
      setSunMoonData(sunMoon);
      setAirQualityData(airQuality);
      setLoading(false);
      setUsingMockData(useMock);

      // Save data to local storage
      await saveToLocalStorage(CACHE_KEY_WEATHER, weatherData);
      await saveToLocalStorage(CACHE_KEY_POLLEN, pollen);
      await saveToLocalStorage(CACHE_KEY_SUN_MOON, sunMoon);
      await saveToLocalStorage(CACHE_KEY_AIR_QUALITY, airQuality);
      await saveToLocalStorage(CACHE_KEY_TIMESTAMP, getTimestamp());
    } catch (error) {
      console.error("Error fetching data:", error);
      if (
        !useMock &&
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 500
      ) {
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
      const cachedSunMoonData = await getFromLocalStorage(CACHE_KEY_SUN_MOON);
      const cachedAirQualityData = await getFromLocalStorage(
        CACHE_KEY_AIR_QUALITY
      );
      const cachedTimestamp = await getFromLocalStorage(CACHE_KEY_TIMESTAMP);

      if (
        cachedWeatherData &&
        cachedPollenData &&
        cachedSunMoonData &&
        cachedAirQualityData &&
        cachedTimestamp
      ) {
        const currentTime = getTimestamp();
        if (currentTime - cachedTimestamp < CACHE_EXPIRY_TIME) {
          console.log("Using cached data");
          setWeather(cachedWeatherData);
          setPollenData(cachedPollenData);
          setSunMoonData(cachedSunMoonData);
          setAirQualityData(cachedAirQualityData);
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
          <WeatherOverviewCard
            tonight={weather[0].TonightOutlook}
            tomorrow={weather[0].TomorrowWeatherText}
            date="SUN, SEP 1"
            className="mb-4 p-4 bg-gray-800/50 rounded shadow"
          />
          <CurrentConditionsCard
            temperature={Math.round(weather[0].Temperature.Imperial.Value)}
            realFeel={Math.round(weather[0].RealFeelTemperature.Imperial.Value)}
            wind={`${weather[0].Wind.Direction.Localized} ${weather[0].Wind.Speed.Imperial.Value} mph`}
            windGust={`${
              weather[0].WindGust?.Speed.Imperial.Value || "N/A"
            } mph`}
            humidity={weather[0].RelativeHumidity}
            indoorHumidity={`${weather[0].IndoorRelativeHumidity || "N/A"}%`}
            className="mb-4 p-4 bg-gray-800/50 rounded shadow"
          />
          {airQualityData && (
            <AirQualityCard
              index={airQualityData.index}
              category={airQualityData.category}
              pollutants={airQualityData.pollutants}
              className="mb-4 p-4 bg-gray-800/50 rounded shadow"
            />
          )}
          {sunMoonData && (
            <SunMoonCard
              sunrise={sunMoonData.sunrise}
              sunset={sunMoonData.sunset}
              moonrise={sunMoonData.moonrise}
              moonset={sunMoonData.moonset}
              phase={sunMoonData.phase}
              className="mb-4 p-4 bg-gray-800/50 rounded shadow"
            />
          )}
          {pollenData && pollenData.length > 0 && (
            <PollenLevelsCard
              pollenData={pollenData}
              className="mb-4 p-4 bg-gray-800/50 rounded shadow"
            />
          )}
          <StyledView className="h-6" />
        </>
      ) : (
        <StyledText className="text-white">
          No weather data available.
        </StyledText>
      )}
    </StyledScrollView>
  );
}
