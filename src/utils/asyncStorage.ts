import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToAsyncStorage = async (
  key: string,
  value: string,
) => await AsyncStorage.setItem(key, value);

export const getFromAsyncStorage = async (key: string) =>
  await AsyncStorage.getItem(key);

export const removeFromAsyncStorage = async (key: string) =>
  await AsyncStorage.removeItem(key);

export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};
