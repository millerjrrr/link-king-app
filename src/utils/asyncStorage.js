import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToAsyncStorage = async (key, value) =>
  await AsyncStorage.setItem(key, value);

export const getFromAsyncStorage = async (key) =>
  await AsyncStorage.getItem(key);

export const removeFromAsyncStorage = async (key) =>
  await AsyncStorage.removeItem(key);

export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};
