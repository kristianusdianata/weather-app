<script setup lang="ts">
import { ErrorIcon } from "@/components/ui/icons";
</script>

<template>
  <div class="noresult">
    <ErrorIcon class="noresult-icon" />
    <span class="noresult-title">No results found.</span>
    <span class="noresult-desc"
      >We couldn&apos;t find any cities. Try searching with a different
      keyword.</span
    >
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.noresult {
  @include layout-spacing(
    $padding-inline: var(--spacing-200),
    $padding-block: var(--spacing-300)
  );
  @include flexbox(
    $display: flex,
    $direction: column,
    $align: center,
    $gap: var(--spacing-200)
  );
}

.noresult-icon {
  @include layout-size($height: 40px, $width: 40px);
}

.noresult-title {
  @include font-style($color: var(--neutral-0), $font-size: 17.6px);
  @include dm-sans($weight: 600);
}

.noresult-desc {
  @include font-style(
    $color: var(--neutral-200),
    $font-size: 14.4px,
    $text-align: center,
    $line-height: 1.4
  );
  @include dm-sans($weight: 600);
}
</style>
