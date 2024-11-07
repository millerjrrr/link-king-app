import { StyleSheet } from "react-native";
import colors from "@src/utils/colors";
import RefreshButton from "./RefreshButton";
import { settingsState } from "@src/store/settings";
import { useSelector } from "react-redux";
import appTextSource from "../utils/appTextSource";
import AppText from "@src/components/AppText";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import AntDesign from "@expo/vector-icons/AntDesign";

const InternetConnectionPage = ({ refresh }) => {
  const { colorScheme, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[0];

  const { title, message } =
    appTextSource(appLang).internetConnectionPage;
  return (
    <AuthFormContainer heading={title} back={false}>
      <AntDesign
        name="disconnect"
        size={100}
        color={color}
        style={{ padding: 20 }}
      />
      <AppText style={{ paddingVertical: 10 }}>
        {message}
      </AppText>
      <RefreshButton refresh={refresh} />
    </AuthFormContainer>
  );
};

export default InternetConnectionPage;
