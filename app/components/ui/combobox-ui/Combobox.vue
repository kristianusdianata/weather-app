<script setup lang="ts">
import { useCombobox } from "./combobox.context";
import { useClickOutside } from "@/composables";

const combobox = useCombobox();
const comboboxRef = ref<HTMLElement | null>(null);

useClickOutside({
  targetRef: [comboboxRef],
  handler: combobox.closeMenu,
});
</script>

<template>
  <form class="combobox" ref="comboboxRef" @click.prevent>
    <slot />
  </form>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.combobox {
  @include grid($cols: 1fr, $gap: var(--spacing-150));
  @include layout-size($width: 100%);
  @include layout-position($position: relative);

  @include media-query-sm() {
    @include grid($cols: 5fr 1fr);
  }
}
</style>
