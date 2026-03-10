<script setup lang="ts">
import { WeatherIcon } from "~/components/icon";
import { DotLoading } from "@/components/loading";
import { useForecastStore, useLocationStore } from "@/stores";
import { format } from "date-fns";

const storeForecast = useForecastStore();
const storeLocation = useLocationStore();

const weatherList = computed(() => {
  return [
    {
      key: "feel_like",
      label: "Feels Like",
      value: storeForecast.forecastViewModel.feels_like,
    },
    {
      key: "humidity",
      label: "Humidity",
      value: storeForecast.forecastViewModel.humidity,
    },
    {
      key: "wind_speed",
      label: "Wind",
      value: storeForecast.forecastViewModel.wind_speed,
    },
    {
      key: "precipitation",
      label: "Precipitation",
      value: storeForecast.forecastViewModel.precipitation,
    },
  ];
});
</script>

<template>
  <div class="current">
    <header class="current-header">
      <DotLoading v-if="storeForecast.loading" />

      <template v-else>
        <h2 class="header-heading">
          <span class="heading-location">{{
            storeLocation.setLocationViewModel(storeLocation.location)
          }}</span>
          <span class="heading-date">{{
            format(storeForecast.forecastViewModel.date, "EEEE, MMM d, yyyy")
          }}</span>
        </h2>

        <div class="header-desc">
          <WeatherIcon
            :height="100"
            :width="100"
            :weather-code="storeForecast.forecastViewModel.weather_code"
            class="weather-icon"
          />
          <span class="desc-temperature">{{
            storeForecast.forecastViewModel.temperature
          }}</span>
        </div>
      </template>
    </header>

    <dl class="current-detail">
      <div
        class="card card-item"
        v-for="(weather, _) in weatherList"
        :key="weather.key"
      >
        <dt class="item-title">{{ weather.label }}</dt>
        <dd class="item-desc">
          {{ storeForecast.loading ? "-" : weather.value }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.current {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-150)
  );
}

.current-header {
  @include layout-position($position: relative);
  @include layout-size($height: 280px);
  @include layout-spacing($padding: var(--spacing-400));
  @include layout-background($image: url("/bg-today-small.svg"), $size: cover);
  @include border($radius: var(--spacing-200));
  overflow: hidden;
  @include flexbox(
    $display: flex,
    $direction: column,
    $justify: center,
    $align: center,
    $gap: var(--spacing-200)
  );

  @include media-query-sm() {
    @include layout-background($image: url("/bg-today-large.svg"));
  }

  @include media-query-md() {
    @include flexbox($direction: row, $justify: space-between);
  }
}

.current-detail {
  @include grid($cols: repeat(2, 1fr), $gap: var(--spacing-150));

  @include media-query-md() {
    @include flexbox($display: flex, $direction: row);
  }
}

.header-heading {
  @include flexbox(
    $display: flex,
    $direction: column,
    $align: center,
    $justify: end,
    $gap: var(--spacing-100)
  );
}

.heading-location {
  @include font-style(
    $color: var(--neutral-0),
    $font-size: 25.6px,
    $text-align: center,
    $line-height: 1.2
  );
  @include dm-sans($weight: 700);
}

.heading-date {
  @include font-style(
    $color: var(--neutral-200),
    $font-size: 17.6px,
    $text-align: center
  );
  @include dm-sans($weight: 500);
}

.header-desc {
  @include flexbox(
    $display: flex,
    $direction: row,
    $gap: var(--spacing-200),
    $align: center,
    $justify: center
  );
}

.weather-icon {
  @include layout-size($height: 100px, $width: 100px);
}

.desc-temperature {
  @include font-style(
    $color: var(--neutral-0),
    $font-size: 80px,
    $font-style: italic
  );
  @include dm-sans($weight: 600);
}

.card-item {
  @include layout-position($position: relative);
  @include flexbox($display: flex, $direction: column, $justify: space-between);
  @include layout-size($height: 110px);
  @include layout-spacing($padding-block: var(--spacing-300));
  @include border($width: 1px, $style: solid, $color: var(--neutral-600));
}

.item-title {
  @include font-style($color: var(--neutral-200), $font-size: 17.6px);
  @include dm-sans($weight: 500);
}

.item-desc {
  @include font-style($color: var(--neutral-0), $font-size: 25.6px);
  @include dm-sans($weight: 300);
}
</style>
