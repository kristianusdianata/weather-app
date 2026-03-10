<template>
  <div class="loading" aria-busy="true">
    <div class="loading-skeleton" />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/utils/index" as *;

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.loading {
  @include layout-position(
    $position: absolute,
    $top: 0px,
    $right: 0px,
    $bottom: 0px,
    $left: 0px
  );
}

.loading-skeleton {
  @include layout-position($position: relative, $z-index: 0);
  @include layout-background($color: var(--neutral-700));
  @include layout-size($height: 100%, $width: 100%);
  overflow: hidden;

  &::after {
    content: "";
    @include layout-position(
      $position: absolute,
      $top: 0px,
      $right: 0px,
      $bottom: 0px,
      $left: 0px
    );
    background-image: linear-gradient(
      90deg,
      transparent,
      rgb(61, 59, 94, 0.6),
      transparent
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.4s ease-in-out infinite;
  }
}
</style>
