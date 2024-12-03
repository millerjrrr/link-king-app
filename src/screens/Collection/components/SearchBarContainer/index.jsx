import { View, StyleSheet } from "react-native";
import CollectionScreenButton from "./SideButton";
import CollectionSearchbar from "./CollectionSearchbar";
import TicketsCount from "./TicketsCount";
import useColors from "@src/hooks/useColors";
import FadeBackgroundView from "@src/components/Graphics/FadeBackgroundView";

const SearchBarContainer = () => {
  const { PRIMARY } = useColors();

  return (
    <View style={styles.container}>
      <FadeBackgroundView>
        <TicketsCount />
        <View style={styles.searchBarContainer}>
          <CollectionScreenButton
            targetScreen={"Statistics"}
            icon={"barschart"}
          />
          <CollectionSearchbar />
          <CollectionScreenButton
            targetScreen={"Progress"}
            icon={"sharealt"}
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

export default SearchBarContainer;
