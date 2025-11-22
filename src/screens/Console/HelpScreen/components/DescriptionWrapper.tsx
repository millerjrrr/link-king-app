import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import colors from "@src/utils/colors";
import {
  CardContainer,
  ComponentDesc,
  ComponentTitle,
} from "./StyledComponents";
import { ReactNode } from "react";

interface DescriptionWrapperProps {
  name: string;
  children?: ReactNode;
}
const DescriptionWrapper: React.FC<
  DescriptionWrapperProps
> = ({ name, children }) => {
  const { colorScheme, golden, appLang } =
    useSelector(settingsState);
  const color = colors[colorScheme].CONTRAST[golden];
  const backgroundColor = colors[colorScheme].PRIMARY;

  const text = appTextSource(appLang).console.help;

  const { title, description } =
    typeof text[name as keyof typeof text] === "object"
      ? (text[name as keyof typeof text] as {
          title: string;
          description: string;
        })
      : { title: "Error", description: "Error" };

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
