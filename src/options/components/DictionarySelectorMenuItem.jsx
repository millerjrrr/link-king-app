import { useSelector } from "react-redux";
import OptionsMenuItem from "../OptionsMenuItem";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../store/notification";
import { sendDictionary } from "./sendDictionary";
import { getConsoleState } from "../../store/console";
import BusyWrapper from "../../ui/Loader/BusyWrapper";
import { View } from "react-native";

const DictionarySelectorMenuItem = ({
  name: dictionary,
  busy,
}) => {
  const { appLang } = useSelector(getSettingsState);

  const name =
    appTextSource[appLang].options.chooseDictionary[
      dictionary
    ];
  const dispatch = useDispatch();

  const onPress =
    dictionary === "Custom-Dictionary"
      ? () => {
          dispatch(
            updateNotification({
              message: name,
              type: "info",
            }),
          );
        }
      : () => {
          sendDictionary({
            dictionary,
            dispatch,
          });
        };

  const { dictionary: currentDictionary } =
    useSelector(getConsoleState);

  return (
    <View {...{ style: { height: 70, width: "100%" } }}>
      <BusyWrapper {...{ busy }}>
        <OptionsMenuItem
          {...{
            dictionary,
            name,
            onPress,
            selected: dictionary === currentDictionary,
            first: true,
          }}
        />
      </BusyWrapper>
    </View>
  );
};

export default DictionarySelectorMenuItem;
