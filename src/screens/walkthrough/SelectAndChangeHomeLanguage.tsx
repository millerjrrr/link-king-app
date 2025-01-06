import { Platform, View } from "react-native";
import SelectNewHomeLanguageScreen from "../ManageAccount/ChangeHomeLanguageScreens/SelectNewLanguageScreen";

const SelectAndChangeHomeLanguage = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 30 : 0,
      }}
    >
      <SelectNewHomeLanguageScreen unprotect />
    </View>
  );
};

export default SelectAndChangeHomeLanguage;
