import { View } from "react-native";
import { useSelector } from "react-redux";
import { selectConsoleLocals } from "@src/store/console";
import Loader from "../../../../components/Loader";

const LoaderForTextInputForConsole = ({ color }) => {
  const { busy } = useSelector(selectConsoleLocals);

  return busy ? (
    <View
      style={{
        position: "absolute",
        zIndex: 20,
      }}
    >
      <Loader size={30} color={color} />
    </View>
  ) : null;
};

export default LoaderForTextInputForConsole;
