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
}

export interface SunMoonData {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  phase: string;
}

export interface AirQualityData {
  index: number;
  category: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
}

export interface HourlyWeatherData {
  DateTime: string;
  Temperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  RealFeelTemperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  condition: string;
}

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
  Pollen: PollenOutlook;
  TomorrowWeatherText: string;
  TodayOutlook: string;
  TonightOutlook: string;
  SunMoon: SunMoonData;
  AirQuality: AirQualityData;
}