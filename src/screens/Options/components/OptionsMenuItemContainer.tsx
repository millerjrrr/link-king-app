import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import styled from "styled-components/native";
import FlagImage from "@src/components/Graphics/FlagImage";
import languageNameCodeMap from "@src/utils/languageNameCodeMap";
import Dictionary from "../../../types/dictionaries";
import { ReactNode } from "react";
import useColors from "../../../hooks/utilityHooks/useColors";

interface StyleProps {
  backgroundColor?: string;
  borderTopWidth?: number;
  borderColor?: string;
}
const TouchableContainer = styled(TouchableOpacity)<{}>`
  width: 100%;
  height: 60px;
  align-items: center;
  flex-direction: row;
  margin-horizontal: 10px;
  background-color: ${(props: StyleProps) =>
    props.backgroundColor};
`;

const Container = styled(View)`
  width: 100%;
  height: 60px;
  align-items: center;
  flex-direction: row;
  margin-horizontal: 10px;
  background-color: ${(props: StyleProps) =>
    props.backgroundColor};
`;

const OptionContainer = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: center;
  margin: 10px;
  border-color: ${(props: StyleProps) => props.borderColor};
  border-top-width: ${(props: StyleProps) =>
    props.borderTopWidth}px;
`;
interface OptionsMenuItemContainerProps {
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  dictionary?: Dictionary;
  first?: boolean;
  children: ReactNode;
  onPress: () => void;
}

const OptionsMenuItemContainer: React.FC<
  OptionsMenuItemContainerProps
> = ({
  iconName,
  dictionary,
  first,
  children,
  onPress,
}) => {
  const { appLang } = useSelector(settingsState);
  const { PRIMARY, INACTIVE_CONTRAST, CONTRAST } =
    useColors();

  const [flag1, flag2] = !!dictionary
    ? [appLang, languageNameCodeMap[dictionary]]
    : ["", ""];

  return !dictionary ? (
    <Container backgroundColor={PRIMARY}>
      {!!iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={32}
          color={CONTRAST}
          style={{ margin: 5 }}
        />
      )}
      <OptionContainer
        borderColor={INACTIVE_CONTRAST}
        borderTopWidth={first ? 0 : 1}
      >
        {children}
      </OptionContainer>
    </Container>
  ) : (
    <TouchableContainer
      backgroundColor={PRIMARY}
      onPress={onPress}
    >
      <FlagImage flag1={flag1} flag2={flag2} />
      <OptionContainer
        borderColor={INACTIVE_CONTRAST}
        borderTopWidth={first ? 0 : 1}
      >
        {children}
      </OptionContainer>
    </TouchableContainer>
  );
};

export default OptionsMenuItemContainer;
