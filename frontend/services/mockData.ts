export const mockWeatherData = [
    {
      WeatherText: "Sunny",
      Temperature: {
        Imperial: {
          Value: 75,
        },
      },
      RealFeelTemperature: {
        Imperial: {
          Value: 77,
        },
      },
      RealFeelTemperatureShade: {
        Imperial: {
          Value: 73,
        },
      },
      Wind: {
        Speed: {
          Imperial: {
            Value: 10,
          },
        },
        Direction: {
          Localized: "NW",
        },
      },
      WindGust: {
        Speed: {
          Imperial: {
            Value: 15,
          },
        },
      },
      UVIndexText: "Moderate",
      Visibility: {
        Imperial: {
          Value: 10,
        },
      },
      RelativeHumidity: 50,
      IndoorRelativeHumidity: 40,
      TomorrowWeatherText: "Partly cloudy with a chance of rain in the afternoon.",
      TodayOutlook: "Clear skies throughout the day with a high of 75°F.",
      TonightOutlook: "Clear and cool with a low of 55°F.",
    },
  ];
  
  export const mockPollenData = [
    {
      Name: "Tree Pollen",
      Category: "High",
      Text: "High levels of tree pollen",
    },
    {
      Name: "Grass Pollen",
      Category: "Moderate",
      Text: "Moderate levels of grass pollen",
    },
    {
      Name: "Ragweed Pollen",
      Category: "Low",
      Text: "Low levels of ragweed pollen",
    },
  ];

  export const mockSunMoonData = {
    sunrise: "6:00 AM",
    sunset: "8:00 PM",
    moonrise: "7:00 PM",
    moonset: "5:00 AM",
    phase: "Waxing Crescent",
  };
  
  export const mockAirQualityData = {
    index: 42,
    category: "Good",
    pollutants: {
      pm25: 12,
      pm10: 20,
      o3: 30,
      no2: 15,
      so2: 5,
      co: 0.4,
    },
  };