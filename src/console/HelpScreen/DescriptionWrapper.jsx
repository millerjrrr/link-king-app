import { useSelector } from "react-redux";
import { getSettingsState } from "../../store/settings";
import appTextSource from "../../utils/appTextSource";
import colors from "../../utils/colors";
import {
  CardContainer,
  ComponentDesc,
  ComponentTitle,
} from "./StyledComponents";

const DescriptionWrapper = ({ name, children }) => {
  const { colorScheme, golden, appLang } = useSelector(
    getSettingsState,
  );
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroudColor = colors[colorScheme].PRIMARY;

  const { title, description } =
    appTextSource(appLang).console.help[name];

  return (
    <CardContainer {...{ backgroudColor, color }}>
      {children}
      <ComponentTitle {...{ color }}>
        {title}
      </ComponentTitle>
      <ComponentDesc {...{ color }}>
        {description}
      </ComponentDesc>
    </CardContainer>
  );
};

export default DescriptionWrapper;
