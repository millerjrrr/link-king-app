import { View } from "react-native";
import Loader from "./Loader";

const ListFooterComponent: React.FC<{
  active: boolean;
}> = ({ active }) => {
  return (
    <View style={{ padding: 15 }}>
      {active && <Loader size={60} />}
      <View style={{ height: 160 }} />
    </View>
  );
};

export default ListFooterComponent;
