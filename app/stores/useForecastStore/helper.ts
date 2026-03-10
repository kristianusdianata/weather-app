import type { UnitKeys, UnitUnion, UnitValue } from "@/types";

type WeatherConverter = {
  [K in UnitKeys]: {
    [V in UnitValue<K>]: (value: number) => string;
  };
};

const CONVERTER: WeatherConverter = {
  temperature: {
    celsius: (value) => `${Math.round(value)}°`,
    fahrenheit: (value) => `${Math.round((value * 9) / 5 + 32)}°`,
  },
  wind_speed: {
    kmh: (value) => `${Math.round(value)} km/h`,
    mph: (value) => `${Math.round(value / 1.609344)} mph`,
  },
  precipitation: {
    mm: (value) => `${Math.round(value)} mm`,
    inch: (value) => `${Math.round(value / 25.4)} in`,
  },
} as const;

export function converter(props: UnitUnion, value: number): string {
  switch (props.key) {
    case "temperature":
      return CONVERTER.temperature[props.unit](value);

    case "wind_speed":
      return CONVERTER.wind_speed[props.unit](value);

    case "precipitation":
      return CONVERTER.precipitation[props.unit](value);
  }
}
