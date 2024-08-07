import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionState,
  updateCollection,
} from "../store/collection";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";
import appShadow from "../utils/appShadow";

const CollectionSearchbar = () => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const keyboardAppearance =
    colors[colorScheme].STATUSBAR.split("-")[0] === "dark"
      ? "light"
      : "dark";

  const { searchKeyword } = useSelector(getCollectionState);

  const dispatch = useDispatch();

  const { searchMessage } =
    appTextSource[appLang].collection;

  return (
    <Searchbar
      placeholder={searchMessage}
      placeholderTextColor={
        colors[colorScheme].INACTIVE_CONTRAST
      }
      keyboardAppearance={keyboardAppearance}
      allowFontScaling={false}
      caretColor={color}
      iconColor={color}
      color={color}
      value={searchKeyword}
      onChangeText={(searchKeyword) => {
        dispatch(updateCollection({ searchKeyword }));
      }}
      style={[
        styles.searchBar,
        {
          color,
          shadowColor: color,
          borderColor: color,
          backgroundColor: colors[colorScheme].SECONDARY,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    textAlign: "center",
    zIndex: 10,
    width: "70%",
    ...appShadow(),
  },
});

export default CollectionSearchbar;
