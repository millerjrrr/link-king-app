import { useSelector } from "react-redux";
import OptionsMenuItem from "../OptionsMenuItem";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../store/notification";
import { sendDictionary } from "./sendDictionary";
import { getConsoleState } from "../../store/console";

const DictionarySelectorMenuItem = ({ name: iconName }) => {
  const { appLang } = useSelector(getSettingsState);

  const name =
    appTextSource[appLang].options.chooseDictionary[
      iconName
    ];
  const dispatch = useDispatch();

  const onPress =
    iconName === "Custom-Dictionary"
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
            dictionary: iconName,
            dispatch,
          });
        };

  const { dictionary } = useSelector(getConsoleState);

  return (
    <OptionsMenuItem
      {...{
        iconName,
        name,
        onPress,
        selected: dictionary === iconName,
        first: true,
      }}
    />
  );
};

export default DictionarySelectorMenuItem;
