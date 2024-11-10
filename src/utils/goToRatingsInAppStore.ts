import { Alert, Linking, Platform } from "react-native";

const goToRatingPage = () => {
  const url =
    Platform.OS === "android"
      ? `https://play.google.com/store/apps/details?id=com.linkoking.app`
      : `https://apps.apple.com/app/id6496679226?action=write-review`;

  Linking.openURL(url).catch((err) =>
    Alert.alert(
      "Error",
      "Could not open the store. Please try again later.",
    ),
  );
};

export default goToRatingPage;
