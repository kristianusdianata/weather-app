<script setup lang="ts">
const props = defineProps<{
  weatherCode: number;
  height: number;
  width: number;
}>();

function getWeatherMeta(code: number): { src: string; alt: string } {
  if (code === 0)
    return {
      src: "/icon-sunny.webp",
      alt: "Sunny weather",
    };

  if (code === 1)
    return {
      src: "/icon-partly-cloudy.webp",
      alt: "Partly cloud weather",
    };

  if (code === 2)
    return {
      src: "/icon-partly-cloudy.webp",
      alt: "Partly cloud weather",
    };

  if (code === 3)
    return {
      src: "/icon-overcast.webp",
      alt: "Overcast weather",
    };

  // Fog
  if (code === 45 || code === 48)
    return {
      src: "/icon-fog.webp",
      alt: "Fog weather",
    };

  // Drizzle
  if (code >= 51 && code <= 57)
    return {
      src: "/icon-drizzle.webp",
      alt: "Drizzle weather",
    };

  // Rain
  if (code >= 61 && code <= 67)
    return {
      src: "/icon-rain.webp",
      alt: "Rain weather",
    };

  // Snow
  if (code >= 71 && code <= 77)
    return {
      src: "/icon-snow.webp",
      alt: "Snow weather",
    };

  // Rain showers
  if (code >= 80 && code <= 82)
    return {
      src: "/icon-rain.webp",
      alt: "Rain weather",
    };

  // Thunderstorm
  if (code >= 95)
    return {
      src: "/icon-storm.webp",
      alt: "Storm weather",
    };

  return {
    src: "/icon-sunny.webp",
    alt: "Sunny weather",
  };
}

const imageSrc = computed(() => {
  return getWeatherMeta(props.weatherCode);
});
</script>

<template>
  <NuxtImg
    :src="imageSrc.src"
    :alt="imageSrc.alt"
    :height="props.height"
    :width="props.width"
    format="webp"
  />
</template>
