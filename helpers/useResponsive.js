import { useState, useCallback, useEffect } from "react";

// Create a custom hook to track the width of the screen
const useMediaQuery = (initialWidth = 768) => {
  const [width, setWidth] = useState(initialWidth);
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, [updateTarget, width]);

  return [targetReached, setWidth];
};

export const useResponsive = (width = 768) => {
  const [isSmallScreen, setWidth] = useMediaQuery(width);

  // Set the width threshold directly when calling the hook
  useEffect(() => {
    setWidth(width);
  }, [width, setWidth]);

  return isSmallScreen;
};
