import { ConsoleData } from "../types/consoleData";

export function typeCheckConsoleData(
  data: any,
): data is ConsoleData {
  if (
    !data ||
    typeof data !== "object" ||
    typeof data.status !== "string" ||
    typeof data.dictionary !== "string" ||
    !data.display ||
    typeof data.display.raceTrack !== "string" ||
    !Array.isArray(data.display.tail) ||
    !data.gamePlay ||
    typeof data.gamePlay.id !== "string" ||
    typeof data.gamePlay.target !== "string" ||
    !Array.isArray(data.gamePlay.solutions) ||
    typeof data.gamePlay.rating !== "number" ||
    typeof data.gamePlay.speechLang !== "string" ||
    !data.stats ||
    typeof data.stats.due !== "number" ||
    typeof data.stats.steps !== "number" ||
    typeof data.stats.time !== "number" ||
    typeof data.stats.streak !== "number" ||
    typeof data.stats.newWords !== "number"
  ) {
    return false;
  }

  // Optional fields
  if (
    "tries" in data.gamePlay &&
    ![0, 1, 2, 3].includes(data.gamePlay.tries)
  ) {
    return false;
  }

  if (
    "level" in data.gamePlay &&
    typeof data.gamePlay.level !== "number"
  ) {
    return false;
  }
  if (
    "isNewWord" in data &&
    typeof data.isNewWord !== "boolean"
  ) {
    return false;
  }

  return true;
}
