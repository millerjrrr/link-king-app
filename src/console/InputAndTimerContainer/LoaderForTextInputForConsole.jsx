import { View } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import Loader from "../../ui/Loader";

const LoaderForTextInputForConsole = () => {
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

export default LoaderForTextInputForConsole;
