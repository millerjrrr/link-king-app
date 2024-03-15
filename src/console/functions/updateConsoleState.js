import { updateSettings } from "../../store/settings";
import { updateCSState } from "../../store/console";

export const updateConsoleState = async (
  resData,
  dispatch,
) => {
  const { gamePlay, options, stats, display } = resData;
  const payload = {
    attempt: gamePlay,
    options,
    stats,
    tail: display.tail,
    tries: gamePlay.tries,
    busy: false,
  };
  if (stats.newWords && stats.time > 3 * 60 * 1000)
    dispatch(updateSettings({ golden: 1 }));
  else dispatch(updateSettings({ golden: 0 }));
  dispatch(updateCSState(payload));
};
