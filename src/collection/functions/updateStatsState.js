import {
  updateBusyState,
  updateLevelBreakdown,
  updateUserGameData,
} from "../../store/stats";

export const updateStatsState = ({ data, dispatch }) => {
  const { levelBreakdown, userGameData } = data;
  dispatch(updateLevelBreakdown(levelBreakdown));
  dispatch(updateUserGameData(userGameData));
  dispatch(updateBusyState(false));
};
