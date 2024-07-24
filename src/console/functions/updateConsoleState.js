import { updateCSState } from "../../store/console";
import { updateSettings } from "../../store/settings";

export const updateConsoleState = async (
  resData,
  dispatch,
) => {
  const { gamePlay, options, stats, display, dictionary } =
    resData;
  const payload = {
    attempt: gamePlay,
    options,
    stats,
    tail: display.tail,
    tries: gamePlay.tries,
    dictionary,
    busy: false,
  };
  if (stats.steps === 0)
    dispatch(updateSettings({ golden: 0 }));
  dispatch(updateCSState(payload));
};
