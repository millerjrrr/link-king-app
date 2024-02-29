import {
  updateLevelBreakdown,
  updateUserGameData,
} from "../../store/stats";

export const updateStatsState = (resData, dispatch) => {
  const { levelBreakdown, userGameData } = resData;
  dispatch(updateLevelBreakdown(levelBreakdown));
  dispatch(updateUserGameData(userGameData));
};
