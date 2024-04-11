import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import styled from "styled-components";

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
}) => {
  const { colorScheme, golden } = useSelector(
    getSettingsState,
  );
  const backgroundColor = colors[colorScheme].PRIMARY;
  const borderColor = colors[colorScheme].INACTIVE_CONTRAST;
  const color = colors[colorScheme].CONTRAST[golden];

  const dictionaryList = ["Brazil", "Spanish"];
  const typeIsImage = dictionaryList.includes(iconName);

  let source;
  if (typeIsImage)
    source =
      iconName === "Brazil"
        ? require("../../assets/Brazil.png")
        : require("../../assets/Spanish.png");

  return (
    <Container {...{ backgroundColor }}>
      {!typeIsImage ? (
        <MaterialCommunityIcons
          {...{
            name: iconName,
            size: 32,
            color,
            style: { margin: 5 },
          }}
        />
      ) : (
        <Image
          {...{
            source,
            resizeMode: "contain",
            style: {
              width: selected ? 96 : 48,
              height: selected ? 96 : 48,
            },
          }}
        />
      )}
      <OptionContainer
        {...{ borderColor, borderTopWidth: first ? 0 : 1 }}
      >
        {children}
      </OptionContainer>
    </Container>
  );
};

export default OptionsMenuItemContainer;
