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

export const blurAnimation = {
  initial: { filter: "blur(0.2rem)" },
  animate: { filter: "blur(0)" },
  transition: { duration: 0.5 },
};

export const loadingMotion = {
  animate: { scale: [0, 1], filter: ["blur(10px)", "blur(0px)"] },
  transition: {
    duration: 1,
    repeat: Infinity,
    repeatType: "reverse",
  },
};
