import React, { ReactNode } from "react";
import Loader from ".";
import { View } from "react-native";
import colors from "@src/utils/colors";
import useColors from "@src/hooks/utilityHooks/useColors";

interface BusyWrapperProps {
  busy: boolean;
  size?: number;
  color?: string;
  children: ReactNode;
  noFlex?: boolean;
  pulse?: boolean;
}
const BusyWrapper: React.FC<BusyWrapperProps> = ({
  busy,
  size,
  color,
  children,
  noFlex,
  pulse,
}) => {
  const { SECONDARY } = useColors();
  return (
    <>
      {busy ? (
        <View
          style={{
            flex: noFlex ? 0 : 1,
            backgroundColor: noFlex ? undefined : SECONDARY,
          }}
        >
          <Loader {...{ color, size, pulse }} />
        </View>
      ) : (
        children
      )}
    </>
  );
};

export default BusyWrapper;
