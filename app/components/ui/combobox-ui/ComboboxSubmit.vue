<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const emits = defineEmits<{
  (e: "submit"): void;
}>();
</script>

<template>
  <div class="combobox-submit">
    <button
      v-bind="$attrs"
      type="submit"
      class="button button-search"
      @click="emits(`submit`)"
    >
      Search
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

.combobox-submit {
  @include layout-size($height: 100%, $width: 100%);
}

.button-search {
  @include font-style($color: var(--neutral-200), $font-size: 16px);
  @include layout-background($color: var(--blue-500));
  transition: background-color 0.25s ease-out;

  &:hover {
    @include layout-background($color: var(--blue-700));
  }

  &:focus {
    outline: 2px solid var(--neutral-0);
  }
}
</style>
