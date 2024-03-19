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
  dispatch(updateCSState(payload));
};
