import { normalize } from "./normalize";

export const acceptAnswer = (answer, solutions) => {
  const normalized = solutions.map((sol) => normalize(sol));
  return normalized.includes(normalize(answer));
};
