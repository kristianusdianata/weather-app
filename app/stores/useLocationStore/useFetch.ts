import type { Location, LocationResponse } from "./types";

const INIT_LOCATION: Location = {
  id: 6754874,
  name: "Jakarta Pusat",
  latitude: -6.1818,
  longitude: 106.8223,
  country_code: "ID",
  timezone: "Asia/Jakarta",
  country_id: 1643084,
  country: "Indonesia",
  admin1: "Jakarta",
};

export function useFetch() {
  const location = ref<Location>(INIT_LOCATION);
  const locations = ref<Location[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<unknown | null>(null);
  const debounceTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
  const totalLocations = 5;
  let requestId = 0; // to prevent race condition when request API

  function resetLocations() {
    locations.value = [];
  }

  async function getData(name: string) {
    const query = name.trim().toLowerCase();

    if (!query) {
      resetLocations();
      return;
    }

    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }

    const currentRequest = ++requestId;

    debounceTimeout.value = setTimeout(async () => {
      loading.value = true;
      error.value = null;

      try {
        const res = await $fetch<LocationResponse>(
          "https://geocoding-api.open-meteo.com/v1/search",
          {
            query: {
              name: name.toLowerCase().trim(),
              count: totalLocations,
              language: "en",
              format: "json",
            },
            timeout: 5000,
            retry: 2,
            retryDelay: 500,
          },
        );

        if (currentRequest !== requestId) return;
        locations.value = res.results ?? [];
      } catch (err) {
        if (currentRequest !== requestId) return;
        error.value = err;
      } finally {
        if (currentRequest === requestId) {
          loading.value = false;
        }
      }
    }, 400);
  }

  function setLocation(data: Location) {
    location.value = data;
  }

  return {
    getData,
    resetLocations,
    setLocation,
    loading,
    error,
    location,
    locations,
  };
}
