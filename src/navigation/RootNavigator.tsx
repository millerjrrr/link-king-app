import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import { authState } from "@src/store/auth";
import TabNavigator from "./TabNavigator";
import WalkthroughNavigator from "./WalkthroughNavigator";
import UpdateToLatestVersionPage from "@src/screens/popUpScreens/UpdateToLatestVersionPage";
import Constants from "expo-constants";
import compareVersions from "@src/utils/versionCompare";
import usePlayBackgroundMusic from "@src/hooks/utilityHooks/usePlayBackgroundMusic";
import { useSyncBadgeWithDue } from "@src/hooks/utilityHooks/useSyncBadgeWithDue";

const RootNavigator = () => {
  const currentVersion =
    Constants.expoConfig?.version || "5.0.3";

  const { loggedIn, justSignedUp, latestVersion } =
    useSelector(authState);

  const updateRequired = compareVersions(
    latestVersion,
    currentVersion,
  );

  useSyncBadgeWithDue();
  usePlayBackgroundMusic();
  //we want it here so that it does not play
  //during the splash video

  return updateRequired ? (
    <UpdateToLatestVersionPage />
  ) : loggedIn ? (
    justSignedUp ? (
      <WalkthroughNavigator />
    ) : (
      <TabNavigator />
    )
  ) : (
    <AuthNavigator />
  );
};

export default RootNavigator;
