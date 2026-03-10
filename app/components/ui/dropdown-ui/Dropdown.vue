<script setup lang="ts">
import { ref } from "vue";
import { useClickOutside } from "@/composables";
import { useDropdown } from "./dropdown.context";

const dropdownRef = ref<HTMLElement | null>(null);
const dropdown = useDropdown();

useClickOutside({
  targetRef: [dropdownRef],
  handler: dropdown.closeMenu,
});
</script>

<template>
  <div class="dropdown" ref="dropdownRef">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.dropdown {
  @include layout-position($position: relative);
}
</style>
