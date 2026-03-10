<script setup lang="ts">
import { watch } from "vue";
import { useDropdown } from "./dropdown.context";

defineOptions({
  inheritAttrs: false,
});

const dropdown = useDropdown();
const props = defineProps<{
  ariaLabeledBy: string;
  nextItem?: () => void;
  prevItem?: () => void;
}>();

watch(
  [dropdown.isExpanded, dropdown.isFullyExpanded],
  ([isExpanded, isFullyExpanded]) => {
    if (isFullyExpanded && isExpanded && dropdown.menuItems.value.size > 0) {
      dropdown.setFocusOnFirstItem();
    }
  },
);

function onKeydown(event: KeyboardEvent) {
  const goNext = () =>
    props.nextItem ? props.nextItem() : dropdown.moveFocus({ direction: 1 });

  const goPrev = () =>
    props.prevItem ? props.prevItem() : dropdown.moveFocus({ direction: -1 });

  switch (event.key) {
    case "Tab":
      event.preventDefault();
      event.shiftKey ? goPrev() : goNext();
      break;

    case "ArrowDown":
      event.preventDefault();
      goNext();
      break;

    case "ArrowUp":
      event.preventDefault();
      goPrev();
      break;

    case "Escape":
      event.preventDefault();
      dropdown.closeMenu();
      break;
  }
}
</script>

<template>
  <div class="dropdown-menu">
    <Transition
      name="vertical-slide"
      @after-leave="dropdown.onMenuCloseComplete"
      @after-enter="dropdown.onMenuOpenComplete"
    >
      <div
        v-bind="$attrs"
        class="menu"
        role="menu"
        :aria-labelledby="props.ariaLabeledBy"
        v-if="dropdown.isExpanded.value"
        @keydown="onKeydown"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.dropdown-menu {
  @include layout-position(
    $position: absolute,
    $top: 130%,
    $right: 0px,
    $z-index: 99
  );
}

.menu {
  @include layout-position($position: relative, $z-index: 0);
  @include layout-size($min-width: 210px);
  @include border(
    $width: 1px,
    $style: solid,
    $color: var(--neutral-600),
    $radius: var(--spacing-100)
  );
  @include layout-spacing($padding: var(--spacing-100));
  @include layout-background($color: var(--neutral-800));
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-100)
  );
  opacity: 1;
}

.vertical-slide {
  &-enter-from,
  &-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition:
      transform 0.35s ease-in-out,
      opacity 0.35s ease-in-out;
  }
}
</style>
