import { ref } from "vue";
import { useCache } from "./useCache";
import type { OpenMeteoResponse, Coordinate } from "./types";

// type CoordinateParams = Coordinate & { location: string };

const INIT_FORECAST: OpenMeteoResponse = {
  latitude: 0,
  longitude: 0,
  timezone: "",
  current: {
    time: "",
    apparent_temperature: 0,
    precipitation: 0,
    relative_humidity_2m: 0,
    temperature_2m: 0,
    weather_code: 0,
    wind_speed_10m: 0,
  },
  daily: {
    time: [],
    temperature_2m_min: [],
    temperature_2m_max: [],
    weather_code: [],
  },
  hourly: {
    time: [],
    temperature_2m: [],
    weather_code: [],
  },
};

const INIT_COORDS: Coordinate = {
  latitude: -6.1818,
  longitude: 106.8223,
  timezone: "Asia/Jakarta",
};

export function useFetch() {
  const cache = useCache();
  const loading = ref<boolean>(false);
  const error = ref<unknown | null>(null);
  const forecast = ref<OpenMeteoResponse>(INIT_FORECAST);
  /**
   * flag to indicate that the default data has been successfully fetched
   * to prevent double request on hydrant
   */
  const initialized = ref<boolean>(false);

  async function getData({ latitude, longitude, timezone }: Coordinate) {
    const dayRange = 7;
    const temperatureUnitDefault = "celsius";
    const windspeedUnitDefault = "kmh";
    const precipitationUnitDefault = "mm";
    const dailyUnit = "temperature_2m_max,temperature_2m_min,weather_code";
    const hourlyUnit = "temperature_2m,weather_code";
    const currentUnit =
      "temperature_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code,relative_humidity_2m";

    const key = cache.generateKey({
      latitude,
      longitude,
      forecast_days: dayRange,
      temperature_unit: temperatureUnitDefault,
      wind_speed_unit: windspeedUnitDefault,
      precipitation_unit: precipitationUnitDefault,
      daily_unit: dailyUnit,
      hourly_unit: hourlyUnit,
      current_unit: currentUnit,
    });

    // load data from cache
    if (cache.get(key) && !cache.isInvalid(key)) {
      const cachedData = cache.get(key)!;
      forecast.value = cachedData.data;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch<OpenMeteoResponse>(
        "https://api.open-meteo.com/v1/forecast",
        {
          query: {
            // location coordinate
            latitude,
            longitude,

            // forecast day range
            forecast_days: dayRange,

            // weather unit
            temperature_unit: temperatureUnitDefault,
            wind_speed_unit: windspeedUnitDefault,
            precipitation_unit: precipitationUnitDefault,

            // data fields
            daily: dailyUnit,
            hourly: hourlyUnit,
            current: currentUnit,
            timezone,
          },
          timeout: 5000,
          retry: 2,
          retryDelay: 500,
        },
      );

      forecast.value = res;

      // cache response
      cache.set(key, forecast.value);
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  }

  async function getDefaultData() {
    if (initialized.value) return;

    await getData(INIT_COORDS);
    initialized.value = true;
  }

  return {
    getData,
    getDefaultData,
    loading,
    error,
    forecast,
  };
}
