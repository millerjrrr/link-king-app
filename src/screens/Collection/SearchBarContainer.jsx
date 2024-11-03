import { View, StyleSheet } from "react-native";
import CollectionScreenButton from "./CollectionScreenButton";
import CollectionSearchbar from "./CollectionSearchbar";
import TicketsCount from "./TicketsCount";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import colors from "@assets/themes/colors";

const FadeBackgroundView = styled(LinearGradient)`
  position: absolute;
  top: 0;
  alignitems: center;
  flexdirection: column;
  width: 100%;
  z-index: 20;
`;

const SearchBarContainer = ({ navigation }) => {
  const { colorScheme } = useSelector(getSettingsState);
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
            onPress={() =>
              navigation.navigate("StatsScreen")
            }
            iconName={"barschart"}
          />
          <CollectionSearchbar />
          <CollectionScreenButton
            onPress={() =>
              navigation.navigate("ProgressScreen")
            }
            iconName={"sharealt"}
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
