import { Linking } from "react-native";
import RefreshButton from "../../components/RefreshButton";
import { settingsState } from "@src/store/settings";
import { useDispatch, useSelector } from "react-redux";
import appTextSource from "../../utils/appTextSource";
import AppText from "@src/components/AppText";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import AntDesign from "@expo/vector-icons/AntDesign";
import useColors from "@src/hooks/utilityHooks/useColors";
import AnnouncementContainer from "@src/components/Containers/AnnouncementContainer";
import { authState } from "@src/store/auth";
import AppLink from "@src/components/AppLink";
import { updateModals } from "@src/store/modals";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const InternetConnectionPage = () => {
  const { appLang } = useSelector(settingsState);
  const { CONTRAST } = useColors();
  const dispatch = useDispatch();

  const { connection } = useSelector(authState);

  const {
    title1,
    title2,
    title3,
    message1,
    message2,
    message3,
    message4,
    message5,
  } = appTextSource(appLang).internetConnectionPage;

  const logOut = appTextSource(appLang).options.logOut.name;

  let [heading, message] = [title1, message1];
  if (connection === "maintenance")
    [heading, message] = [title2, message2];
  if (connection === "unknown")
    [heading, message] = [title3, message3];

  return (
    <AnnouncementContainer>
      <AuthFormContainer heading={heading} back={false}>
        <AntDesign
          name="disconnect"
          size={100}
          color={CONTRAST}
          style={{ padding: base * 20 }}
        />
        <AppText style={{ paddingVertical: 10 }}>
          {message}
        </AppText>
        <RefreshButton />
        {connection === "maintenance" ? (
          <AppLink
            title={message4}
            onPress={() =>
              Linking.openURL(
                "https://millerjrrr.github.io/jacobs-apps/#/link-king"
              )
            }
          />
        ) : null}
        {connection === "unknown" ? (
          <AppLink
            title={message5}
            onPress={() =>
              dispatch(
                updateModals({
                  modalShowing: "contactUsModal",
                })
              )
            }
          />
        ) : null}
        <AppLink
          title={logOut}
          onPress={() =>
            dispatch(
              updateModals({
                modalShowing: "logOutModal",
              })
            )
          }
        />
      </AuthFormContainer>
    </AnnouncementContainer>
  );
};

export default InternetConnectionPage;
