import { StyleSheet, Text } from "react-native";
import PopUpContainer from "../components/containers/PopUpContainer";
import BusyWrapper from "../ui/Loader/BusyWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getSettingsState } from "../store/settings";
import appTextSource from "../utils/appTextSource";
import OptionsMenuItem from "./OptionsMenuItem";
import { getConsoleState } from "../store/console";
import { sendDictionary } from "./components/sendDictionary";
import colors from "../utils/colors";
import styled from "styled-components";

const TextBlock = styled(Text)`
  padding-vertical: 20px;
  padding-horizontal: 15px;
  text-align: left;
  font-size: 25px;
  color: ${(props) => props.color};
`;

const DictionarySelectionScreen = (props) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const {
    title: heading,
    titleA,
    titleB,
    text,
  } = appTextSource[appLang].options.chooseDictionary;

  const color = colors[colorScheme].CONTRAST[golden];

  const { dictionary, busy } = useSelector(getConsoleState);

  const dispatch = useDispatch();

  const setDictionaryToBrazil = () => {
    sendDictionary({ dictionary: "Brazil", dispatch });
  };

  const setDictionaryToSpanish = () => {
    sendDictionary({ dictionary: "Spanish", dispatch });
  };

  return (
    <PopUpContainer {...{ heading }}>
      <BusyWrapper {...{ busy }}>
        <OptionsMenuItem
          {...{
            iconName: "Brazil",
            name: titleA,
            onPress: setDictionaryToBrazil,
            selected: dictionary === "Brazil",
            first: true,
          }}
        />
        <OptionsMenuItem
          {...{
            iconName: "Spanish",
            name: titleB,
            onPress: setDictionaryToSpanish,
            selected: dictionary !== "Brazil",
            first: true,
          }}
        />
      </BusyWrapper>
      <TextBlock {...{ color }}>{text}</TextBlock>
    </PopUpContainer>
  );
};

const styles = StyleSheet.create({
  text: {},
});

export default DictionarySelectionScreen;
