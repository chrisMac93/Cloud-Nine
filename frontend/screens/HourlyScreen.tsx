import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
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
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const fetchHourlyWeatherData = async (useMock = false) => {
    try {
      const lat = "38.093935";
      const lon = "-87.554348";

      console.log("Fetching hourly weather data...");

      const getHourlyWeather = useMock
        ? mockGetHourlyWeather
        : realGetHourlyWeather;

      const hourlyData = await getHourlyWeather(lat, lon);

      console.log("Fetched hourly data:", hourlyData);

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

      console.log("Cached hourly data:", cachedHourlyData);
      console.log("Cached timestamp:", cachedTimestamp);

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
      time: new Date(hour.DateTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }), // 24-hour format
      temperature: hour.Temperature?.Value, // Adjust this based on your data structure
      realFeel: hour.RealFeelTemperature?.Value, // Adjust this based on your data structure
    })) || [];

  const chartData = {
    labels: formattedHourlyWeather.map((hour) => hour.time),
    datasets: [
      {
        data: formattedHourlyWeather.map((hour) => hour.temperature),
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Line color
        strokeWidth: 2, // Line thickness
      },
    ],
  };

  console.log("Formatted hourly weather:", formattedHourlyWeather);
  console.log("Chart data:", chartData);

  // Ensure no NaN values are passed to the chart
  const validChartData = chartData.datasets[0].data.every(
    (value) => !isNaN(value)
  );

  const handlePanResponderMove = (
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const { moveX } = gestureState;
    const chartWidth = Dimensions.get("window").width * 2;
    const index = Math.round(
      (moveX / chartWidth) * formattedHourlyWeather.length
    );
    setHighlightedIndex(index);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

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
        <View>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 300,
              width: 50,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <ScrollView horizontal {...panResponder.panHandlers}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                {chartData.labels.map((label, index) => (
                  <Text
                    key={index}
                    style={{
                      color: "white",
                      fontSize: 12,
                      textAlign: "center",
                      width: 50,
                    }}
                  >
                    {label}
                  </Text>
                ))}
              </View>
              <LineChart
                data={chartData}
                width={Dimensions.get("window").width * 2} // Adjust the width as needed
                height={300}
                yAxisLabel=""
                yAxisSuffix=""
                withVerticalLabels={false}
                withHorizontalLabels={false}
                withInnerLines={false}
                withOuterLines={false}
                withShadow={false}
                chartConfig={{
                  backgroundColor: "#1a1a1a",
                  backgroundGradientFrom: "#1a1a1a",
                  backgroundGradientTo: "#1a1a1a",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "4",
                    strokeWidth: "1",
                    stroke: "#ffffff",
                    fill: "#ffffff",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                renderDotContent={({ x, y, index }) => (
                  <View
                    key={index}
                    style={{ position: "absolute", top: y - 20, left: x - 10 }}
                  >
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {chartData.datasets[0].data[index]}°F
                    </Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <StyledText className="text-white">
          No hourly weather data available.
        </StyledText>
      )}
      {highlightedIndex !== null &&
        formattedHourlyWeather[highlightedIndex] && (
          <StyledView className="mt-4 p-4 bg-gray-800 rounded flex-row justify-between">
            <StyledView>
              <StyledText className="text-white text-lg">
                Temperature
              </StyledText>
              <StyledText className="text-white text-2xl">
                {formattedHourlyWeather[highlightedIndex].temperature}°F
              </StyledText>
            </StyledView>
            <StyledView>
              <StyledText className="text-white text-lg">Real Feel</StyledText>
              <StyledText className="text-white text-2xl">
                {formattedHourlyWeather[highlightedIndex].realFeel}°F
              </StyledText>
            </StyledView>
          </StyledView>
        )}
    </StyledScrollView>
  );
};

export default HourlyScreen;
