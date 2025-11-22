import React from "react";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import {
  Container,
  InfoContainer,
  Padding,
} from "./StyledComponents";
import { settingsState } from "@src/store/settings";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const PlusButton = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { CONTRAST, SECONDARY } = colors[colorScheme];

  const navigation = useNavigation();
  const addNewWord = () =>
    navigation.navigate("Dictionary Lookup");

  return (
    <Padding>
      <Container
        color={CONTRAST[golden]}
        backgroundColor={SECONDARY}
        style={{ opacity: 0.5 }}
      >
        <InfoContainer
          onPress={addNewWord}
          style={{ alignItems: "center" }}
        >
          <Entypo
            name="plus"
            size={base * 24}
            color={CONTRAST[golden]}
          />
        </InfoContainer>
      </Container>
    </Padding>
  );
};

export default PlusButton;
