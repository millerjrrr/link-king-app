// src/hooks/useSyncBadgeWithDue.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import { selectConsoleState } from "@src/store/console";
import { Platform } from "react-native";

export const useSyncBadgeWithDue = () => {
  const {
    stats: { due },
  } = useSelector(selectConsoleState);

  useEffect(() => {
    if (Platform.OS === "ios")
      Notifications.setBadgeCountAsync(due);
    else {
      console.log("setting badge count");
      Notifications.scheduleNotificationAsync({
        content: {
          title: "You have due words",
          body: "Tap to practice now",
          badge: due, // 👈 Set the badge number here
          sound: false,
        },
        trigger: null, // send immediately
      });
    }
  }, [due]);
};
