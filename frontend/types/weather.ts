export interface Temperature {
    Value: number;
    Unit: string;
    UnitType: number;
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
    // Add other relevant fields if needed
  }