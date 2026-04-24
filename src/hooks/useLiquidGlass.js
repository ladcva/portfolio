import { useEffect } from "react";

const GLASS_SELECTOR = [
  ".site-nav--scrolled",
  ".site-nav.show",
  ".site-brand__mark",
  ".site-nav__toggle",
  ".button",
  ".profile-panel",
  ".profile-panel__top img",
  ".project-card-view__media",
  ".tag-row span",
  ".blog-source-pill",
  ".focus-card",
  ".bento-note",
  ".github-panel",
  ".tech-icons",
  ".empty-state",
  ".article-content pre",
  ".resume .resume-item .resume-title",
].join(",");

function updateElementReflection(element, clientX, clientY) {
  const rect = element.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const px = rect.width ? x / rect.width : 0.5;
  const py = rect.height ? y / rect.height : 0.5;
  const rotateX = (0.5 - py) * 5;
  const rotateY = (px - 0.5) * 7;

  element.style.setProperty("--glass-x", `${x}px`);
  element.style.setProperty("--glass-y", `${y}px`);
  element.style.setProperty("--glass-px", `${px * 100}%`);
  element.style.setProperty("--glass-py", `${py * 100}%`);
  element.style.setProperty("--glass-tilt-x", `${rotateX}deg`);
  element.style.setProperty("--glass-tilt-y", `${rotateY}deg`);
  element.classList.add("is-glass-active");
}

function resetElementReflection(element) {
  element.classList.remove("is-glass-active");
  element.style.removeProperty("--glass-tilt-x");
  element.style.removeProperty("--glass-tilt-y");
}

export function useLiquidGlass() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return undefined;

    let activeElement = null;
    let frame = 0;
    let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const markGlassElements = () => {
      document.querySelectorAll(GLASS_SELECTOR).forEach((element) => {
        element.classList.add("liquid-glass");
      });
    };

    const syncPointer = () => {
      frame = 0;
      document.documentElement.style.setProperty("--cursor-x", `${pointer.x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${pointer.y}px`);

      const nextElement = document.elementFromPoint(pointer.x, pointer.y)?.closest?.(".liquid-glass");
      if (activeElement && activeElement !== nextElement) {
        resetElementReflection(activeElement);
      }
      activeElement = nextElement;
      if (activeElement) updateElementReflection(activeElement, pointer.x, pointer.y);
    };

    const handlePointerMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(syncPointer);
    };

    const handlePointerLeave = () => {
      if (activeElement) resetElementReflection(activeElement);
      activeElement = null;
    };

    markGlassElements();
    const observer = new MutationObserver(markGlassElements);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}
