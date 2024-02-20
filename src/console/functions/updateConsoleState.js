import { updateCSState } from "../../store/console";

export const updateConsoleState = async (
  resData,
  dispatch,
) => {
  const { gamePlay, options, stats, display } = resData;
  const { target, solutions, speechLang } = gamePlay;
  const payload = {
    attempt: { target, solutions, speechLang },
    options,
    stats,
    tail: display.tail,
    tries: gamePlay.tries,
    busy: false,
    golden: stats.newWords ? 1 : 0,
  };
  dispatch(updateCSState(payload));
};
