// helper function used mainly to turn an object into a string. Useful for
// combining tailwind object classes
export const turnObjectIntoString = (className) => {
  if (className === undefined) return;
  if (typeof className === "string") return className;
  return Object.values(className).join(" ");
};
