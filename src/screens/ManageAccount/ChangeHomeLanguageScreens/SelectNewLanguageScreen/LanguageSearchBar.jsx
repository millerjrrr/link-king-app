import { View, StyleSheet } from "react-native";
import AppSearchBar from "../../../../components/AppSearchBar";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";

const LanguageSearchBar = ({
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <View style={styles.container}>
      <FadeBackgroundView>
        <View style={styles.searchBarContainer}>
          <AppSearchBar
            {...{ searchKeyword, setSearchKeyword }}
          />
        </View>
      </FadeBackgroundView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // This "double view" is necessary. container has no
    // height but sets the position of the absolute elements
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  searchBarContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingBottom: 10,
  },
});

export default LanguageSearchBar;
