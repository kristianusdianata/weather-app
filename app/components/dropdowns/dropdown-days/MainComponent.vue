<script setup lang="ts">
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  provideDropdown,
} from "@/components/ui/dropdown-ui";
import DropdownMenuItem from "./DropdownMenuItem.vue";
import { ArrowDownIcon } from "@/components/ui/icons";
import { useForecastStore } from "@/stores";
import { capitalize } from "@/utils";
import { format, isToday } from "date-fns";

provideDropdown();
const store = useForecastStore();

function transformDatetoDay(date: string) {
  if (date === "") return "";

  const formatedDate = format(date, "yyyy-MM-dd");
  const day = isToday(formatedDate) ? "today" : format(formatedDate, "EEEE");
  return capitalize(day);
}
</script>

<template>
  <Dropdown>
    <DropdownButton
      id="dropdownButtonHourly"
      :ariaControlId="`dropdownMenuHourly`"
      :disabled="store.loading"
    >
      <span>{{ transformDatetoDay(store.activeDailyDate) }}</span>
      <ArrowDownIcon />
    </DropdownButton>

    <DropdownMenu
      id="dropdownMenuHourly"
      :ariaLabeledBy="`dropdownButtonHourly`"
    >
      <DropdownMenuItem />
    </DropdownMenu>
  </Dropdown>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

:deep(.button-dropdown) {
  @include font-style($font-size: 14px);
  @include layout-background($color: var(--neutral-600));
}
</style>
