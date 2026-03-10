<script setup lang="ts">
import { useCombobox } from "@/components/ui/combobox-ui";
import { useLocationStore } from "@/stores";

const combobox = useCombobox();
const store = useLocationStore();
const emit = defineEmits<{
  (e: "select-menu-item"): void;
}>();

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
</script>

<template>
  <div
    role="option"
    class="menu-item"
    v-for="(location, index) in store.locations"
    :key="location.id"
    :id="`${slug(location.name)}-${location.admin1 ? slug(location.admin1) : index}`"
    :aria-selected="combobox.focusedItemId.value === `${location.id}`"
    :ref="combobox.handleMenuItemRef(`${location.id}`)"
    @mouseenter="combobox.setFocusedItemId(`${location.id}`)"
    @click="emit('select-menu-item')"
  >
    <NuxtImg
      v-if="location.country_code"
      :src="`https://hatscripts.github.io/circle-flags/flags/${location.country_code.toLowerCase()}.svg`"
      width="20"
      height="20"
      class="flag-image"
      placeholder
    />
    <div class="flag-image-placeholder" v-else />
    <span class="country-text">{{ store.setLocationViewModel(location) }}</span>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/effects/index" as *;

.menu-item {
  @include font-style($color: var(--neutral-200), $font-size: 16px);
  @include layout-spacing($padding: var(--spacing-200));
  @include dm-sans($weight: 600);
  @include underlay-slide-x($underlayBackground: var(--neutral-700));
  @include flexbox(
    $display: inline-flex,
    $gap: var(--spacing-200),
    $align: center
  );

  &[aria-selected="true"] {
    @include underlay-slide-x-active();
  }
}

.flag-image {
  @include layout-size($width: 20px, $height: 20px);
}

.flag-image-placeholder {
  @include layout-size($width: 20px, $height: 20px);
  @include border(
    $width: 1px,
    $style: solid,
    $color: var(--neutral-300),
    $radius: 50%
  );
  @include layout-background($color: var(--neutral-600));
}

.country-text {
  @include font-style($color: var(--neutral-200), $font-size: 16px);
  @include dm-sans($weight: 600);
}
</style>
