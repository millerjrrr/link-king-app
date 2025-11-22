import { useSelector } from "react-redux";
import { statsState } from "@src/store/stats";
import LevelHistogram from "./LevelHistogram";
import PopUpContainer from "@src/components/containers/PopUpsContainer";
import { settingsState } from "@src/store/settings";
import appTextSource from "@src/utils/appTextSource";
import AppText from "@src/components/AppText";
import StatsContainer from "./StatsContainer";
import useFetchStatsInfo from "@src/hooks/collectionHooks/useFetchStatsInfo";
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import BusyWrapper from "@src/components/Loader/BusyWrapper";
import { useNavigation } from "@react-navigation/native";
import { CollectionStackParamList } from "@src/types/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import screenDimensions from "@src/utils/screenDimensions";
const { base, width } = screenDimensions();

const StatsScreen = () => {
  const { levelBreakdown, busy } = useSelector(statsState);
  const { appLang } = useSelector(settingsState);

  useFetchStatsInfo();

  const showHist = levelBreakdown.length > 2;

  const higherLevelWords =
    levelBreakdown.length < 4
      ? 0
      : levelBreakdown
          .slice(3)
          .map((bracket) => bracket.frequency)
          .reduce((acc, num) => acc + num, 0);
  const showStories = higherLevelWords > 100;

  const { heading, description } =
    appTextSource(appLang).collection.statistics;
  const { title } =
    appTextSource(appLang).collection.stories;

  const navigation =
    useNavigation<
      StackNavigationProp<CollectionStackParamList>
    >();

  const onPress = () => {
    navigation.navigate("AI Stories");
  };

  return (
    <PopUpContainer heading={heading}>
      <BusyWrapper busy={busy} size={base * 150}>
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={
            Platform.OS !== "web"
          }
        >
          <View
            style={{ width: "100%", padding: base * 15 }}
          >
            {showHist ? (
              <LevelHistogram
                lbd={levelBreakdown}
                histHeight={width * 0.7}
              />
            ) : (
              <AppText
                {...{ style: { padding: base * 15 } }}
              >
                {description}
              </AppText>
            )}
            <StatsContainer />
            {showStories ? (
              <TouchableOpacity
                onPress={onPress}
                style={{
                  padding: base * 5,
                  paddingTop: base * 10,
                }}
              >
                <AppText
                  style={{
                    padding: base * 20,
                    fontSize: base * 25,
                  }}
                >
                  {title}
                </AppText>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </BusyWrapper>
    </PopUpContainer>
  );
};

export default StatsScreen;
