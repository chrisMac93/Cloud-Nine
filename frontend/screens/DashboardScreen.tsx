import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import { getCurrentWeather } from "../services/apiService";
import { WeatherData } from "../types/weather";

export default function DashboardScreen() {
  const [weather, setWeather] = useState<WeatherData[] | null>(null); // Updated to use WeatherData[] type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Replace these with the desired latitude and longitude
        const lat = "38.093935";
        const lon = "-87.554348";

        const weatherData = await getCurrentWeather(lat, lon);
        setWeather(weatherData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const convertToFahrenheit = (celsius: number) => {
    return Math.round(celsius * 9/5) + 32;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {weather && weather.length > 0 ? (
        <>
          <Card
            title="Current Temperature"
            content={`${convertToFahrenheit(weather[0].Temperature.Metric.Value)}°F`}
          />
          <Card title="Weather" content={weather[0].WeatherText} />
          {/* Add more cards for additional weather information */}
        </>
      ) : (
        <Text>No weather data available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
