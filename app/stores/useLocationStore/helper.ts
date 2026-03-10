import type { Location } from "./types";

export function setLocationViewModel(location: Location) {
  return `${location.name}${location.admin1 ? `, ${location.admin1}` : ""}`;
}
