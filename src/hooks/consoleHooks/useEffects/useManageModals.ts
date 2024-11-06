import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authState } from "@src/store/auth";
import useCatchAsync from "../../useCatchAsync";
import {
  getFromAsyncStorage,
  saveToAsyncStorage,
} from "@src/utils/asyncStorage";
import { AppState } from "react-native";

const useManageModals = (
  setIsModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  setIsModalVisible2: React.Dispatch<
    React.SetStateAction<boolean>
  >,
) => {
  const { subscribed, trialDays, vip } =
    useSelector(authState);
  const catchAsync = useCatchAsync();
  const [appState, setAppState] = useState(
    AppState.currentState,
  );

  // 1. Logic to show the modals
  const showModalOnAppOpen = catchAsync(async () => {
    const firstTime =
      await getFromAsyncStorage("first-time");

    if (firstTime !== "no") {
      setIsModalVisible(true);
      await saveToAsyncStorage("first-time", "no");
    } else if (
      !(vip > Date.now()) &&
      !subscribed &&
      trialDays >= 0
    )
      setIsModalVisible2(true);
  });

  // 2. Logic to check whether to run or not
  const checkAndShowModal = catchAsync(async () => {
    const lastRun =
      await getFromAsyncStorage("last-run-date");
    const today = new Date().toISOString().split("T")[0];

    // if (lastRun !== today) {
    if (lastRun) {
      await showModalOnAppOpen();
      await saveToAsyncStorage("last-run-date", today);
    }
  });

  // 3. Run on AppState Change
  useEffect(() => {
    checkAndShowModal(); // Run on app load
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
};

export default useManageModals;
