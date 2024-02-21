import { View, StyleSheet, Platform } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import {
  getCollectionState,
  updateCollection,
} from "../store/collection";

const SearchBar = () => {
  const { golden } = useSelector(getConsoleState);
  const { searchKeyword } = useSelector(getCollectionState);
  dispatch = useDispatch();
  return (
    <View
      style={[
        styles.container,
        styles.commonProp,
        { shadowColor: colors.CONTRAST[golden] },
      ]}
    >
      <Searchbar
        placeholder="Search Collected Words"
        placeholderTextColor={colors.INACTIVE_CONTRAST}
        textInputProps={{
          caretColor: colors.CONTRAST[golden],
          autoCapitalize: "none",
          autoCorrect: false,
          autoFocus: true,
        }}
        iconColor={colors.CONTRAST[golden]}
        color={colors.CONTRAST[golden]}
        value={searchKeyword}
        onChangeText={(searchKeyword) => {
          dispatch(updateCollection({ searchKeyword }));
        }}
        style={[
          styles.searchBar,
          { color: colors.CONTRAST[golden] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    position: "absolute",
    width: "80%",
    padding: 10,
    zIndex: 10,
  },
  ...Platform.select({
    ios: {
      commonProp: {
        shadowOffset: {
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
    },
    android: {
      commonProp: {
        elevation: 3,
      },
    },
  }),
  searchBar: {
    backgroundColor: colors.SECONDARY,
    textAlign: "center",
    zIndex: 10,
  },
});

export default SearchBar;
