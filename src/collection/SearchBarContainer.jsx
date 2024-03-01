import { View, StyleSheet, Text } from "react-native";
import GetLevelsBreakdownButton from "./GetLevelsBreakdownButton";
import CollectionSearchbar from "./CollectionSearchbar";
import TicketsCount from "./TicketsCount";

const SearchBarContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TicketsCount />
        <View style={styles.searchBarContainer}>
          <GetLevelsBreakdownButton
            onPress={() =>
              navigation.navigate("LevelBreakdown")
            }
            iconName={"barschart"}
          />
          <CollectionSearchbar />
          <GetLevelsBreakdownButton
            onPress={() =>
              navigation.navigate("StatsScreen")
            }
            iconName={"linechart"}
          />
        </View>
      </View>
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
  innerContainer: {
    top: 0,
    position: "absolute",
    alignItems: "center",
    flexDirection: "column",
  },
  searchBarContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
});

export default SearchBarContainer;
