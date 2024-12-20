import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import colors from "@src/utils/colors";
import {
  CardContainer,
  ComponentDesc,
  ComponentTitle,
} from "./StyledComponents";

const DescriptionWrapper = ({ name, children }) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const { title, description } =
    appTextSource(appLang).console.help[name];

  return (
    <CardContainer {...{ backgroundColor, color }}>
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
