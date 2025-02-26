import { TouchableOpacity, View } from "react-native";
import AppText from "../AppText";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/utilityHooks/useColors";

const DownloadAppScreenForWebAppOnMobile = () => {
  const { appLang } = useSelector(settingsState);
  const { webAppUnavailableOnMobileNotice } =
    appTextSource(appLang).paywall;
  const { PRIMARY, CONTRAST } = useColors();

  const goToLinkKingCom = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://link-king.com"; // Opens the link in the current window
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
      }}
    >
      <TouchableOpacity
        onPress={goToLinkKingCom}
        style={{
          width: "95%",
          padding: 10,
          backgroundColor: PRIMARY,
          borderRadius: 10,
          ...appShadow(CONTRAST),
        }}
      >
        <AppText>{webAppUnavailableOnMobileNotice}</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default DownloadAppScreenForWebAppOnMobile;
