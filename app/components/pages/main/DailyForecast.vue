<script setup lang="ts">
import { WeatherIcon } from "~/components/icon";
import { useForecastStore } from "@/stores";
import { format } from "date-fns";
import { SkeletonLoading } from "@/components/loading";

const store = useForecastStore();
</script>

<template>
  <section class="daily">
    <h3 class="daily-title">Daily forecast</h3>
    <ul class="daily-list">
      <template v-if="store.loading">
        <li class="card card-item" v-for="n in 7" :key="n">
          <SkeletonLoading />
        </li>
      </template>

      <template v-else>
        <li
          class="card card-item"
          v-for="(daily, _) in store.forecastViewModel.daily"
          :key="daily.date"
        >
          <time :datetime="daily.date" class="card-title">
            {{ format(daily.date, "EEE") }}
          </time>

          <WeatherIcon
            :height="50"
            :width="50"
            :weather-code="daily.weather_code"
            class="weather-icon"
          />

          <div class="item-detail">
            <span class="detail-text">{{ daily.temperature_max }}</span>
            <span class="detail-text">{{ daily.temperature_min }}</span>
          </div>
        </li>
      </template>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.daily {
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-200)
  );
}

.daily-title {
  @include font-style($color: var(--neutral-0), $font-size: 17.6px);
  @include dm-sans($weight: 600);
}

.daily-list {
  @include grid($cols: repeat(3, 1fr), $gap: var(--spacing-150));

  @include media-query-md() {
    @include grid($cols: repeat(5, 1fr));
  }

  @include media-query-lg() {
    @include flexbox($display: flex, $direction: row);
  }
}

.card-item {
  @include layout-position($position: relative);
  @include flexbox(
    $display: flex,
    $direction: column,
    $align: center,
    $justify: space-between,
    $gap: var(--spacing-100)
  );
  @include layout-size($height: 135px);
  @include border($width: 1px, $style: solid, $color: var(--neutral-600));
}

.card-title {
  @include layout-size($width: 100%);
  @include font-style(
    $color: var(--neutral-0),
    $font-size: 17.6px,
    $text-align: center
  );
  @include dm-sans($weight: 500);
}

.weather-icon {
  @include layout-size($height: 50px, $width: 50px);
}

.item-detail {
  @include layout-size($width: 100%);
  @include flexbox(
    $display: inline-flex,
    $direction: row,
    $justify: space-between
  );

  @include media-query-sm() {
    @include flexbox($justify: space-around);
  }

  @include media-query-md() {
    @include flexbox($justify: space-between);
  }
}

.detail-text {
  @include font-style($font-size: 12.8px, $color: var(--neutral-0));
  @include dm-sans($weight: 600);
}
</style>
