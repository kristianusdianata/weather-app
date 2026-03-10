export type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  timezone: string;
  country_id: number;
  country: string;
  admin1: string;
};

export type LocationResponse = {
  results?: Location[];
};
