import { StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import { settingsState } from "@src/store/settings";
import { useSelector } from "react-redux";
import appShadow from "@src/utils/appShadow";

const OptionsIcon = ({
  onPress,
  color,
  size,
  entypo,
  option,
  textTrue,
  textFalse,
}) => {
  const height = (size * 80) / 50;

  const { colorScheme } = useSelector(settingsState);
  const backgroundColor = colors[colorScheme].SECONDARY;

  return (
    <TouchableOpacity
      {...{
        onPress,
        style: [
          styles.option,
          {
            shadowColor: color,
            borderColor: color,
            height,
            backgroundColor,
          },
        ],
      }}
    >
      {entypo ? (
        <Entypo
          {...{
            name: option ? textTrue : textFalse,
            size,
            color,
          }}
        />
      ) : (
        <MaterialIcons
          {...{
            name: option ? textTrue : textFalse,
            size,
            color,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    borderRadius: 1000,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    marginBottom: 0,
    ...appShadow(1),
  },
});

export default OptionsIcon;
