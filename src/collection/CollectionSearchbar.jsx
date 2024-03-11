import { StyleSheet, Platform } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionState,
  updateCollection,
} from "../store/collection";
import { getColorsState } from "../store/colors";

const CollectionSearchbar = () => {
  const { colorScheme, golden } =
    useSelector(getColorsState);
  const color = colors[colorScheme].CONTRAST[golden];

  const { searchKeyword } = useSelector(getCollectionState);

  const dispatch = useDispatch();

  return (
    <Searchbar
      placeholder="Search Collected Words"
      placeholderTextColor={
        colors[colorScheme].INACTIVE_CONTRAST
      }
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
