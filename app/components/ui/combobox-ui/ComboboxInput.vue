<script setup lang="ts">
import { SearchIcon } from "@/components/ui/icons";
import { useCombobox } from "./combobox.context";

defineOptions({
  inheritAttrs: false,
});

const combobox = useCombobox();

const props = defineProps<{
  placeholder: string;
  ariaControlId: string;
}>();

const emits = defineEmits<{
  (e: "select-menu-item"): void;
}>();

function onInputHandler(event: InputEvent) {
  const target = event.target as HTMLInputElement;
  combobox.setInputValue(target.value);

  if (combobox.isValidInputLength()) combobox.openMenu();
  else combobox.closeMenu();
}

function onFocusHandler() {
  if (combobox.isValidInputLength()) combobox.openMenu();
  else combobox.closeMenu();
}

function onKeydown(e: KeyboardEvent) {
  if (!combobox.isExpanded.value) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    combobox.moveFocus(1);
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    combobox.moveFocus(-1);
  }

  if (e.key === "Enter") {
    e.preventDefault();
    if (!combobox.isExpanded.value) return;
    emits("select-menu-item");
  }
}
</script>

<template>
  <div class="combobox-input">
    <input
      v-bind="$attrs"
      id="searchInput"
      type="search"
      :value="combobox.inputValue.value"
      class="input input-search"
      :placeholder="props.placeholder"
      role="combobox"
      aria-autocomplete="list"
      :aria-expanded="combobox.isExpanded.value"
      :aria-controls="props.ariaControlId"
      aria-label="Combobox input"
      :aria-activedescendant="combobox.activedescendant.value"
      autocomplete="off"
      @input="onInputHandler"
      @focus="onFocusHandler"
      @keydown="onKeydown"
    />
    <SearchIcon class="icon-search" />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.combobox-input {
  @include layout-position($position: relative);
}

.input-search {
  @include dm-sans($weight: 500);
  @include font-style($color: var(--neutral-200), $font-size: 16px);
  @include layout-background($color: var(--neutral-800));
  @include layout-spacing(
    $padding-inline: var(--spacing-800) var(--spacing-200)
  );

  &:focus {
    outline: 2px solid var(--neutral-0);
  }
}

.icon-search {
  @include layout-size($height: 100%);
  @include layout-position(
    $position: absolute,
    $top: 0px,
    $left: 25px,
    $z-index: 1
  );
  pointer-events: none;
}
</style>
