import { View, StyleSheet } from "react-native";
import SideButton from "./SideButton";
import CollectionSearchbar from "./CollectionSearchbar";
import TicketsCount from "./TicketsCount";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";
import PlusButton from "../WordCard/PlusButton";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const SearchBarContainer = () => {
  return (
    <View style={styles.container}>
      <FadeBackgroundView>
        <TicketsCount />
        <View style={styles.searchBarContainer}>
          <SideButton
            targetScreen={"Statistics"}
            icon={"bar-chart"}
          />
          <CollectionSearchbar />
          <SideButton
            targetScreen={"Progress"}
            icon={"share-alt"}
          />
        </View>
        <PlusButton />
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
    paddingBottom: base * 10,
  },
});

export default SearchBarContainer;
