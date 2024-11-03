import { getFromAsyncStorage } from "./asyncStorage";

const getGoalFromStorage = async (
  key: string,
  defaultValue: number,
): Promise<number> => {
  const goalString = await getFromAsyncStorage(key);
  return goalString ? Number(goalString) : defaultValue;
};

export default getGoalFromStorage;
