import { View, StyleSheet, Platform } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../utils/colors";

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <View style={[styles.container, styles.commonProp]}>
      <Searchbar
        placeholder="Search Collected Words"
        placeholderTextColor={colors.INACTIVE_CONTRAST}
        textInputProps={{
          caretColor: colors.CONTRAST,
          autoCapitalize: "none",
          autoCorrect: false,
          autoFocus: true,
        }}
        iconColor={colors.CONTRAST}
        color={colors.CONTRAST}
        value={searchKeyword}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        style={styles.searchBar}
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
    shadowColor: colors.CONTRAST,
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
    color: colors.CONTRAST,
    textAlign: "center",
    // position: "absolute",
    zIndex: 10,
  },
});

export default SearchBar;
