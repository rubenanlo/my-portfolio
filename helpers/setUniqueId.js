import { v4 as uuidv4 } from "uuid";

// This helper allows to add unique Ids to arrays, so that we can guarantee
// unique keys in the different components
export const setUniqueId = (array) =>
  array.map((element) =>
    typeof element === "string"
      ? { paragraph: element, id: uuidv4() }
      : { ...element, id: uuidv4() }
  );
