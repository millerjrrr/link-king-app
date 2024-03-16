import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import colors from "../utils/colors";
import { getSettingsState } from "../store/settings";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ColorPicker from "./components/ColorPicker";
import styled from "styled-components";

const Container = styled(View)`
  height: 60px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => props.backgroundColor};
`;

const ColorPickerMenuItem = () => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const backgroundColor = colors[colorScheme].PRIMARY;
  const borderColor = colors[colorScheme].INACTIVE_CONTRAST;
  const color = colors[colorScheme].CONTRAST[golden];

  const [showPalette, setShowPallet] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const hidePalette = () => setShowPallet(false);
    const unsubscribe = navigation.addListener(
      "focus",
      hidePalette,
    );
    hidePalette();
    return unsubscribe;
  }, [navigation]);

  return (
    <Container {...{ backgroundColor }}>
      <MaterialCommunityIcons
        {...{
          name: "palette-outline",
          size: 32,
          color,
          style: {
            margin: 5,
          },
        }}
      />
      {!showPalette ? (
        <TouchableOpacity
          style={[styles.option, { borderColor }]}
          onPress={() => setShowPallet(true)}
        >
          <Text {...{ style: { fontSize: 20, color } }}>
            Color scheme
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.option, { borderColor }]}>
          <ColorPicker />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    margin: 10,
    borderTopWidth: 1,
  },
});

export default ColorPickerMenuItem;
