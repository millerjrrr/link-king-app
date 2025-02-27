import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp as SNP } from "@react-navigation/stack";
import {
  CollectionStackParamList,
  ConsoleStackParamList,
  OptionsStackParamList,
} from "@src/types/navigationTypes";
import { useEffect } from "react";

const usePopToTop = () => {
  const navigation = useNavigation();
  const consoleNavigation =
    useNavigation<SNP<ConsoleStackParamList>>();
  const collectionNavigation =
    useNavigation<SNP<CollectionStackParamList>>();
  const optionsNavigation =
    useNavigation<SNP<OptionsStackParamList>>();

  const route = useRoute();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        if (
          route.name !== "Console" &&
          consoleNavigation.canGoBack()
        ) {
          consoleNavigation.reset({
            index: 0,
            routes: [{ name: "Console" }],
          });
        }

        if (
          route.name !== "Collection" &&
          collectionNavigation.canGoBack()
        ) {
          collectionNavigation.reset({
            index: 0,
            routes: [{ name: "Collection" }],
          });
        }

        if (
          route.name !== "Options" &&
          optionsNavigation.canGoBack()
        ) {
          optionsNavigation.reset({
            index: 0,
            routes: [{ name: "Options" }],
          });
        }
      },
    );

    return unsubscribe; // Clean up the listener on unmount
  }, [navigation, route]);
};

export default usePopToTop;
