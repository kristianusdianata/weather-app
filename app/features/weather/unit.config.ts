export const UNIT_CONFIG = [
  {
    key: "temperature",
    label: "Temperature",
    unitList: [
      { value: "celsius", label: "Celsius (°C)" },
      { value: "fahrenheit", label: "Fahrenheit (°F)" },
    ],
  },
  {
    key: "wind_speed",
    label: "Wind Speed",
    unitList: [
      { value: "kmh", label: "km/h" },
      { value: "mph", label: "mph" },
    ],
  },
  {
    key: "precipitation",
    label: "Precipitation",
    unitList: [
      { value: "mm", label: "Millimeters (mm)" },
      { value: "inch", label: "Inches (in)" },
    ],
  },
] as const;
