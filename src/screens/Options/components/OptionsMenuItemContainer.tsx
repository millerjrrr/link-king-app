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
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface StyleProps {
  backgroundColor?: string;
  borderTopWidth?: number;
  borderColor?: string;
}
const TouchableContainer = styled(
  TouchableOpacity
)<StyleProps>`
  width: 100%;
  height: ${base * 60}px;
  align-items: center;
  flex-direction: row;
  margin-horizontal: ${base * 10}px;
  background-color: ${(props: StyleProps) =>
    props.backgroundColor};
`;

const Container = styled(View)<StyleProps>`
  width: 100%;
  height: ${base * 60}px;
  align-items: center;
  flex-direction: row;
  margin-horizontal: ${base * 10}px;
  background-color: ${(props: StyleProps) =>
    props.backgroundColor};
`;

const OptionContainer = styled(View)<StyleProps>`
  flex: 1;
  height: 100%;
  justify-content: center;
  margin: ${base * 10}px;
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
          size={base * 32}
          color={CONTRAST}
          style={{ margin: base * 5 }}
        />
      )}
      <OptionContainer
        borderColor={INACTIVE_CONTRAST}
        borderTopWidth={first ? 0 : base * 1}
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
        borderTopWidth={first ? 0 : base * 1}
      >
        {children}
      </OptionContainer>
    </TouchableContainer>
  );
};

export default OptionsMenuItemContainer;
