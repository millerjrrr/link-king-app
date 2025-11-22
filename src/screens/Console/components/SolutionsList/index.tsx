import { Platform, View } from "react-native";
import SolutionItem from "./SolutionItem";
import HorizontalScrollFade from "./HorizonatalScrollFade";
import { ScrollView } from "react-native-gesture-handler";
import screenDimensions from "@src/utils/screenDimensions";
const { base, width } = screenDimensions();

const SolutionsList = ({ ticket, plus, edit }: any) => {
  const { solutions, target } = ticket;

  return (
    <HorizontalScrollFade>
      <View
        style={{
          height: base * 70,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#00000000",
        }}
      >
        <ScrollView
          horizontal
          style={{
            maxWidth:
              Platform.OS === "web"
                ? width - base * 60
                : "100%",
          }} //important for web
          showsHorizontalScrollIndicator={
            Platform.OS === "web"
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: base * 5,
            paddingHorizontal: base * 30,
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
                  edit={edit}
                />
              );
            }
          )}
        </ScrollView>
      </View>
    </HorizontalScrollFade>
  );
};

export default SolutionsList;
