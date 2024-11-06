import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";

const AppSearchBar = ({
  searchKeyword,
  setSearchKeyword,
  placeholder = "",
}) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const keyboardAppearance =
    colors[colorScheme].STATUSBAR.split("-")[0] === "dark"
      ? "light"
      : "dark";

  return (
    <Searchbar
      {...{
        placeholder,
        placeholderTextColor:
          colors[colorScheme].INACTIVE_CONTRAST,
        keyboardAppearance,
        allowFontScaling: false,
        caretColor: color,
        iconColor: color,
        color,
        value: searchKeyword,
        onChangeText: (value) => setSearchKeyword(value),
        style: {
          marginTop: 8,
          textAlign: "center",
          zIndex: 10,
          width: "70%",
          shadowColor: color,
          borderColor: color,
          backgroundColor: colors[colorScheme].SECONDARY,
          ...appShadow(),
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {},
});

export default AppSearchBar;
