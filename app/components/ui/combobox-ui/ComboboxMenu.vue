<script setup lang="ts">
import { useCombobox } from "./combobox.context";

defineOptions({
  inheritAttrs: false,
});

const combobox = useCombobox();
const props = defineProps<{
  ariaLabelBy: string;
}>();
</script>

<template>
  <div class="combobox-menu">
    <Transition name="vertical-slide">
      <div
        v-bind="$attrs"
        class="menu"
        role="listbox"
        :aria-labelledby="props.ariaLabelBy"
        v-if="combobox.isExpanded.value"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.combobox-menu {
  @include layout-position(
    $position: absolute,
    $top: 55%,
    $right: 0,
    $left: 0,
    $z-index: 2
  );
  @include border($radius: var(--spacing-100));
  overflow: hidden;

  @include media-query-sm() {
    @include layout-position($top: 120%);
  }
}

.menu {
  @include layout-background($color: var(--neutral-800));
  @include layout-position($position: relative, $z-index: 0);
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-50));
}

.vertical-slide {
  &-enter-from,
  &-leave-to {
    transform: scaleY(0);
  }

  &-enter-active,
  &-leave-active {
    transform-origin: top;
    transition:
      transform 0.35s ease-in-out,
      opacity 0.35s ease-in-out;
  }
}
</style>
