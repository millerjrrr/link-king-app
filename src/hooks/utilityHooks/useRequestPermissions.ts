import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export const useRequestPermissions = () => {
  useEffect(() => {
    const request = async () => {
      const { status } =
        await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };

    request();
  }, []);
};
