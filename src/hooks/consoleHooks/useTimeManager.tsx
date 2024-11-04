import { useDispatch, useSelector } from "react-redux";
import {
  getConsoleState,
  incrementTimeOnThisWord,
  updateTimerIsOn,
} from "@src/store/console";
import { useEffect } from "react";

const useTimeManager = () => {
  const { stats, timerIsOn, showSolution } =
    useSelector(getConsoleState);
  const { steps } = stats;
  const dispatch = useDispatch();

  // 1. Timer Effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timerIsOn) {
      intervalId = setInterval(() => {
        dispatch(incrementTimeOnThisWord(1000));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerIsOn, dispatch]);
  // dispatch itself never changes
  // but should be included as it is technically a dependency

  // 2. Timeout for Timer Reset
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const timeOutTime = showSolution
      ? 10 * 1000
      : 30 * 1000;

    if (timerIsOn) {
      timeoutId = setTimeout(() => {
        dispatch(updateTimerIsOn(false));
      }, timeOutTime);
    }

    return () => clearTimeout(timeoutId);
  }, [timerIsOn, steps, showSolution, dispatch]);
};

export default useTimeManager;
