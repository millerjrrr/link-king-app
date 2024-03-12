import { updateColors } from "../../store/colors";
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
    dispatch(updateColors({ golden: 1 }));
  else dispatch(updateColors({ golden: 0 }));
  dispatch(updateCSState(payload));
};
