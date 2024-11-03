import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionState,
  updateCollection,
} from "@src/store/collection";
import { getSettingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import appShadow from "@src/utils/appShadow";

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
    appTextSource(appLang).collection;

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
