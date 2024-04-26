import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { getConsoleState } from "../../store/console";
import SolutionItem from "./SolutionItem";
import HorizontalScrollFade from "./HorizonatalScrollFade";

const SolutionsList = () => {
  const {
    attempt: { solutions },
  } = useSelector(getConsoleState);

  return (
    <HorizontalScrollFade>
      <View style={{ height: 70, alignItems: "center" }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 5,
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          {solutions.map((solution, index) => {
            return (
              <SolutionItem {...{ solution, key: index }} />
            );
          })}
        </ScrollView>
      </View>
    </HorizontalScrollFade>
  );
};

export default SolutionsList;
