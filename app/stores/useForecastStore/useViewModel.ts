import type { UnitKeys, UnitValue } from "@/types";
import type { ForecastViewModel, OpenMeteoResponse } from "./types";
import type { Ref } from "vue";
import { watch } from "vue";
import { format } from "date-fns";
import { converter } from "./helper";

type WeatherUnitState = {
  [K in UnitKeys]: UnitValue<K>;
};

export function useViewModel(forecast: Ref<OpenMeteoResponse>) {
  const activeDailyDate = ref<string>(
    forecast.value.daily.time[0] ?? format(new Date(), "yyyy-MM-dd"),
  );
  const weatherUnits = ref<WeatherUnitState>({
    temperature: "celsius",
    precipitation: "mm",
    wind_speed: "kmh",
  });

  const unitSystem = ref<"metric" | "imperial">("metric");

  watch(
    () => weatherUnits.value,
    (units) => {
      const isMetric =
        units.temperature === "celsius" &&
        units.wind_speed === "kmh" &&
        units.precipitation === "mm";

      if (isMetric) {
        unitSystem.value = "metric";
        return;
      }

      const isImperial =
        units.temperature === "fahrenheit" &&
        units.wind_speed === "mph" &&
        units.precipitation === "inch";

      if (isImperial) {
        unitSystem.value = "imperial";
        return;
      }
    },
    { deep: true },
  );

  function setActiveDailyDate(date: string) {
    activeDailyDate.value = date;
  }

  function getActiveUnit(key: UnitKeys) {
    return weatherUnits.value[key];
  }

  function changeActiveUnit<T extends UnitKeys>({
    key,
    value,
  }: {
    key: T;
    value: WeatherUnitState[T];
  }) {
    weatherUnits.value[key] = value;
  }

  function changeUnitsToImperial() {
    weatherUnits.value = {
      temperature: "fahrenheit",
      wind_speed: "mph",
      precipitation: "inch",
    };
  }

  function changeUnitsToMetric() {
    weatherUnits.value = {
      temperature: "celsius",
      wind_speed: "kmh",
      precipitation: "mm",
    };
  }

  const hourlyGrouped = computed(() => {
    return forecast.value.hourly.time.reduce(
      (acc, time, index) => {
        const key = format(time, "yyyy-MM-dd");

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push({
          time,
          temperature: converter(
            {
              key: "temperature",
              unit: weatherUnits.value["temperature"],
            },
            forecast.value.hourly.temperature_2m[index] ?? 0,
          ),
          weather_code: forecast.value.hourly.weather_code[index] ?? -1,
        });

        return acc;
      },
      {} as Record<string, ForecastViewModel["daily"][number]["hourly"]>,
    );
  });

  // View-ready forecast data derived from SOT
  const forecastViewModel = computed<ForecastViewModel>(() => {
    const current = forecast.value.current;
    const daily = forecast.value.daily;

    return {
      longitude: forecast.value.longitude,
      latitude: forecast.value.latitude,
      timezone: forecast.value.timezone,
      date: current.time,
      humidity: `${current.relative_humidity_2m}%`,
      temperature: converter(
        {
          key: "temperature",
          unit: weatherUnits.value["temperature"],
        },
        current.temperature_2m,
      ),
      feels_like: converter(
        {
          key: "temperature",
          unit: weatherUnits.value["temperature"],
        },
        current.apparent_temperature,
      ),
      precipitation: converter(
        {
          key: "precipitation",
          unit: weatherUnits.value["precipitation"],
        },
        current.precipitation,
      ),
      wind_speed: converter(
        {
          key: "wind_speed",
          unit: weatherUnits.value["wind_speed"],
        },
        current.wind_speed_10m,
      ),
      weather_code: current.weather_code,
      daily: daily.time.map((date, index) => {
        return {
          date,
          temperature_min: converter(
            {
              key: "temperature",
              unit: weatherUnits.value["temperature"],
            },
            daily.temperature_2m_min[index] ?? 0,
          ),
          temperature_max: converter(
            {
              key: "temperature",
              unit: weatherUnits.value["temperature"],
            },
            daily.temperature_2m_max[index] ?? 0,
          ),
          weather_code: daily.weather_code[index] ?? -1,
          hourly: hourlyGrouped.value[date] ?? [],
        };
      }),
    };
  });

  function getHourlyWeatherByDailyDate(
    date: string,
  ): ForecastViewModel["daily"][number]["hourly"] {
    return (
      forecastViewModel.value.daily.find((weather) => weather.date === date)
        ?.hourly ?? []
    );
  }

  return {
    forecastViewModel,
    activeDailyDate,
    unitSystem,
    changeActiveUnit,
    changeUnitsToImperial,
    changeUnitsToMetric,
    getActiveUnit,
    setActiveDailyDate,
    getHourlyWeatherByDailyDate,
  };
}
