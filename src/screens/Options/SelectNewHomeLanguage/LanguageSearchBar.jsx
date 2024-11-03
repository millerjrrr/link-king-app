import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import AppSearchBar from "../../../components/AppSearchBar";

const FadeBackgroundView = styled(LinearGradient)`
  position: absolute;
  alignitems: center;
  flexdirection: column;
  width: 100%;
  z-index: 20;
`;

const LanguageSearchBar = ({
  searchKeyword,
  setSearchKeyword,
}) => {
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
