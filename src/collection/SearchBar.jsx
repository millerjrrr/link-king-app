import {
  View,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleState } from "../store/console";
import {
  getCollectionState,
  updateCollection,
} from "../store/collection";
import GetLevelsBreakdownButton from "./GetLevelsBreakdownButton";

const SearchBar = ({ navigation }) => {
  const { golden } = useSelector(getConsoleState);
  const { searchKeyword, results } = useSelector(
    getCollectionState,
  );
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <GetLevelsBreakdownButton
        onPress={() =>
          navigation.navigate("LevelBreakdown")
        }
      />
      <View
        style={[
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
      <GetLevelsBreakdownButton
        text={results}
        isText={true}
        onPress={() => navigation.navigate("StatsScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    position: "absolute",
    width: "100%",
    padding: 10,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
    width: 250,
  },
});

export default SearchBar;
