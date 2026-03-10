<script setup lang="ts">
import { DropdownDays } from "@/components/dropdowns";
import { useForecastStore } from "@/stores";
import { WeatherIcon } from "~/components/icon";
import { format } from "date-fns";
import { SkeletonLoading } from "@/components/loading";

const store = useForecastStore();
const hourlyWeather = computed(() => {
  return store.getHourlyWeatherByDailyDate(store.activeDailyDate);
});
</script>
<!-- :key="weather.time" -->
<template>
  <section class="hourly">
    <header class="hourly-header">
      <h3 class="header-title">Hourly forecast</h3>
      <DropdownDays />
    </header>

    <ul class="hourly-list">
      <template v-if="store.loading">
        <li class="list-item list-item--onLoading" v-for="n in 8" :key="n">
          <SkeletonLoading />
        </li>
      </template>

      <template v-else>
        <TransitionGroup name="vertical-slide">
          <li
            class="list-item"
            v-for="(weather, index) in hourlyWeather"
            :key="`${store.activeDailyDate}-${weather.time}`"
          >
            <WeatherIcon
              :width="30"
              :height="30"
              :weatherCode="weather.weather_code"
              class="weather-icon"
            />
            <time :datetime="weather.time" class="weather-time">{{
              format(weather.time, "h a")
            }}</time>
            <span class="weather-temperature">{{ weather.temperature }}</span>
          </li>
        </TransitionGroup>
      </template>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.hourly {
  @include layout-size($width: 100%, $height: 610px);
  @include layout-background($color: var(--neutral-800));
  @include border(
    $width: 1px,
    $style: solid,
    $color: var(--neutral-600),
    $radius: var(--spacing-200)
  );
  @include layout-spacing($padding-block: var(--spacing-200));
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-150)
  );
}

.hourly-header {
  @include flexbox(
    $display: flex,
    $direction: row,
    $justify: space-between,
    $align: center
  );
  @include layout-spacing($padding-inline: var(--spacing-200));
}

.header-title {
  @include font-style($color: var(--neutral-0), $font-size: 17.6px);
  @include dm-sans($weight: 600);
}

.hourly-list {
  overflow: hidden;
  overflow-y: auto;
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-150)
  );

  &::-webkit-scrollbar {
    @include layout-size($width: 5px);
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    @include layout-background($color: var(--neutral-700));
    @include border(
      $width: 1px,
      $style: solid,
      $color: var(--neutral-600),
      $radius: 999px
    );
  }

  &::-webkit-scrollbar-thumb:hover {
    @include layout-background($color: var(--neutral-600));
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
}

.list-item {
  @include layout-position($position: relative);
  @include flexbox($display: flex, $align: center, $gap: var(--spacing-100));
  @include layout-spacing(
    $padding: var(--spacing-150),
    $margin-inline: var(--spacing-200)
  );
  @include border(
    $width: 1px,
    $style: solid,
    $color: var(--neutral-600),
    $radius: var(--spacing-100)
  );
  @include layout-background($color: var(--neutral-700));

  &--onLoading {
    @include layout-size($height: 55.5px);
  }
}

.weather-icon {
  @include layout-size($height: 30px, $width: 30px);
}

.weather-time {
  @include font-style($color: var(--neutral-0), $font-size: 17.6px);
  @include dm-sans($weight: 500);
}

.weather-temperature {
  margin-left: auto;
  @include font-style($color: var(--neutral-200), $font-size: 14.4px);
  @include dm-sans($weight: 600);
}

.vertical-slide {
  &-enter-from {
    transform: translateX(-40px);
    opacity: 0;
  }

  &-leave-to {
    transform: translateX(40px);
    opacity: 0;
  }

  &-move {
    transition: transform 0.35s ease;
  }

  &-leave-active,
  &-enter-active {
    transition: all 0.35s ease-in-out;
  }
}
</style>
