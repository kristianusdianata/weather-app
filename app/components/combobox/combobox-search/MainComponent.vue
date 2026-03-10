<script setup lang="ts">
import { watch } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxMenu,
  ComboboxSubmit,
  provideCombobox,
} from "~/components/ui/combobox-ui";
import { DotLoading } from "@/components/loading";
import ComboboxMenuItem from "./ComboboxMenuItem.vue";
import NoResult from "./NoResult.vue";
import { useLocationStore } from "@/stores";

const combobox = provideCombobox();
const storeLocation = useLocationStore();
const storeForecast = useForecastStore();

watch(combobox.inputValue, async (input) => {
  if (combobox.isValidInputLength()) {
    await storeLocation.getData(input);
  }
});

function onSelectedMenuItem() {
  // get current focused menu item
  const keys = Array.from(combobox.menuItems.value.keys());
  const currentIndex = keys.indexOf(combobox.focusedItemId.value);

  if (currentIndex === -1) return;

  const location = storeLocation.locations[currentIndex];
  if (location) {
    storeLocation.setLocation(location);
    storeForecast.getData(location);
    combobox.resetInputValue();
    combobox.closeMenu();
  }
}
</script>

<template>
  <Combobox class="combobox-search">
    <ComboboxInput
      id="searchInput"
      :ariaControlId="`searchMenu`"
      :placeholder="`Search for a place...`"
      @select-menu-item="onSelectedMenuItem"
    />

    <ComboboxMenu id="searchMenu" :ariaLabelBy="`searchInput`">
      <DotLoading v-if="storeLocation.loading" class="combobox-loading" />

      <ComboboxMenuItem
        v-if="
          !storeLocation.loading &&
          !storeLocation.error &&
          storeLocation.locations.length > 0
        "
        @select-menu-item="onSelectedMenuItem"
      />

      <NoResult
        v-if="!storeLocation.loading && storeLocation.locations.length <= 0"
      />
    </ComboboxMenu>

    <ComboboxSubmit />
  </Combobox>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.combobox-search {
  @include layout-size($width: 100%);

  @include media-query-sm() {
    @include layout-size($width: 560px);
  }

  @include media-query-md() {
    @include layout-size($width: 650px);
  }
}

:deep(.menu) {
  @include layout-size($min-height: 52px);
}
</style>
