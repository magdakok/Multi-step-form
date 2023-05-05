import { useEffect, useState } from "react";
const mobileQuery = "(max-width: 767px)";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(mobileQuery);
    setIsMobile(mql.matches);
    mql.addEventListener("change", () => {
      setIsMobile(mql.matches);
    });

    return () => {
      mql.removeEventListener("change", () => setIsMobile(mql.matches));
    };
  }, []);

  return { isMobile };
}
