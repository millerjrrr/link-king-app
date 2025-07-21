import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { settingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";
import { useNavigation } from "@react-navigation/native";
import {
  CollectionStackParamList,
  ScreensWithoutParams,
} from "@src/types/navigationTypes";
import { AntDesignIcons } from "@src/types/iconLibrary";
import { StackNavigationProp } from "@react-navigation/stack";

interface SideButtonProps {
  targetScreen: ScreensWithoutParams<CollectionStackParamList>;
  icon: AntDesignIcons;
}

const SideButton: React.FC<SideButtonProps> = ({
  targetScreen,
  icon,
}) => {
  const navigation =
    useNavigation<
      StackNavigationProp<CollectionStackParamList>
    >();
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { SECONDARY, CONTRAST } = colors[colorScheme];
  const color = CONTRAST[golden];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: SECONDARY,
          ...appShadow(color),
        },
      ]}
      onPress={() => navigation.navigate(targetScreen)}
    >
      <AntDesign {...{ name: icon, size: 18, color }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 30,
    aspectRatio: 1,
    margin: 7,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default SideButton;
