import { Searchbar } from "react-native-paper";
import appShadow from "@src/utils/appShadow";
import useColors from "@src/hooks/useColors";

interface Props {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  placeholder?: string;
}
const AppSearchBar: React.FC<Props> = ({
  searchKeyword,
  setSearchKeyword,
  placeholder = "",
}) => {
  const {
    SECONDARY,
    CONTRAST: color,
    STATUSBAR,
    INACTIVE_CONTRAST,
  } = useColors();

  const keyboardAppearance =
    STATUSBAR.split("-")[0] === "dark" ? "light" : "dark";

  return (
    <Searchbar
      placeholder={placeholder}
      placeholderTextColor={INACTIVE_CONTRAST}
      keyboardAppearance={keyboardAppearance}
      allowFontScaling={false}
      iconColor={color}
      inputStyle={{ color }}
      selectionColor={color}
      autoCapitalize="none"
      value={searchKeyword}
      onChangeText={(value: string) =>
        setSearchKeyword(value)
      }
      style={{
        marginTop: 8,
        zIndex: 10,
        width: "70%",
        backgroundColor: SECONDARY,
        ...appShadow(color),
      }}
    />
  );
};

export default AppSearchBar;
