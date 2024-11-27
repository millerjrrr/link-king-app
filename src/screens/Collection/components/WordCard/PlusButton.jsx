import React from "react";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";
import {
  Container,
  InfoContainer,
} from "./StyledComponents";
import { settingsState } from "@src/store/settings";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PlusButton = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const { CONTRAST, SECONDARY } = colors[colorScheme];

  const navigation = useNavigation();
  const addNewWord = () =>
    navigation.navigate("DictionaryLookupScreen");

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
