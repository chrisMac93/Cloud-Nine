import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Dimensions } from "react-native";
import axios from "axios";
import { styled } from "nativewind";
import { LineChart } from "react-native-chart-kit";
import { getHourlyWeather as realGetHourlyWeather } from "../services/apiService";
import { getHourlyWeather as mockGetHourlyWeather } from "../services/mockApiService";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  getTimestamp,
} from "../services/localStorage";
import { HourlyWeatherData } from "../types/weather"; // Import the type

const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);

const CACHE_KEY_HOURLY = "hourlyWeatherData";
const CACHE_KEY_TIMESTAMP = "hourlyDataTimestamp";
const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes

const HourlyScreen = () => {
  const [hourlyWeather, setHourlyWeather] = useState<
    HourlyWeatherData[] | null
  >(null); // Use the type
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  const fetchHourlyWeatherData = async (useMock = false) => {
    try {
      const lat = "38.093935";
      const lon = "-87.554348";

      console.log("Fetching hourly weather data...");

      const getHourlyWeather = useMock
        ? mockGetHourlyWeather
        : realGetHourlyWeather;

      const hourlyData = await getHourlyWeather(lat, lon);


      setHourlyWeather(hourlyData as HourlyWeatherData[]); // Type assertion
      setLoading(false);
      setUsingMockData(useMock);

      // Save data to local storage
      await saveToLocalStorage(CACHE_KEY_HOURLY, hourlyData);
      await saveToLocalStorage(CACHE_KEY_TIMESTAMP, getTimestamp());
    } catch (error) {
      console.error("Error fetching data:", error);
      if (
        !useMock &&
        axios.isAxiosError(error) &&
        (!error.response || error.response.status === 500)
      ) {
        console.log("Switching to mock data...");
        fetchHourlyWeatherData(true);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const loadCachedData = async () => {
      const cachedHourlyData = await getFromLocalStorage(CACHE_KEY_HOURLY);
      const cachedTimestamp = await getFromLocalStorage(CACHE_KEY_TIMESTAMP);

      console.log("Cached hourly data");
      console.log("Cached timestamp");

      if (cachedHourlyData && cachedTimestamp) {
        const currentTime = getTimestamp();
        if (currentTime - cachedTimestamp < CACHE_EXPIRY_TIME) {
          console.log("Using cached data");
          setHourlyWeather(cachedHourlyData as HourlyWeatherData[]); // Type assertion
          setLoading(false);
          return;
        }
      }

      console.log("Fetching new data");
      fetchHourlyWeatherData();
    };

    loadCachedData();
  }, []);

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-gray-900">
        <StyledText className="text-white">Loading...</StyledText>
      </StyledView>
    );
  }

  // Ensure the data is correctly formatted
  const formattedHourlyWeather =
    hourlyWeather?.map((hour) => ({
      time: hour.DateTime, // Adjust this based on your data structure
      temperature: hour.Temperature?.Value, // Adjust this based on your data structure
    })) || [];

  const chartData = {
    labels: formattedHourlyWeather.map((hour) => hour.time),
    datasets: [
      {
        data: formattedHourlyWeather.map((hour) => hour.temperature),
      },
    ],
  };

  console.log("Formatted hourly weather");
  console.log("Chart data");

  // Ensure no NaN values are passed to the chart
  const validChartData = chartData.datasets[0].data.every(
    (value) => !isNaN(value)
  );

  return (
    <StyledScrollView className="p-4 pt-6 mt-5 pb-20">
      {usingMockData && (
        <StyledView className="mb-4 p-2 bg-yellow-200 rounded">
          <StyledText className="text-yellow-800">
            Using mock data temporarily due to an error fetching real data.
          </StyledText>
        </StyledView>
      )}
      {hourlyWeather && hourlyWeather.length > 0 && validChartData ? (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width * 1.5} // Adjust the width as needed
          height={220}
          yAxisLabel=""
          yAxisSuffix="°F"
          chartConfig={{
            backgroundColor: "#1E2923",
            backgroundGradientFrom: "#08130D",
            backgroundGradientTo: "#08130D",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <StyledText className="text-white">
          No hourly weather data available.
        </StyledText>
      )}
    </StyledScrollView>
  );
};

export default HourlyScreen;
