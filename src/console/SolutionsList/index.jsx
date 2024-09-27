import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import SolutionItem from "./SolutionItem";
import HorizontalScrollFade from "./HorizonatalScrollFade";
import { getSettingsState } from "../../store/settings";
import colors from "../../utils/colors";

const SolutionsList = ({ ticket, plus }) => {
  const { solutions, target } = ticket;

  const { colorScheme } = useSelector(getSettingsState);
  const backgroundColor = colors[colorScheme].PRIMARY;

  return (
    <HorizontalScrollFade>
      <View
        style={{
          height: 70,
          alignItems: "center",
          backgroundColor,
        }}
      >
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 5,
            paddingHorizontal: 30,
            alignItems: "center",
          }}
        >
          {plus ? (
            <SolutionItem
              key="+"
              {...{
                solution: "+",
                ticket,
                target,
              }}
            />
          ) : null}
          {solutions.map((solution, index) => {
            return (
              <SolutionItem key={index} {...{ solution }} />
            );
          })}
        </ScrollView>
      </View>
    </HorizontalScrollFade>
  );
};

export default SolutionsList;
