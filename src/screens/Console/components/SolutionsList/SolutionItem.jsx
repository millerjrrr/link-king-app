import { Linking, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import colors from "@assets/themes/colors";
import { getSettingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";
import AppText from "../../../../components/AppText";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";

const SolutionItem = ({
  solution,
  red,
  ticket,
  target,
}) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const languageCode = "test";
  appLang.slice(0, 2);

  const color = red
    ? colors[colorScheme].RED
    : colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  const navigation = useNavigation();

  const url = `https://www.google.com/search?q=define+${solution}&hl=${languageCode}`;

  const [popToTop, setPopToTop] = useState(true);

  useEffect(() => {
    if (popToTop && ticket) {
      const closeStackScreens = () => {
        if (navigation.canGoBack())
          navigation.dispatch(StackActions.popToTop());
      };
      const unsubscribe = navigation.addListener(
        "blur",
        closeStackScreens,
      );
      return unsubscribe;
    }
  }, [navigation, popToTop]);

  const onPress = ticket
    ? () => {
        setPopToTop(false);
        navigation.navigate("EditTicketScreen", {
          ticket,
          target,
        });
      }
    : () => Linking.openURL(url);

  return (
    <TouchableOpacity
      {...{
        style: {
          backgroundColor,
          marginHorizontal: 5,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 13,
          borderRadius: 20,
          shadowColor: color,
          borderColor: color,
          height: 40,
          ...appShadow(1),
        },
        onPress,
      }}
    >
      <AppText
        {...{
          style: red
            ? { color: colors[colorScheme].RED }
            : null,
        }}
      >
        {solution}
      </AppText>
    </TouchableOpacity>
  );
};

export default SolutionItem;
