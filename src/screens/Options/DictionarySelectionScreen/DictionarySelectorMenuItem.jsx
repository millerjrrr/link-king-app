import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { selectConsoleState } from "@src/store/console";
import { View } from "react-native";
import useSendDictionary from "@src/hooks/optionsHooks/useSendDictionary";
import OptionsMenuItem from "../components/OptionsMenuItem";

const DictionarySelectorMenuItem = ({
  name: dictionary,
}) => {
  const { appLang } = useSelector(settingsState);

  const name =
    appTextSource(appLang).options.chooseDictionary[
      dictionary
    ] || dictionary;

  const { dictionary: currentDictionary } = useSelector(
    selectConsoleState,
  );

  const selected = dictionary === currentDictionary;
  const sendDictionary = useSendDictionary();

  const onPress = selected
    ? null
    : () => {
        sendDictionary(dictionary);
      };

  return (
    <View {...{ style: { height: 70, width: "100%" } }}>
      <OptionsMenuItem
        {...{
          dictionary,
          name,
          onPress,
          selected,
          first: true,
        }}
      />
    </View>
  );
};

export default DictionarySelectorMenuItem;
