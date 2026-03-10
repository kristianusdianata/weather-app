import { defineStore } from "pinia";
import { useFetch } from "./useFetch";
import { useViewModel } from "./useViewModel";
import { format } from "date-fns";

export const useForecastStore = defineStore("forecastStore", () => {
  const { error, loading, forecast, getData, getDefaultData } = useFetch();

  const {
    getActiveUnit,
    forecastViewModel,
    activeDailyDate,
    unitSystem,
    setActiveDailyDate,
    changeActiveUnit,
    changeUnitsToImperial,
    changeUnitsToMetric,
    getHourlyWeatherByDailyDate,
  } = useViewModel(forecast);

  watch(forecast, (data) => {
    // reset active daily date whenever forecast updates
    activeDailyDate.value =
      data.daily.time[0] ?? format(new Date(), "yyyy-MM-dd");
  });

  return {
    error,
    loading,
    getData,
    getDefaultData,
    getActiveUnit,
    forecastViewModel,
    changeActiveUnit,
    changeUnitsToImperial,
    changeUnitsToMetric,
    activeDailyDate,
    unitSystem,
    setActiveDailyDate,
    getHourlyWeatherByDailyDate,
  };
});
