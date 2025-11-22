import React, { ReactNode } from "react";
import Loader from ".";
import { View } from "react-native";

interface BusyWrapperProps {
  busy: boolean;
  size?: number;
  color?: string;
  children: ReactNode;
  noFlex?: boolean;
}
const BusyWrapper: React.FC<BusyWrapperProps> = ({
  busy,
  size,
  color,
  children,
  noFlex,
}) => {
  return (
    <>
      {busy ? (
        <View
          style={{
            flex: noFlex ? 0 : 1,
          }}
        >
          <Loader {...{ color, size }} />
        </View>
      ) : (
        children
      )}
    </>
  );
};

export default BusyWrapper;
