import { StyleSheet, View } from "react-native";
import colors from "@src/utils/colors";
import RefreshButton from "../components/RefreshButton";
import { settingsState } from "@src/store/settings";
import { useSelector } from "react-redux";
import appTextSource from "../utils/appTextSource";
import AppText from "@src/components/AppText";
import AuthFormContainer from "@src/components/Containers/AuthFormContainer";
import AntDesign from "@expo/vector-icons/AntDesign";
import useColors from "@src/hooks/useColors";

const InternetConnectionPage = ({ refresh }) => {
  const { appLang } = useSelector(settingsState);
  const { CONTRAST, PRIMARY } = useColors();

  const { title, message } =
    appTextSource(appLang).internetConnectionPage;

  return (
    <View style={{ backgroundColor: PRIMARY }}>
      <AuthFormContainer heading={title} back={false}>
        <AntDesign
          name="disconnect"
          size={100}
          color={CONTRAST}
          style={{ padding: 20 }}
        />
        <AppText style={{ paddingVertical: 10 }}>
          {message}
        </AppText>
        <RefreshButton refresh={refresh} />
      </AuthFormContainer>
    </View>
  );
};

export default InternetConnectionPage;
