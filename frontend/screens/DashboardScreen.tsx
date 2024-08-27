import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import { getCurrentWeather, getPollenOutlook } from "../services/apiService";
import { PollenOutlook, WeatherData } from "../types/weather";

export default function DashboardScreen() {
  const [weather, setWeather] = useState<WeatherData[] | null>(null);
  const [pollenData, setPollenData] = useState<PollenOutlook[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const lat = "38.093935";
        const lon = "-87.554348";

        console.log("Fetching weather data...");

        const weatherData = await getCurrentWeather(lat, lon);
        console.log("Weather data received:", weatherData);

        const pollen = await getPollenOutlook(lat, lon);

        setWeather(weatherData);
        setPollenData(pollen);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {weather && weather.length > 0 ? (
        <>
          <Card
            title={`${weather[0].WeatherText}`}
            content={`High: ${Math.round(
              weather[0].Temperature.Imperial.Value
            )}°F - Description of tomorrow's weather`}
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
            />
          )}
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
