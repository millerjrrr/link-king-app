import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { selectConsoleState } from "@src/store/console";
import { View } from "react-native";
import useSendDictionary from "@src/hooks/optionsHooks/useSendDictionary";
import OptionsMenuItem from "../components/OptionsMenuItem";
import { useNavigation } from "@react-navigation/native";
import Dictionary from "../../../types/dictionaries";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const DictionarySelectorMenuItem: React.FC<{
  dictionary: Dictionary;
}> = ({ dictionary }) => {
  const { appLang } = useSelector(settingsState);

  const text =
    appTextSource(appLang).languageNames[dictionary];

  const { dictionary: currentDictionary } = useSelector(
    selectConsoleState
  );

  const selected = dictionary === currentDictionary;

  const sendDictionary = useSendDictionary();

  const navigation = useNavigation();

  const onPress = async () => {
    if (!selected) {
      await sendDictionary(dictionary);
    }
    navigation.goBack();
  };

  return (
    <View
      {...{ style: { height: base * 70, width: "100%" } }}
    >
      <OptionsMenuItem
        dictionary={dictionary}
        name={text}
        onPress={onPress}
        selected={selected}
      />
    </View>
  );
};

export default DictionarySelectorMenuItem;
