import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import styled from "styled-components";
import bookPictures from "../../utils/bookPictures";

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

  const typeIsImage =
    Object.keys(bookPictures).includes(iconName);

  const source =
    bookPictures[iconName] ||
    bookPictures["Custom-Dictionary"];

  return !typeIsImage ? (
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
      <Image
        {...{
          source,
          resizeMode: "contain",
          style: {
            width: 48,
            height: 48,
            margin: 5,
          },
        }}
      />
      <OptionContainer
        {...{ borderColor, borderTopWidth: first ? 0 : 1 }}
      >
        {children}
      </OptionContainer>
    </TouchableContainer>
  );
};

export default OptionsMenuItemContainer;
