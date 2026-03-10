import { onMounted, onBeforeUnmount, unref, type Ref } from "vue";

export function useClickOutside({
  targetRef,
  handler,
}: {
  targetRef: Array<Ref<HTMLElement | null>>;
  handler: (event: MouseEvent) => void;
}) {
  function onClick(event: MouseEvent) {
    if (!(event.target instanceof Node)) return;
    const target = event.target as Node;
    const isOutside = targetRef.every((ref) => {
      const el = unref(ref);
      return !el || !el.contains(target);
    });
    if (isOutside) {
      handler(event);
    }
  }

  onMounted(() => {
    document.addEventListener("mousedown", onClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("mousedown", onClick);
  });
}
