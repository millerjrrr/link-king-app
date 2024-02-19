import {
  updateAttempt,
  updateOptions,
  updateStats,
  updateTries,
  updateTail,
  updateBusyState,
  updateGolden,
} from "../../store/console";

export const updateConsoleState = (resData, dispatch) => {
  const { gamePlay, options, stats, display } = resData;
  const { target, solutions, speechLang } = gamePlay;
  dispatch(
    updateAttempt({
      target,
      solutions,
      speechLang,
    }),
  );
  dispatch(updateOptions(options));
  dispatch(updateStats(stats));
  dispatch(updateTries(gamePlay.tries));
  dispatch(updateTail(display.tail));
  dispatch(updateBusyState(false));
  if (stats.newWords) dispatch(updateGolden(1));
};
