import { useSelector } from "react-redux";
import OptionsMenuItem from "../components/OptionsMenuItem";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import { useDispatch } from "react-redux";
import { sendDictionary } from "../components/sendDictionary";
import { consoleState } from "@src/store/console";
import BusyWrapper from "../../../components/Loader/BusyWrapper";
import { View } from "react-native";

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

  const { dictionary: currentDictionary } =
    useSelector(consoleState);

  const selected = dictionary === currentDictionary;

  const onPress = selected
    ? null
    : () => {
        sendDictionary({
          dictionary,
          dispatch,
        });
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
