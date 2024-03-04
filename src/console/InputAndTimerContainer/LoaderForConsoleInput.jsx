import { View } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import Loader from "../../ui/Loaders/Loader";

const LoaderForConsoleInput = () => {
  const { busy } = useSelector(getConsoleState);

  return busy ? (
    <View
      style={{
        position: "absolute",
        zIndex: 20,
      }}
    >
      <Loader size={24} />
    </View>
  ) : null;
};

export default LoaderForConsoleInput;
