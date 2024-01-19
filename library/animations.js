export const showUpAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 1 },
};

export const zoomIn = (bgColor) => ({
  whileHover: { scale: 1.1, zIndex: 1, backgroundColor: bgColor },
  transition: { duration: 0.2 },
});

export const zoomInAlt = {
  whileHover: { scale: 1.3, zIndex: 1 },
  transition: { duration: 0.2 },
};

export const popUp = {
  whileTap: { scale: 1.4 },
  transition: { duration: 0.3 },
};
