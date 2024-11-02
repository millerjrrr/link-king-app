import { ScrollView, View } from "react-native";
import styled from "styled-components";
import PopUpContainer from "./../components/containers/PopUpContainer";
import { useSelector } from "react-redux";
import { getSettingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import appTextSource from "@src/utils/appTextSource";
import AuthButton from "../components/Buttons/AuthButton";
import AppText from "../components/AppText";

const Container = styled(ScrollView)`
  margin-horizontal: 15px;
`;

const TextBlock = styled(AppText)`
  padding-vertical: 20px;
  text-align: center;
  font-size: 30px;
  color: ${(props) => props.color};
`;

const VoiceSelectionScreen = () => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { title, textA, textB, tip, accessSettings } =
    appTextSource(appLang).options.voiceSelection;

  const onPress = () => {
    console.log("not working yet");
  };

  return (
    <PopUpContainer heading={title}>
      <Container>
        <TextBlock {...{ color }}>{textA}</TextBlock>
        <TextBlock {...{ color }}>{textB}</TextBlock>
        <TextBlock {...{ color }}>{tip}</TextBlock>
        <View style={{ padding: 20, paddingBottom: 60 }}>
          <AuthButton
            {...{ title: accessSettings, onPress }}
          />
        </View>
      </Container>
    </PopUpContainer>
  );
};

export default VoiceSelectionScreen;
