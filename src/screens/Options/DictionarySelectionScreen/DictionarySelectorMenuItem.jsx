import { useSelector } from "react-redux";
import OptionsMenuItem from "../components/OptionsMenuItem";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { useDispatch } from "react-redux";
import { selectConsoleState } from "@src/store/console";
import BusyWrapper from "../../../components/Loader/BusyWrapper";
import { View } from "react-native";
import useSendDictionary from "@src/hooks/optionsHooks/useSendDictionary";

const DictionarySelectorMenuItem = ({
  name: dictionary,
  busy,
}) => {
  const { appLang } = useSelector(settingsState);

  const name =
    appTextSource(appLang).options.chooseDictionary[
      dictionary
    ] || dictionary;
  const dispatch = useDispatch();

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
      <BusyWrapper {...{ busy }}>
        <OptionsMenuItem
          {...{
            dictionary,
            name,
            onPress,
            selected,
            first: true,
          }}
        />
      </BusyWrapper>
    </View>
  );
};

export default DictionarySelectorMenuItem;
