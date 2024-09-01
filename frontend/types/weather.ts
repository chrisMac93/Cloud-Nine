export interface Temperature {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase: string;
}

export interface Wind {
  Speed: {
    Metric: Temperature;
    Imperial: Temperature;
  };
  Direction: {
    Degrees: number;
    Localized: string;
  };
}
export interface WindGust {
  Speed: {
    Metric: Temperature;
    Imperial: Temperature;
  };
}

export interface Visibility {
  Metric: Temperature;
  Imperial: Temperature;
}

export interface Pressure {
  Metric: Temperature;
  Imperial: Temperature;
}

export interface PollenOutlook {
    Name: string;
    Value: number;
    Category: string;
    Text: string;
    // Add any other fields as needed
  }
// export interface SunMoonTimes {
//   Rise: string; // Time format could be adjusted as per API response
//   Set: string;
// }

// export interface MoonPhase {
//   Name: string;
//   Icon: number;
//   Code: string;
// }

// export interface AirQuality {
//   Value: number;
//   Category: string;
//   Type: string;
// }

// export interface PollenOutlook {
//   Name: string;
//   Value: number;
//   Category: string;
// }

export interface WeatherData {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: Temperature;
    Imperial: Temperature;
  };
  RealFeelTemperature: {
    Metric: Temperature;
    Imperial: Temperature;
  };
  RealFeelTemperatureShade: {
    Metric: Temperature;
    Imperial: Temperature;
  };
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  Wind: Wind;
  WindGust: WindGust;
  UVIndex: number;
  UVIndexText: string;
  Visibility: Visibility;
  Pressure: Pressure;
//   AirAndPollen: AirQuality[]; // Array to accommodate different types of air quality metrics
//   Sun: SunMoonTimes; // Sunrise and Sunset
//   Moon: SunMoonTimes & { Phase: MoonPhase }; // Moonrise, Moonset, and Phase
  Pollen: PollenOutlook; 
  TomorrowWeatherText: string;
  TodayOutlook: string;
  TonightOutlook: string;
}
