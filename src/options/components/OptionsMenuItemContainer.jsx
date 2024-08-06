import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import styled from "styled-components";
import FlagImage from "../../ui/Graphics/FlagImage";

const TouchableContainer = styled(TouchableOpacity)`
  height: 60px;
  align-items: center;
  flex-direction: row;
  margin-horizontal: 10px;
  background-color: ${(props) => props.backgroundColor};
`;

const Container = styled(View)`
  height: 60px;
  align-items: center;
  flex-direction: row;
  margin-horizontal: 10px;
  background-color: ${(props) => props.backgroundColor};
`;

const OptionContainer = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: center;
  margin: 10px;
  border-color: ${(props) => props.borderColor};
  border-top-width: ${(props) => props.borderTopWidth}px;
`;

const OptionsMenuItemContainer = ({
  iconName,
  dictionary,
  first,
  children,
  selected,
  onPress,
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const backgroundColor = colors[colorScheme].PRIMARY;
  const borderColor = colors[colorScheme].INACTIVE_CONTRAST;
  const color = colors[colorScheme].CONTRAST[golden];

  const alteredDictionary = dictionary
    ? dictionary === "Custom-Dictionary"
      ? "Portuguese-English"
      : dictionary
    : "Portuguese-English";
  const [flag1, flag2] = alteredDictionary.split("-");

  return !dictionary ? (
    <Container {...{ backgroundColor }}>
      <MaterialCommunityIcons
        {...{
          name: iconName,
          size: 32,
          color,
          style: { margin: 5 },
        }}
      />
      <OptionContainer
        {...{ borderColor, borderTopWidth: first ? 0 : 1 }}
      >
        {children}
      </OptionContainer>
    </Container>
  ) : (
    <TouchableContainer {...{ backgroundColor, onPress }}>
      <FlagImage {...{ flag1, flag2 }} />
      <OptionContainer
        {...{ borderColor, borderTopWidth: first ? 0 : 1 }}
      >
        {children}
      </OptionContainer>
    </TouchableContainer>
  );
};

export default OptionsMenuItemContainer;
