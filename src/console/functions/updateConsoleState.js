import { updateCSState } from "../../store/console";

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
  dispatch(updateCSState(payload));
};
