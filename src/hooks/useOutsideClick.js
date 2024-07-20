import { useEffect } from "react";

export function useOutsideClick(close, ref, bubbles = true) {
  useEffect(
    function () {
      const handleClick = function (e) {
        if (!ref || e.target.closest("#toggle")) return;
        if (ref?.current && !ref?.current?.contains(e.target)) close();
      };
      document.addEventListener("click", handleClick, bubbles);
      return () => document.removeEventListener("click", handleClick);
    },
    [close, ref, bubbles]
  );
}
