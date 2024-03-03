import { Text, StyleSheet, Platform } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import {
  getCollectionState,
  updateCollection,
} from "../store/collection";

const CollectionSearchbar = () => {
  const { golden } = useSelector(getConsoleState);
  const color = colors.CONTRAST[golden];
  const { searchKeyword } = useSelector(getCollectionState);

  const dispatch = useDispatch();

  return (
    <Searchbar
      placeholder="Search Collected Words"
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      textInputProps={{
        caretColor: color,
        autoCapitalize: "none",
        autoCorrect: false,
        autoFocus: true,
      }}
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
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: colors.SECONDARY,
    textAlign: "center",
    zIndex: 10,
    width: "70%",
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default CollectionSearchbar;
