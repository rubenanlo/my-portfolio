import { truncate } from "lodash";

// helper function used mainly to turn an object into a string. Useful for
// combining tailwind object classes
export const turnObjectIntoString = (className) => {
  if (className === undefined) return;
  if (typeof className === "string") return className;
  return Object.values(className).join(" ");
};

// helper function used to order items such as blog posts by date. It needs to
// have a date property for this to work
export const setOrder = (items) => {
  const orderedItems = items.sort(({ date: a }, { date: b }) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB - dateA;
  });
  return orderedItems;
};

export const setTruncatedText = (text, maxCharacters) =>
  truncate(text, {
    length: maxCharacters,
    separator: " ",
  });
