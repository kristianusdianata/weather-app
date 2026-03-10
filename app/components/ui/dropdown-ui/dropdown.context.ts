import { inject, provide, ref } from "vue";
import type { InjectionKey, Ref, ComponentPublicInstance } from "vue";

export type DropdownContext = {
  menuItems: Ref<Map<string, HTMLElement>>;
  isExpanded: Ref<boolean>;
  isFullyExpanded: Ref<boolean>;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  onMenuOpenComplete: () => void;
  onMenuCloseComplete: () => void;
  handleMenuItemRef: (
    key: string,
  ) => (el: Element | ComponentPublicInstance | null) => void;
  setFocusOnFirstItem: () => void;
  moveFocus: ({
    isFocusableElement,
    direction,
  }: {
    isFocusableElement?: (targetElement: HTMLElement) => boolean;
    direction: 1 | -1;
  }) => void;
};

const DROPDOWN_KEY: InjectionKey<DropdownContext> = Symbol("Dropdown");

export function provideDropdown() {
  const menuItems = ref(new Map<string, HTMLElement>());
  const isExpanded = ref<boolean>(false);
  const isFullyExpanded = ref<boolean>(false);

  function toggleMenu() {
    isExpanded.value = !isExpanded.value;
  }

  function openMenu() {
    isExpanded.value = true;
  }

  function closeMenu() {
    isExpanded.value = false;
  }

  function onMenuOpenComplete() {
    if (isExpanded.value) {
      isFullyExpanded.value = true;
    } else {
      isFullyExpanded.value = false;
    }
  }

  function onMenuCloseComplete() {
    if (!isExpanded.value) {
      isFullyExpanded.value = false;
    } else {
      isFullyExpanded.value = true;
    }
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

  function setFocusOnFirstItem() {
    const els = Array.from(menuItems.value.values());

    if (els.length === 0) return;

    const targetElement = els[0];

    if (targetElement) {
      targetElement.focus();
    }
  }

  function moveFocus({
    isFocusableElement,
    direction,
  }: {
    isFocusableElement?: (targetElement: HTMLElement) => boolean;
    direction: 1 | -1;
  }) {
    const els = Array.from(menuItems.value.values());
    const size = els.length;

    if (size === 0) return;

    const currEl = document.activeElement;
    if (!(currEl instanceof HTMLElement)) return;

    const currIndex = els.indexOf(currEl);

    // fallback to first item
    if (currIndex === -1) {
      const el = els[0];
      el?.focus();
      return;
    }

    let i = currIndex;
    let attempts = size;

    while (attempts > 0) {
      attempts--;
      i += direction;

      if (i < 0) i = size - 1;
      else if (i >= size) i = 0;

      const targetElement = els[i];

      if (targetElement) {
        // default focusable behavior
        if (!isFocusableElement) {
          targetElement.focus();
          return;
        }

        // custom focusable behavior
        if (isFocusableElement && isFocusableElement(targetElement)) {
          targetElement.focus();
          return;
        }
      }
    }
  }

  const context: DropdownContext = {
    menuItems,
    isExpanded,
    isFullyExpanded,
    openMenu,
    closeMenu,
    onMenuOpenComplete,
    onMenuCloseComplete,
    handleMenuItemRef,
    setFocusOnFirstItem,
    moveFocus,
    toggleMenu,
  };

  provide(DROPDOWN_KEY, context);

  return context;
}

export function useDropdown() {
  const context = inject(DROPDOWN_KEY);

  if (!context) {
    throw new Error("useDropdown must be used inside Dropdown Component");
  }

  return context;
}
