import { normalize } from "@src/utils/normalize";

export const acceptAnswer = (
  answer: string,
  solutions: string[],
) => {
  const normalized = solutions.map((sol) => normalize(sol));
  return normalized.includes(normalize(answer));
};
