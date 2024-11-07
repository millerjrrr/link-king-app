import { Platform } from "react-native";
import Purchases from "react-native-purchases";

interface IAPIKeys {
  apple: string;
  google: string;
}

const APIKeys: IAPIKeys = {
  apple: "appl_QgfQKNSmxGdAVCVMrVwEwRigqrx",
  google: "goog_JjbneAASzihqWIqEMWWBLdBkoyf",
};

const configurePurchases = async () => {
  const apiKey =
    Platform.OS === "android"
      ? APIKeys.google
      : APIKeys.apple;
  await Purchases.configure({
    apiKey,
  });
};

export default configurePurchases;
