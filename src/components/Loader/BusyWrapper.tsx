import { ReactNode } from "react";
import Loader from ".";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";

interface BusyWrapperProps {
  busy: boolean;
  size?: number;
  color?: string;
  children: ReactNode;
}
const BusyWrapper: React.FC<BusyWrapperProps> = ({
  busy,
  size,
  color,
  children,
}) => {
  const { colorScheme } = useSelector(settingsState);
  const { PRIMARY } = colors[colorScheme];
  return (
    <>
      {busy ? (
        <View style={{ flex: 1, backgroundColor: PRIMARY }}>
          <Loader {...{ color, size }} />
        </View>
      ) : (
        children
      )}
    </>
  );
};

export default BusyWrapper;
