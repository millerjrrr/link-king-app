import { View } from "react-native";
import Loader from "./Loader";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const ListFooterComponent: React.FC<{
  active: boolean;
}> = ({ active }) => {
  return (
    <View style={{ padding: base * 15 }}>
      {active && <Loader size={base * 60} />}
      <View style={{ height: base * 160 }} />
    </View>
  );
};

export default ListFooterComponent;
