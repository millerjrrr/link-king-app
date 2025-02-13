import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

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

export const secureSaveToAsyncStorage = async (
  key: string,
  value: string,
) => {
  if (Platform.OS !== "web")
    return await SecureStore.setItemAsync(key, value);
  else return await AsyncStorage.setItem(key, value);
};

export const secureGetFromAsyncStorage = async (
  key: string,
) => {
  if (Platform.OS !== "web")
    return await SecureStore.getItemAsync(key);
  else return await AsyncStorage.getItem(key);
};

export const secureRemoveFromAsyncStorage = async (
  key: string,
) => {
  if (Platform.OS !== "web")
    return await SecureStore.deleteItemAsync(key);
  else return await AsyncStorage.removeItem(key);
};
