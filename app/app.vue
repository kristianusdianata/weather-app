<script lang="ts" setup>
import { LogoIcon } from "@/components/ui/icons";
import { DropdownUnits } from "@/components/dropdowns";
import { useForecastStore } from "@/stores";

const store = useForecastStore();

// request default data
await store.getDefaultData();
</script>

<template>
  <div class="container">
    <div class="wrapper-container">
      <header class="header">
        <LogoIcon />
        <DropdownUnits />
      </header>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.container {
  @include layout-size($width: 100%);
  @include layout-spacing($margin: auto);

  @include media-query-md() {
    @include layout-size($max-width: 850px);
  }

  @include media-query-lg() {
    @include layout-size($max-width: 1280px);
  }
}

.wrapper-container {
  @include layout-spacing(
    $padding-inline: var(--spacing-200),
    $padding-block: var(--spacing-300)
  );
}

.header {
  @include flexbox($display: flex, $justify: space-between, $align: center);
}
</style>
