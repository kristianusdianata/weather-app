<script setup lang="ts">
import { ComboboxSearch } from "@/components/combobox";
import { useForecastStore } from "@/stores";
import CurrentForecast from "./CurrentForecast.vue";
import DailyForecast from "./DailyForecast.vue";
import HourlyForecast from "./HourlyForecast.vue";

const store = useForecastStore();
</script>

<template>
  <article class="article">
    <header class="article-header">
      <h1 class="header-title">How&apos;s the sky looking today?</h1>
      <ComboboxSearch />
    </header>

    <article class="article-content">
      <CurrentForecast class="current-section" />
      <DailyForecast class="daily-section" />
      <HourlyForecast class="hourly-section" />
    </article>
  </article>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.article {
  @include layout-spacing($padding-block: var(--spacing-300));
}

.article-header {
  @include flexbox(
    $display: flex,
    $align: center,
    $justify: center,
    $direction: column,
    $gap: var(--spacing-400)
  );
  @include layout-spacing($padding-block: 0 var(--spacing-500));
}

.header-title {
  @include font-style(
    $font-size: 2.9rem,
    $color: var(--neutral-0),
    $text-align: center
  );
  @include bricolage-grotesque($weight: 700);
  @include layout-spacing($padding-block: var(--spacing-300));
  @include layout-size($width: 100%);

  @include media-query-md() {
    @include layout-size($width: 500px);
  }

  @include media-query-lg() {
    @include layout-size($width: 100%);
  }
}

.article-content {
  @include grid($cols: 1fr, $gap: var(--spacing-400));

  @include media-query-lg() {
    @include grid($cols: 2fr 1fr);
  }
}

.current-section {
  @include media-query-lg() {
    @include grid-position($col: 1, $row: 1);
  }
}

.daily-section {
  @include media-query-lg() {
    @include grid-position($col: 1, $row: 2);
  }
}

.hourly-section {
  @include media-query-lg() {
    @include grid-position($col: 2, $row: 1 / span 2);
  }
}
</style>
