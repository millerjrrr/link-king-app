import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "@assets/themes/colors";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";

const AppSearchBar = ({
  searchKeyword,
  setSearchKeyword,
  placeholder = "",
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
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
        style: [
          styles.searchBar,
          {
            color,
            shadowColor: color,
            borderColor: color,
            backgroundColor: colors[colorScheme].SECONDARY,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 8,
    textAlign: "center",
    zIndex: 10,
    width: "70%",
    ...appShadow(),
  },
});

export default AppSearchBar;
