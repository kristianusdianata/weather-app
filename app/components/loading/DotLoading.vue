<template>
  <div class="loading" aria-busy="true">
    <div class="loading-dots">
      <span class="loading-dot"></span>
      <span class="loading-dot"></span>
      <span class="loading-dot"></span>
    </div>
    <p class="loading-text">Loading...</p>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

@keyframes loading-dot-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.3;
  }

  50% {
    transform: translateY(-5px);
    opacity: 1;
  }
}

.loading {
  @include flexbox(
    $display: flex,
    $direction: column,
    $justify: center,
    $align: center,
    $gap: var(--spacing-100)
  );
  @include layout-background($color: var(--neutral-700));
  @include layout-position(
    $position: absolute,
    $top: 0px,
    $right: 0px,
    $bottom: 0px,
    $left: 0px
  );
}

.loading-dots {
  @include flexbox($display: flex, $direction: row, $gap: var(--spacing-100));
}

.loading-dot {
  @include layout-size($width: 7px, $height: 7px);
  @include layout-background($color: var(--neutral-200));
  @include border($radius: 50%);
  animation: loading-dot-bounce 0.9s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }
}

.loading-text {
  @include font-style($color: var(--neutral-200), $font-size: 14px);
  @include dm-sans($weight: 500);
}
</style>
