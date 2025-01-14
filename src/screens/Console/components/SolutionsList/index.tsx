import { Platform, ScrollView, View } from "react-native";
import SolutionItem from "./SolutionItem";
import HorizontalScrollFade from "./HorizonatalScrollFade";
import screenDimensions from "@src/utils/screenDimensions";

const { width } = screenDimensions();

const SolutionsList = ({ ticket, plus, edit }: any) => {
  const { solutions, target } = ticket;

  const web = Platform.OS === "web";

  return (
    <HorizontalScrollFade>
      <View
        style={{
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          // width: width - 30, remember
          // to test on phone when updating this for web
          backgroundColor: "#00000000",
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={web}
          contentContainerStyle={{
            padding: 5,
            paddingHorizontal: 30,
            alignItems: "center",
            maxWidth: web ? width - 30 : undefined,
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
