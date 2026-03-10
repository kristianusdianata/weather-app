import { defineStore } from "pinia";
import { useFetch } from "./useFetch";
import { setLocationViewModel } from "./helper";

export const useLocationStore = defineStore("locationStore", () => {
  const {
    loading,
    error,
    getData,
    location,
    locations,
    resetLocations,
    setLocation,
  } = useFetch();

  return {
    loading,
    error,
    getData,
    location,
    locations,
    resetLocations,
    setLocation,
    setLocationViewModel,
  };
});
