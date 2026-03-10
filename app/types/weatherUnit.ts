import { UNIT_CONFIG } from "@/features/weather";

export type UnitKeys = (typeof UNIT_CONFIG)[number]["key"];

export type UnitValue<T extends UnitKeys> = Extract<
  (typeof UNIT_CONFIG)[number],
  { key: T }
>["unitList"][number]["value"];

export type UnitUnion = {
  [T in UnitKeys]: {
    key: T;
    unit: UnitValue<T>;
  };
}[UnitKeys];
