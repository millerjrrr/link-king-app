import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authState } from "@src/store/auth";
import useCatchAsync from "../../useCatchAsync";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "@src/utils/asyncStorage";
import { AppState } from "react-native";
import { updateModals } from "@src/store/modals";
import useFetchAuthInfo from "./../../authHooks/useFetchAuthInfo";

const useManageModals = () => {
  const { subscribed, trialDays, vip } =
    useSelector(authState);
  const catchAsync = useCatchAsync();
  const dispatch = useDispatch();
  const fetchAuthInfo = useFetchAuthInfo();

  const [appState, setAppState] = useState(
    AppState.currentState,
  );

  // 1. Logic to show the modals
  const showModalOnAppOpen = catchAsync(async () => {
    console.log("# Checking first-time and sub");
    const firstTime =
      await getFromAsyncStorage("first-time");

    if (firstTime !== "no") {
      dispatch(updateModals({ showWelcomeModal: true }));
      await saveToAsyncStorage("first-time", "no");
    } else if (
      vip < Date.now() &&
      !subscribed &&
      trialDays > 0
    )
      dispatch(
        updateModals({ showTrialNoticeModal: true }),
      );
  });

  // 2. Logic to check whether to run or not
  const checkAndShowModal = catchAsync(async () => {
    console.log("# Checking last run today");
    const lastRun =
      await getFromAsyncStorage("last-run-date");
    const today = new Date().toISOString().split("T")[0];

    if (lastRun !== today) {
      await fetchAuthInfo();
      await showModalOnAppOpen();
      await saveToAsyncStorage("last-run-date", today);
    }
  });

  // 3. Run on AppState Change
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          checkAndShowModal();
        }
        setAppState(nextAppState);
      },
    );

    return () => subscription.remove();
  }, [appState]);

  // 4. Run on app load
  useEffect(() => {
    fetchAuthInfo();
    checkAndShowModal();
  }, []);
};

export default useManageModals;
