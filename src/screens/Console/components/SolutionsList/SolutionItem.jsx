import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "@src/utils/colors";
import { settingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";
import AppText from "@src/components/AppText";
import { useNavigation } from "@react-navigation/native";
import { selectConsoleState } from "@src/store/console";
import { updateModals } from "@src/store/modals";

const SolutionItem = ({
  solution,
  red,
  ticket,
  target,
  edit,
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

  const dispatch = useDispatch();

  const onPress = ticket
    ? () => {
        if (edit)
          dispatch(
            updateModals({ showNewWordAddedModal: false }),
          );
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
