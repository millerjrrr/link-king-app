import {
  updateBusyState,
  updateLevelBreakdown,
  updateUserGameData,
  updateUserName,
} from "@src/store/stats";

export const updateStatsState = ({ data, dispatch }) => {
  const { levelBreakdown, userGameData, username } = data;
  dispatch(updateLevelBreakdown(levelBreakdown));
  dispatch(updateUserGameData(userGameData));
  dispatch(updateUserName(username));
  dispatch(updateBusyState(false));
};
