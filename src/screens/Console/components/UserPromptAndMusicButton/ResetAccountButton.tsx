import { MaterialCommunityIcons } from "@expo/vector-icons";
import clientWithAuth from "@src/api/clientWithAuth";
import useColors from "@src/hooks/utilityHooks/useColors";
import {
  authState,
  updateConnectedState,
} from "@src/store/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import useCatchAsync from "./../../../../hooks/utilityHooks/useCatchAsync";

const ResetAccountButton = () => {
  const { SECONDARY } = useColors();
  const dispatch = useDispatch();
  const catchAsync = useCatchAsync();
  const { accountEmail } = useSelector(authState);

  const resetAccount = catchAsync(async () => {
    const { data } = await clientWithAuth.get(
      "/api/v1/users/reset-user-data",
    );
    if (data.status === "success")
      dispatch(updateConnectedState("disconnected"));
  });

  return accountEmail !== "jacob@link-king.com" ? null : (
    <TouchableOpacity
      onPress={resetAccount}
      style={{
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={"archive-refresh"}
        size={24}
        color={SECONDARY}
      />
    </TouchableOpacity>
  );
};

export default ResetAccountButton;
