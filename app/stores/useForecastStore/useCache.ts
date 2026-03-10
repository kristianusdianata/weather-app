import type { ForecastCache, CacheKey, OpenMeteoResponse } from "./types";

const cacheTTL = 60 * 60 * 1000; // time to live forecast cache : 1 hour
const forecastCache = new Map<string, ForecastCache>();

export function useCache() {
  function generateKey(params: CacheKey) {
    return [
      "forecast",
      params.latitude,
      params.longitude,
      params.forecast_days,
      params.temperature_unit,
      params.wind_speed_unit,
      params.precipitation_unit,
      params.daily_unit,
      params.hourly_unit,
      params.current_unit,
    ].join(":");
  }

  function get(key: string) {
    return forecastCache.get(key);
  }

  function set(key: string, value: OpenMeteoResponse) {
    forecastCache.set(key, {
      data: value,
      timestamp: Date.now(),
    });
  }

  function isInvalid(key: string) {
    const now = Date.now();
    const cached = forecastCache.get(key);

    if (cached && now - cached.timestamp < cacheTTL) {
      return false;
    } else {
      return true;
    }
  }

  return {
    generateKey,
    get,
    set,
    isInvalid,
  };
}
