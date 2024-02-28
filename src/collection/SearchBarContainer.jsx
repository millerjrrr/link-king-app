import { View, StyleSheet, Text } from "react-native";
import GetLevelsBreakdownButton from "./GetLevelsBreakdownButton";
import CollectionSearchbar from "./CollectionSearchbar";
import TicketsCount from "./TicketsCount";

const SearchBarContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
          onPress={() => navigation.navigate("StatsScreen")}
          iconName={"linechart"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    position: "absolute",
    zIndex: 10,
    alignItems: "center",
    flexDirection: "column",
  },
  searchBarContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
});

export default SearchBarContainer;
