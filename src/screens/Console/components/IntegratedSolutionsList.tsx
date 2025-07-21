import { AntDesign, Feather } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConsoleState,
  updateShowSolution,
} from "@src/store/console";
import AppText from "@src/components/AppText";
import { settingsState } from "@src/store/settings";
import colors from "@src/utils/colors";
import { speak } from "@src/utils/appSpeak";
import { updateModals } from "@src/store/modals";
import useCheckTTSData from "@src/hooks/consoleHooks/useCheckTTSData";
import LevelPopAnimation from "../../../components/LevelPopAnimation";
import useColors from "../../../hooks/utilityHooks/useColors";
import SolutionsList from "./SolutionsList";
import appShadow from "../../../utils/appShadow";
import AcceptedAnswers from "../../Collection/WordInfoScreen/AcceptedAnswers";

const IntegratedSolutionsList = () => {
  const {
    gamePlay: { solutions },
    locals: { showSolution },
  } = useSelector(selectConsoleState);

  const { CONTRAST, PRIMARY } = useColors();

  const dispatch = useDispatch();

  const closeFunction = () => {
    dispatch(updateShowSolution(false));
  };

  return (
    <View
      style={{
        width: "100%",
        zIndex: 500,
        position: "relative",
      }}
    >
      {showSolution && (
        <View
          style={{
            position: "absolute",
            top: 5,
            left: 0,
            width: "100%",
            height: 110,
            borderRadius: 10,
            backgroundColor: PRIMARY,
            justifyContent: "center",
            alignItems: "center",
            ...appShadow(CONTRAST),
          }}
        >
          <TouchableOpacity
            onPress={closeFunction}
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 500,
            }}
          >
            <AntDesign
              name="close"
              size={20}
              color={CONTRAST}
            />
          </TouchableOpacity>
          <AcceptedAnswers />
          <View
            style={{ borderRadius: 10, overflow: "hidden" }}
          >
            <SolutionsList ticket={{ solutions }} />
          </View>
        </View>
      )}
    </View>
  );
};

export default IntegratedSolutionsList;
