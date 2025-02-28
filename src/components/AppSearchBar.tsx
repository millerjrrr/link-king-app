import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";
import ClosingTextInput from "./ClosingTextInput";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  placeholder?: string;
}
const AppSearchBar: React.FC<Props> = ({
  searchKeyword,
  setSearchKeyword,
  placeholder = "",
}) => {
  const {
    SECONDARY,
    CONTRAST: color,
    STATUSBAR,
    INACTIVE_CONTRAST,
  } = useColors();

  const keyboardAppearance =
    STATUSBAR.split("-")[0] === "dark" ? "light" : "dark";

  return (
    <View style={{ width: "70%", marginTop: 8 }}>
      <TouchableOpacity
        style={{
          height: 60,
          width: 60,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 50,
          left: 0,
        }}
        onPress={() => setSearchKeyword("")}
      >
        {searchKeyword === "" ? (
          <Ionicons
            name="search-sharp"
            size={24}
            color={color}
          />
        ) : (
          <Ionicons name="close" size={24} color={color} />
        )}
      </TouchableOpacity>
      <ClosingTextInput
        placeholder={placeholder}
        placeholderTextColor={INACTIVE_CONTRAST}
        autoComplete="off"
        selectionColor={color}
        autoCorrect={false}
        allowFontScaling={false}
        underlineColorAndroid="transparent"
        keyboardAppearance={keyboardAppearance}
        autoCapitalize="none"
        value={searchKeyword}
        onChangeText={(value: string) =>
          setSearchKeyword(value)
        }
        style={{
          zIndex: 10,
          backgroundColor: SECONDARY,
          height: 60,
          paddingLeft: 50,
          borderRadius: 35,
          fontSize: 20,
          color,
          ...appShadow(color),
        }}
      />
    </View>
  );
};

export default AppSearchBar;
