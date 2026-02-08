import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Detecta se o viewport é mobile. Seguro para Next.js (SSR):
 * só acessa `window` dentro de useEffect (apenas no cliente).
 * Retorna `undefined` até o primeiro valor no cliente, evitando hydration mismatch.
 */
export function useIsMobile(): boolean | undefined {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    );
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
