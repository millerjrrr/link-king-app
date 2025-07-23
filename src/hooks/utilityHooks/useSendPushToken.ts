import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import clientWithAuth from "@src/api/clientWithAuth";
import * as Localization from "expo-localization";
import { Platform } from "react-native";

const useSendPushToken = () => {
  useEffect(() => {
    const registerPushToken = async () => {
      const { status } =
        await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        console.warn(
          "🔕 Notification permission not granted",
        );
        return;
      }

      if (!Device.isDevice) {
        console.warn(
          "❌ Must use physical device for push notifications",
        );
        return;
      }

      const { data: token } =
        await Notifications.getExpoPushTokenAsync();
      console.log("📱 Expo Push Token:", token);

      await clientWithAuth.post(
        "/api/v1/users/update-user-push-token-and-timezone",
        {
          pushToken: token,
          timezone: Localization.getCalendars()[0].timeZone,
        },
      );
    };

    const setupForAndroidNotifications = () => {
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync(
          "default",
          {
            name: "default",
            importance:
              Notifications.AndroidImportance.HIGH,
            showBadge: true,
          },
        );
      }
    };

    setupForAndroidNotifications();
    registerPushToken();
  }, []);
};

export default useSendPushToken;
