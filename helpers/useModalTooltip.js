import { useState } from "react";

export const useModalTooltip = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [fullText, setFullText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [truncatedKey, setTruncatedKey] = useState("");

  const handleMouseEnter = (fullText, displayText, e) => {
    if (displayText) {
      setFullText(fullText);
      setTruncatedKey(displayText);
      setModalVisibility(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    return;
  };

  const handleMouseMove = (e) => {
    if (modalVisibility) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setModalVisibility(false);
  };

  return {
    modalVisibility,
    fullText,
    mousePosition,
    truncatedKey,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  };
};
