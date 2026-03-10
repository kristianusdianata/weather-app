/**
 * Default unit :
 * 1. temperature : celsius
 * 2. wind speed : km/h
 * 3. precipitation: millimeter
 */

export type HourlyForecast = {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
};

export type CurrentForecast = {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  precipitation: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  weather_code: number;
};

/**
 * Daily forecast
 * range 7 days from today
 */
export type DailyForecast = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
};

export type Coordinate = {
  latitude: number;
  longitude: number;
  timezone: string;
};

/**
 * Openmeteo API response type
 */
export type OpenMeteoResponse = Coordinate & {
  current: CurrentForecast;
  hourly: HourlyForecast;
  daily: DailyForecast;
};

export type ForecastViewModel = Coordinate & {
  date: string;
  temperature: string;
  feels_like: string;
  precipitation: string;
  wind_speed: string;
  humidity: string;
  weather_code: number;
  daily: {
    date: string;
    temperature_min: string;
    temperature_max: string;
    weather_code: number;
    hourly: {
      time: string;
      temperature: string;
      weather_code: number;
    }[];
  }[];
};

export type ForecastCache = {
  data: OpenMeteoResponse;
  timestamp: number;
};

export type CacheKey = {
  latitude: number;
  longitude: number;
  forecast_days: number;
  temperature_unit: string;
  wind_speed_unit: string;
  precipitation_unit: string;
  daily_unit: string;
  hourly_unit: string;
  current_unit: string;
};
