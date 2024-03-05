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
    golden:
      stats.newWords && stats.time > 3 * 60 * 1000 ? 1 : 0,
  };
  dispatch(updateCSState(payload));
};
