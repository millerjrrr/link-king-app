import { useDispatch, useSelector } from "react-redux";
import AppText from "./AppText";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppLink from "./AppLink";
import { updateModals } from "@src/store/modals";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const ForgotOrDidntSetUpPassword = () => {
  const { appLang } = useSelector(settingsState);
  const dispatch = useDispatch();
  const { forgotOrDidntSetUpPassword } =
    appTextSource(appLang).options.manageAccount;
  const title = appTextSource(appLang).options.logOut.name;
  return (
    <>
      <AppText style={{ fontSize: base * 15 }}>
        {forgotOrDidntSetUpPassword}
      </AppText>
      <AppLink
        title={title}
        onPress={() =>
          dispatch(
            updateModals({ modalShowing: "logOutModal" })
          )
        }
      />
    </>
  );
};

export default ForgotOrDidntSetUpPassword;
