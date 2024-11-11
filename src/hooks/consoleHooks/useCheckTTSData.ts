import { useSelector } from "react-redux";
import { Platform } from "react-native";
import { selectConsoleState } from "@src/store/console";
import * as Speech from "expo-speech";
import useCatchAsync from "@src/hooks/useCatchAsync";

const useCheckTTSData = () => {
  const catchAsync = useCatchAsync();
  const {
    gamePlay: { speechLang: language },
  } = useSelector(selectConsoleState);

  const checkTTSData = catchAsync(async () => {
    if (Platform.OS === "android" && language !== "") {
      // console.log("# ..checking ", language);
      const code = language.slice(0, 2);
      const languages =
        await Speech.getAvailableVoicesAsync();
      const voice = languages.find(
        (voice) => voice.language.slice(0, 2) === code,
      );
      if (!voice) {
        console.log("no voice");
        return false;
      }
    }
    return true;
  });

  return checkTTSData;
};

export default useCheckTTSData;
