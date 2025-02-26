import { AntDesign } from "@expo/vector-icons";
import AppText from "@src/components/AppText";
import PopUpContainer from "@src/components/Containers/PopUpContainer";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import useColors from "@src/hooks/utilityHooks/useColors";
import { settingsState } from "@src/store/settings";
import appShadow from "@src/utils/appShadow";
import appTextSource from "@src/utils/appTextSource";
import { useEffect } from "react";
import {
  Clipboard,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import useFetchStoryPrompt from "./../../hooks/collectionHooks/useFetchStoryPrompt";
import { collectionState } from "@src/store/collection";
import { selectConsoleState } from "@src/store/console";

const AIStories = () => {
  const fetchStoryPrompt = useFetchStoryPrompt();
  useEffect(() => {
    fetchStoryPrompt();
  }, []);

  const { appLang } = useSelector(settingsState);
  const { busy, promptWords } =
    useSelector(collectionState);
  const { dictionary } = useSelector(selectConsoleState);

  const { title, description, promptX, prompt, copy } =
    appTextSource(appLang).collection.stories;

  const fullprompt = promptX
    .replace("#X", dictionary)
    .replace("#Y", JSON.stringify(promptWords));
  const { CONTRAST, SECONDARY, PRIMARY } = useColors();

  const copyText = async () => {
    await Clipboard.setString(fullprompt);
  };

  return (
    <PopUpContainer heading={title}>
      <View style={{ paddingHorizontal: 15 }}>
        <BusyWrapper busy={busy} size={150}>
          <AppText
            style={{
              padding: 5,
              paddingBottom: 20,
              textAlign: "justify",
            }}
          >
            {description}
          </AppText>
          <View
            style={{
              borderRadius: 20,
              padding: 3,
              backgroundColor: PRIMARY,
              ...appShadow(CONTRAST),
              flex: 1,
              marginBottom: 20,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <AppText
                style={{
                  padding: 10,
                  fontSize: 15,
                }}
              >
                {prompt}
              </AppText>
              <TouchableOpacity
                onPress={copyText}
                style={{
                  padding: 10,
                  flexDirection: "row",
                }}
              >
                <AntDesign
                  name="copy1"
                  size={20}
                  color={CONTRAST}
                />
                <AppText style={{ fontSize: 15 }}>
                  {copy}
                </AppText>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  borderRadius: 20,
                  padding: 5,
                  backgroundColor: SECONDARY,
                  width: "100%",
                }}
              >
                <AppText
                  style={{
                    textAlign: "justify",
                    padding: 5,
                  }}
                >
                  {fullprompt}
                </AppText>
              </ScrollView>
            </View>
          </View>
        </BusyWrapper>
      </View>
    </PopUpContainer>
  );
};

export default AIStories;
