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
        console.log("# Navigating to ", route.name);

        if (route.name !== "ConsoleStackScreen") {
          consoleNavigation.reset({
            index: 0,
            routes: [{ name: "ConsoleStackScreen" }],
          });
        }

        if (route.name !== "WordsCollection") {
          collectionNavigation.reset({
            index: 0,
            routes: [{ name: "WordsCollection" }],
          });
        }

        if (route.name !== "OptionsStackScreen") {
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
