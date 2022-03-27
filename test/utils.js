/**
 * External dependencies:
 */
import * as F from "funky-lib";

export const filterOutPosition = (object) => {
  const result = Array.isArray(object) ? [] : {};

  const push = (value, key, obj) => {
    if (Array.isArray(obj)) {
      obj.push(value);
    } else {
      obj[key] = value;
    }
  };

  F.forEach((value, key) => {
    if (key === "start" || key === "end") {
      return;
    }

    if (typeof value !== "object") {
      push(value, key, result);
    } else {
      push(filterOutPosition(value), key, result);
    }
  }, object);

  return result;
};
