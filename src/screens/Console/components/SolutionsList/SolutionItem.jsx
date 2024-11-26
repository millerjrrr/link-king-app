import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "@src/utils/colors";
import { settingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";
import AppText from "../../../../components/AppText";
import {
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { selectConsoleState } from "@src/store/console";
import { updateModals } from "@src/store/modals";

const SolutionItem = ({
  solution,
  red,
  ticket,
  target,
}) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const { dictionary } = useSelector(selectConsoleState);

  const languageCode = dictionary;

  appLang.slice(0, 2);

  const color = red
    ? colors[colorScheme].RED
    : colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].SECONDARY;

  const navigation = useNavigation();

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

  const dispatch = useDispatch();

  const onPress = ticket
    ? () => {
        setPopToTop(false);
        navigation.navigate("EditTicketScreen", {
          ticket,
          target,
        });
      }
    : () =>
        dispatch(
          updateModals({
            showDefinitionInWebViewModal: true,
            definitionSearchWord: solution,
            definitionSearchLanguage: languageCode,
          }),
        );

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
