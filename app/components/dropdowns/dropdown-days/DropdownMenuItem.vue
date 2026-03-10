<script setup lang="ts">
import { useForecastStore } from "@/stores";
import { useDropdown } from "@/components/ui/dropdown-ui";
import { isToday, parseISO, format, isValid } from "date-fns";

const store = useForecastStore();
const dropdown = useDropdown();

function onClick(date: string) {
  store.setActiveDailyDate(date);
  dropdown.closeMenu();
}
</script>

<template>
  <button
    class="button button-days"
    tabindex="-1"
    type="button"
    v-for="(daily, _) in store.forecastViewModel.daily"
    :ref="dropdown.handleMenuItemRef(daily.date)"
    @click="onClick(daily.date)"
  >
    {{ isToday(parseISO(daily.date)) ? "Today" : format(daily.date, "EEEE") }}
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/effects/index" as *;

.button-days {
  @include flexbox($justify: start);
  @include font-style($color: var(--neutral-0), $font-size: 14.4px);
  @include dm-sans($weight: 700);
  @include layout-spacing($padding: var(--spacing-100));
  @include underlay-slide-x($underlayBackground: var(--neutral-700));
  overflow: hidden;
  outline: none;

  &:hover {
    @include underlay-slide-x-active();
  }

  &:focus {
    outline: 1px solid var(--neutral-0);
  }
}
</style>
