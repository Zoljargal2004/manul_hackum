import { PartKey, PARTS } from "../../cat-creator-types";

export const buildPath = (key: PartKey, file: string) => {
  const folder = PARTS[key].folder ?? key;
  return `/create-cat/${folder}/${file}`;
};

