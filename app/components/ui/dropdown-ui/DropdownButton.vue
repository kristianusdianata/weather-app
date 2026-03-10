<script setup lang="ts">
import { ref, watch } from "vue";
import { useDropdown } from "./dropdown.context";

defineOptions({
  inheritAttrs: false,
});

const buttonRef = ref<HTMLButtonElement | null>(null);
const dropdown = useDropdown();
const props = defineProps<{
  ariaControlId: string;
  disabled: boolean;
}>();

watch(
  [dropdown.isExpanded, dropdown.isFullyExpanded],
  ([isExpanded, isFullyExpanded]) => {
    if (!isExpanded && !isFullyExpanded && buttonRef.value) {
      buttonRef.value.focus();
    }
  },
);
</script>

<template>
  <div class="dropdown-button">
    <button
      v-bind="$attrs"
      ref="buttonRef"
      type="button"
      class="button button-dropdown"
      :aria-expanded="dropdown.isExpanded.value"
      aria-haspopup="menu"
      :disabled="props.disabled"
      :aria-controls="props.ariaControlId"
      @click="dropdown.toggleMenu"
    >
      <slot />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.dropdown-button {
  @include layout-size($height: 100%, $width: 100%);
}

.button-dropdown {
  @include layout-spacing(
    $padding-inline: var(--spacing-150),
    $padding-block: var(--spacing-100)
  );
  @include font-style($color: var(--neutral-200), $font-size: 16px);
  @include dm-sans($weight: 600);
  @include layout-background($color: var(--neutral-800));
  transition: background-color 0.25s ease-out;

  &:hover {
    @include layout-background($color: var(--neutral-600));
  }

  &:focus {
    outline: 2px solid var(--neutral-0);
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
