<script lang="ts" setup>
import { useDropdown } from "@/components/ui/dropdown-ui";
import { CheckIcon } from "@/components/ui/icons";
import { UNIT_CONFIG } from "@/features/weather";
import { useForecastStore } from "@/stores";

const dropdown = useDropdown();
const store = useForecastStore();

function onSwitchUnitSystem() {
  if (store.unitSystem === "metric") {
    store.changeUnitsToImperial();
  } else {
    store.changeUnitsToMetric();
  }
}
</script>

<template>
  <button
    id="switchUnitSystem"
    type="button"
    class="button button-item"
    :ref="dropdown.handleMenuItemRef(`switchUnitSystemButton`)"
    tabindex="-1"
    @click="onSwitchUnitSystem"
  >
    {{ `Switch to ${store.unitSystem}` }}
  </button>

  <div
    class="group-menu"
    v-for="(value, _) in UNIT_CONFIG"
    :key="value.key"
    role="group"
    aria-labelledby="groupTitle"
  >
    <p id="groupTitle" class="menu-title">{{ value.label }}</p>
    <div class="list-item">
      <button
        v-for="(unit, _) in value.unitList"
        :key="`${value.key}-${unit.value}`"
        :class="[
          'button button-item',
          store.getActiveUnit(value.key) === unit.value
            ? 'button-item--active'
            : undefined,
        ]"
        role="menuitemradio"
        :ref="dropdown.handleMenuItemRef(`${value.key}-${unit.value}`)"
        tabindex="-1"
        :aria-checked="store.getActiveUnit(value.key) === unit.value"
        @click="
          () => {
            store.changeActiveUnit({
              key: value.key,
              value: unit.value,
            });
          }
        "
      >
        <span>{{ unit.label }}</span>
        <CheckIcon v-if="store.getActiveUnit(value.key) === unit.value" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;
@use "@/assets/effects/index" as *;

.button-item {
  @include font-style($color: var(--neutral-0), $font-size: 14.4px);
  @include flexbox($justify: start);
  @include layout-spacing($padding: var(--spacing-100));
  @include dm-sans($weight: 600);
  @include underlay-slide-x($underlayBackground: var(--neutral-700));
  overflow: hidden;
  outline: none;

  &--active {
    @include flexbox($justify: space-between);
  }

  &[aria-checked="false"]:hover,
  &:not([aria-checked]):hover,
  &[aria-checked="true"] {
    @include underlay-slide-x-active();
  }

  &:focus {
    outline: 1px solid var(--neutral-0);
  }
}

.group-menu {
  @include layout-position($position: relative);
  @include layout-spacing($padding-block: var(--spacing-100));
  @include flexbox(
    $display: flex,
    $direction: column,
    $gap: var(--spacing-100)
  );

  &:not(:last-child):before {
    content: "";
    @include layout-position($position: absolute, $bottom: 0);
    @include layout-size($height: 1px, $width: 100%);
    @include layout-background($color: var(--neutral-600));
  }
}

.menu-title {
  @include font-style($color: var(--neutral-200), $font-size: 12.8px);
  @include dm-sans($weight: 500);
}

.list-item {
  @include flexbox($display: flex, $direction: column, $gap: var(--spacing-50));
}
</style>
