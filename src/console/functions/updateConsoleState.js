import {
  updateAttempt,
  updateOptions,
  updateTries,
  updateTail,
  updateBusyState,
} from "../../store/console";

export const updateConsoleState = (resData, dispatch) => {
  const { gamePlay, options, display } = resData;
  dispatch(
    updateAttempt({
      target: gamePlay.target,
      solutions: gamePlay.solutions,
    }),
  );
  dispatch(updateOptions(options));
  console.log(options);
  dispatch(updateTries(gamePlay.tries));
  dispatch(updateTail(display.tail));
  dispatch(updateBusyState(false));
};
