import { Platform, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import { appShadowForStyledComponents } from "@src/utils/appShadow";
import AppText from "@src/components/AppText";
import { selectConsoleState } from "@src/store/console";
import { updateModals } from "@src/store/modals";
import useColors from "@src/hooks/useColors";
import styled from "styled-components/native";
import { CollectionStackParamList } from "@src/types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { updateSelectedTicket } from "@src/store/collection";
import Ticket from "@src/types/Ticket";
import definitionWebLookup from "@src/utils/definitionWebLookup";

const SolutionContainer = styled(TouchableOpacity)<{
  color: string;
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  margin-horizontal: 5px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 13px;
  border-radius: 20px;
  height: 40px;
  ${(props) => appShadowForStyledComponents(props.color)}
`;

const SolutionItem = ({
  solution,
  red,
  ticket,
  target,
  edit,
}: {
  solution: string;
  red?: boolean;
  ticket?: Ticket;
  target?: string;
  edit?: boolean;
}) => {
  const { appLang } = useSelector(settingsState);
  const { dictionary } = useSelector(selectConsoleState);
  const { RED, CONTRAST, SECONDARY } = useColors();

  const languageCode = dictionary;
  appLang.slice(0, 2);

  const dispatch = useDispatch();
  const navigation =
    useNavigation<
      StackNavigationProp<CollectionStackParamList>
    >();

  const onPress =
    ticket && target
      ? () => {
          if (edit)
            dispatch(
              updateModals({
                showNewWordAddedModal: false,
              }),
            );
          dispatch(updateSelectedTicket(ticket));
          navigation.navigate("Edit Solutions");
        }
      : () => {
          Platform.OS === "web"
            ? definitionWebLookup(solution, languageCode)
            : dispatch(
                updateModals({
                  modalShowing: "definitionInWebViewModal",
                  definitionSearchWord: solution,
                  definitionSearchLanguage: languageCode,
                }),
              );
        };

  return (
    <SolutionContainer
      color={red ? RED : CONTRAST}
      backgroundColor={SECONDARY}
      onPress={onPress}
    >
      <AppText style={red ? { color: RED } : undefined}>
        {solution}
      </AppText>
    </SolutionContainer>
  );
};

export default SolutionItem;
