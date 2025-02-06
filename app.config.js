export default ({ config }) => ({
  ...config,
  expo: {
    name: "Link-King",
    slug: "LinkKingApp",
    version: "5.0.4",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    assetBundlePatterns: ["**/*"],
    scheme: "com.linkoking.app",
    ios: {
      buildNumber: "1",
      supportsTablet: false,
      bundleIdentifier: "com.linkoking.app",
      useAppleSignIn: true,
      entitlements: {
        "aps-environment": "production",
      },
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType:
              "NSPrivacyAccessedAPICategoryFileTimestamp",
            NSPrivacyAccessedAPITypeReasons: ["DDA9.1"],
          },
          {
            NSPrivacyAccessedAPIType:
              "NSPrivacyAccessedAPICategorySystemBootTime",
            NSPrivacyAccessedAPITypeReasons: ["35F9.1"],
          },
          {
            NSPrivacyAccessedAPIType:
              "NSPrivacyAccessedAPICategoryDiskSpace",
            NSPrivacyAccessedAPITypeReasons: ["E174.1"],
          },
          {
            NSPrivacyAccessedAPIType:
              "NSPrivacyAccessedAPICategoryUserDefaults",
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
          },
        ],
      },
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [process.env.CF_BUNDLE_URL],
          },
        ],
      },
    },
    androidStatusBar: {
      backgroundColor: "#00000000",
      translucent: true,
    },
    androidNavigationBar: {
      backgroundColor: "#000000",
    },
    android: {
      permissions: [
        "INTERNET",
        "com.android.vending.BILLING",
        "ACCESS_NETWORK_STATE",
      ],
      icon: "./assets/adaptive-icon.png",
      package: "com.linkoking.app",
      versionCode: 60,
      adaptiveIcon: {
        foregroundImage: "./assets/icon-android.png",
        backgroundColor: "#000000",
      },
      softwareKeyboardLayoutMode: "pan",
      blockedPermissions: [
        "android.permission.RECORD_AUDIO",
      ],
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#000000",
      },
    },
    plugins: [
      "expo-av",
      "expo-localization",
      "expo-secure-store",
    ],
    extra: {
      eas: {
        projectId: "d3f81d37-8476-4818-9dc2-15ff6a7e1a63",
      },
      GOOGLE_WEB_CLIENT_ID:
        process.env.GOOGLE_WEB_CLIENT_ID,
      GOOGLE_IOS_CLIENT_ID:
        process.env.GOOGLE_IOS_CLIENT_ID,
      GOOGLE_ANDROID_CLIENT_ID:
        process.env.GOOGLE_ANDROID_CLIENT_ID,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/d3f81d37-8476-4818-9dc2-15ff6a7e1a63",
    },
    jsEngine: "jsc",
  },
});
