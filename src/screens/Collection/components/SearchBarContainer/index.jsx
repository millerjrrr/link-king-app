import { View, StyleSheet } from "react-native";
import CollectionScreenButton from "./SideButton";
import CollectionSearchbar from "./CollectionSearchbar";
import TicketsCount from "./TicketsCount";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";

const FadeBackgroundView = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  z-index: 20;
`;

const SearchBarContainer = () => {
  const { colorScheme } = useSelector(settingsState);
  const backgroundColor = colors[colorScheme].PRIMARY;

  return (
    <View style={styles.container}>
      <FadeBackgroundView
        {...{
          colors: [
            backgroundColor,
            backgroundColor + "E6",
            backgroundColor + "80",
            backgroundColor + "00",
          ],
        }}
      >
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
