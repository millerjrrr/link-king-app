import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { useSelector } from "react-redux";

const useColors = () => {
  const { colorScheme, golden } =
    useSelector(settingsState);
  const COLORS = colors[colorScheme];
  return { ...COLORS, CONTRAST: COLORS.CONTRAST[golden] };
};

export default useColors;
