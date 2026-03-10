import { useMediaQuery } from "@vueuse/core";

export function useBreakpoint() {
  const isSmallAndUp = useMediaQuery(`(min-width: 640px)`);
  const isMediumAndUp = useMediaQuery(`(min-width: 768px)`);
  const isLargeAndUp = useMediaQuery(`(min-width: 1024px)`);
  const isExtraLargeAndUp = useMediaQuery(`(min-width: 1280px)`);

  return {
    isSmallAndUp,
    isMediumAndUp,
    isLargeAndUp,
    isExtraLargeAndUp,
  };
}
