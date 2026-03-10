import type { InjectionKey, Ref, ComponentPublicInstance } from "vue";
import { inject, provide, ref } from "vue";

export type ComboboxContext = {
  menuItems: Ref<Map<string, HTMLElement>>;
  focusedItemId: Ref<string>;
  inputValue: Ref<string>;
  isExpanded: Ref<boolean>;
  /**
   * Identifies the active descendant by its element ID.
   * Required for accessibility when focus remains on a parent element.
   */
  activedescendant: Ref<string | undefined>;
  setInputValue: (value: string) => void;
  resetInputValue: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  setFocusedItemId: (id: string) => void;
  resetFocusedItemId: () => void;
  handleMenuItemRef: (
    id: string,
  ) => (el: Element | ComponentPublicInstance | null) => void;
  moveFocus: (step: 1 | -1) => void;
  isValidInputLength: () => boolean;
};

const COMBOBOX_KEY: InjectionKey<ComboboxContext> = Symbol("Combobox");

export function provideCombobox() {
  const MIN_INPUT_LENGTH = 3;
  const menuItems = ref(new Map<string, HTMLElement>());
  const focusedItemId = ref<string>("");
  const inputValue = ref<string>("");
  const isExpanded = ref<boolean>(false);
  const activedescendant = computed(() => {
    const el = menuItems.value.get(focusedItemId.value);
    return el?.id;
  });

  function setInputValue(value: string) {
    inputValue.value = value;
  }

  function resetInputValue() {
    inputValue.value = "";
  }

  function isValidInputLength() {
    return inputValue.value.length >= MIN_INPUT_LENGTH;
  }

  function setFocusedItemId(id: string) {
    focusedItemId.value = id;
  }

  function resetFocusedItemId() {
    focusedItemId.value = "";
  }

  function openMenu() {
    resetFocusedItemId();
    isExpanded.value = true;
  }

  function closeMenu() {
    resetFocusedItemId();
    isExpanded.value = false;
  }

  function handleMenuItemRef(id: string) {
    return (el: Element | ComponentPublicInstance | null) => {
      if (el) {
        // mount
        if (el instanceof HTMLElement) menuItems.value.set(id, el);
      } else {
        // unmount
        menuItems.value.delete(id);
      }
    };
  }

  function moveFocus(step: 1 | -1) {
    const keys = Array.from(menuItems.value.keys());
    const size = keys.length;

    if (size === 0) return;

    const currentIndex = keys.indexOf(focusedItemId.value);
    const nextIndex = Math.min(Math.max(currentIndex + step, 0), size - 1);

    if (keys[nextIndex]) focusedItemId.value = keys[nextIndex];
  }

  const context: ComboboxContext = {
    menuItems,
    focusedItemId,
    inputValue,
    isExpanded,
    activedescendant,
    setInputValue,
    resetInputValue,
    openMenu,
    closeMenu,
    setFocusedItemId,
    resetFocusedItemId,
    handleMenuItemRef,
    moveFocus,
    isValidInputLength,
  };

  provide(COMBOBOX_KEY, context);

  return context;
}

export function useCombobox() {
  const context = inject(COMBOBOX_KEY);

  if (!context) {
    throw new Error("useCombobox must be used inside Combobox Component");
  }

  return context;
}
