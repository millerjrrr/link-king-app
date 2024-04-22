import { View } from "react-native";
import AuthFormContainer from "../../../components/containers/AuthFormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsState } from "../../../store/settings";
import appTextSource from "../../../utils/appTextSource";
import AuthButton from "../../../ui/Buttons/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../utils/colors";
import { refreshPage } from "../../../store/auth";

const Welcome = ({ route }) => {
  const { key } = route.params;
  const { appLang } = useSelector(getSettingsState);
  const color = colors.dark.CONTRAST[0];
  const name =
    key === "start"
      ? "account-arrow-right-outline"
      : "account-arrow-left-outline";
  const page = key === "start" ? "Name" : "SignIn";

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onPress = async () => {
    navigation.navigate(page);
    if (page === "SignIn") dispatch(refreshPage());
  };

  const { heading, subHeading, buttonTitle } =
    appTextSource[appLang].auth.signUp[key];

  return (
    <AuthFormContainer {...{ heading, subHeading }}>
      <MaterialCommunityIcons
        {...{
          name,
          size: 100,
          color,
        }}
      />
      <View style={{ height: 20 }} />
      <AuthButton
        {...{ title: buttonTitle, busy: false, onPress }}
      />
    </AuthFormContainer>
  );
};

export default Welcome;
