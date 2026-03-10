<script lang="ts" setup>
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  provideDropdown,
} from "@/components/ui/dropdown-ui";
import DropdownMenuItems from "./DropdownMenuItems.vue";
import { GearIcon, ArrowDownIcon } from "@/components/ui/icons";
import { capitalize } from "@/utils";
import { useForecastStore } from "@/stores";

const dropdown = provideDropdown();
const store = useForecastStore();

function isFocusableElement(targetElement: HTMLElement): boolean {
  if (
    !targetElement.hasAttribute("aria-checked") ||
    targetElement.getAttribute("aria-checked") === "false"
  ) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <Dropdown>
    <DropdownButton
      id="dropdownButtonHeader"
      :ariaControlId="`dropdownMenuHeader`"
      :disabled="store.loading"
    >
      <GearIcon />
      <span>{{ capitalize("units") }}</span>
      <ArrowDownIcon />
    </DropdownButton>

    <DropdownMenu
      id="dropdownMenuHeader"
      :ariaLabeledBy="`dropdownButtonHeader`"
      :nextItem="
        () =>
          dropdown.moveFocus({
            direction: 1,
            isFocusableElement,
          })
      "
      :prevItem="
        () =>
          dropdown.moveFocus({
            direction: -1,
            isFocusableElement,
          })
      "
    >
      <DropdownMenuItems />
    </DropdownMenu>
  </Dropdown>
</template>
