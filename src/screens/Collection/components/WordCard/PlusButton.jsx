import React, { useCallback } from "react";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import {
  Container,
  InfoContainer,
} from "./StyledComponents";
import { settingsState } from "@src/store/settings";
import { Entypo } from "@expo/vector-icons";

const PlusButton = ({ navigation, ticket, onPress }) => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { CONTRAST, SECONDARY } = colors[colorScheme];

  const addNewWord = () => console.log("add new word");

  return (
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
          size={24}
          color={CONTRAST[golden]}
        />
      </InfoContainer>
    </Container>
  );
};

export default PlusButton;
