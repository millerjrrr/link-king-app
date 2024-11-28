import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  CollectionStackParamList,
  ConsoleStackParamList,
  OptionsStackParamList,
} from "@src/types/navigationTypes";
import { useEffect } from "react";

const usePopToTop = () => {
  const navigation = useNavigation();
  const consoleNavigation =
    useNavigation<ConsoleStackParamList>();
  const collectionNavigation =
    useNavigation<CollectionStackParamList>();
  const optionsNavigation =
    useNavigation<OptionsStackParamList>();

  const route = useRoute();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        const consoleState = consoleNavigation.getState();
        if (
          route.name !== "ConsoleStackScreen" &&
          consoleState.index !== 0
        ) {
          consoleNavigation.reset({
            index: 0,
            routes: [{ name: "ConsoleStackScreen" }],
          });
        }

        const collectionState =
          collectionNavigation.getState();
        if (
          route.name !== "WordsCollection" &&
          collectionState.index !== 0
        ) {
          collectionNavigation.reset({
            index: 0,
            routes: [{ name: "WordsCollection" }],
          });
        }

        const optionsState = optionsNavigation.getState();
        if (
          route.name !== "OptionsStackScreen" &&
          optionsState.index !== 0
        ) {
          optionsNavigation.reset({
            index: 0,
            routes: [{ name: "OptionsStackScreen" }],
          });
        }
      },
    );

    return unsubscribe; // Clean up the listener on unmount
  }, [navigation, route]);
};

export default usePopToTop;
