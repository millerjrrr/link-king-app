// src/hooks/useSyncBadgeWithDue.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import { selectConsoleState } from "@src/store/console";

export const useSyncBadgeWithDue = () => {
  const {
    stats: { due },
  } = useSelector(selectConsoleState);

  useEffect(() => {
    Notifications.setBadgeCountAsync(due);
  }, [due]);
};
