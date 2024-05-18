import { useSelector } from "react-redux";
import colors from "../../utils/colors";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import AppText from "../../ui/AppText";

const ResponseInformation = ({ status }) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];

  const { responseA, responseB } =
    appTextSource[appLang].console.targetDetails;

  return status ? (
    <AppText
      style={{
        marginHorizontal: 10,
      }}
    >
      {responseA}
    </AppText>
  ) : (
    <AppText
      style={{
        marginHorizontal: 15,
      }}
    >
      {responseB}
    </AppText>
  );
};

export default ResponseInformation;
