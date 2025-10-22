export default ({ config }) => ({
  ...config,
  name: "Link-King",
  slug: "LinkKingApp",
  version: "6.0.0",
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
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  androidStatusBar: {
    backgroundColor: "#00000000",
    translucent: true,
  },
  androidNavigationBar: {
    backgroundColor: "#000000",
    barStyle: "light-content",
  },
  android: {
    targetSdkVersion: 35,
    compileSdkVersion: 35,
    permissions: [
      "INTERNET",
      // "com.android.vending.BILLING",
      "ACCESS_NETWORK_STATE",
      "ACCESS_NOTIFICATION_POLICY",
      "POST_NOTIFICATIONS",
    ],
    googleServicesFile: "./google-services.json",
    icon: "./assets/adaptive-icon.png",
    package: "com.linkoking.app",
    adaptiveIcon: {
      foregroundImage: "./assets/android-icon.png",
      backgroundColor: "#000000",
    },
    softwareKeyboardLayoutMode: "pan",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
  },
  web: {
    favicon: "./assets/icon.png",
    name: "Link-King",
    description: "Next Level Language Learning",
  },
  plugins: [
    "expo-video",
    "expo-av",
    "expo-localization",
    "expo-secure-store",
    "expo-font",
  ],
  extra: {
    eas: {
      projectId: "d3f81d37-8476-4818-9dc2-15ff6a7e1a63",
    },
    GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID,
    GOOGLE_ANDROID_CLIENT_ID:
      process.env.GOOGLE_ANDROID_CLIENT_ID,
  },
  runtimeVersion: "5.5.0",
  updates: {
    url: "https://u.expo.dev/d3f81d37-8476-4818-9dc2-15ff6a7e1a63",
  },
  jsEngine: "hermes",
});
