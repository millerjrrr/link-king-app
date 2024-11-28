import { ScrollView, View } from "react-native";
import SolutionItem from "./SolutionItem";
import HorizontalScrollFade from "./HorizonatalScrollFade";

const SolutionsList = ({ ticket, plus, edit }: any) => {
  const { solutions, target } = ticket;

  return (
    <HorizontalScrollFade>
      <View
        style={{
          height: 70,
          alignItems: "center",
          backgroundColor: "#00000000",
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
          {plus || edit ? (
            <SolutionItem
              key="+"
              {...{
                solution: "+",
                ticket,
                target,
                edit,
              }}
            />
          ) : null}
          {solutions.map(
            (solution: string, index: number) => {
              return (
                <SolutionItem
                  key={index}
                  solution={solution}
                />
              );
            },
          )}
        </ScrollView>
      </View>
    </HorizontalScrollFade>
  );
};

export default SolutionsList;
