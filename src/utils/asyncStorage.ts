import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

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
) => await SecureStore.setItemAsync(key, value);

export const secureGetFromAsyncStorage = async (
  key: string,
) => await SecureStore.getItemAsync(key);

export const secureRemoveFromAsyncStorage = async (
  key: string,
) => await SecureStore.deleteItemAsync(key);
