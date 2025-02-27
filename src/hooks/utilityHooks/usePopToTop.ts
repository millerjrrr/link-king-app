import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp as SNP } from "@react-navigation/stack";
import { updateSearchKeyword } from "@src/store/collection";
import {
  CollectionStackParamList,
  ConsoleStackParamList,
  OptionsStackParamList,
} from "@src/types/navigationTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["The action 'RESET' with payload"]);

const usePopToTop = () => {
  const navigation = useNavigation();
  const consoleNavigation =
    useNavigation<SNP<ConsoleStackParamList>>();
  const collectionNavigation =
    useNavigation<SNP<CollectionStackParamList>>();
  const optionsNavigation =
    useNavigation<SNP<OptionsStackParamList>>();

  const route = useRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        if (route.name !== "Console") {
          consoleNavigation.reset({
            index: 0,
            routes: [{ name: "Console" }],
          });
        }

        if (route.name !== "Collection") {
          collectionNavigation.reset({
            index: 0,
            routes: [{ name: "Collection" }],
          });
          dispatch(updateSearchKeyword(""));
        }

        if (route.name !== "Options") {
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
