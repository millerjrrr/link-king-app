import { View } from "react-native";
import Loader from ".";

const BusyWrapper = ({
  busy,
  size,
  color,
  backgroundColor,
  children,
  pushToTop,
}) => {
  return (
    <>
      {busy ? (
        <>
          <Loader {...{ color, size, backgroundColor }} />
          {pushToTop ? <View style={{ flex: 1 }} /> : null}
        </>
      ) : (
        children
      )}
    </>
  );
};

export default BusyWrapper;
