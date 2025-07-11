import { View } from "react-native";
import BackMusicButton from "./BackMusicButton";
import ResetAccountButton from "./ResetAccountButton";
import UserPrompt from "./UserPrompt";

const UserPromptAndMusicButton: React.FC<{
  isKeyboardVisible: boolean;
}> = ({ isKeyboardVisible }) => {
  return isKeyboardVisible ? null : (
    <>
      <UserPrompt />
      <View style={{ flexDirection: "row" }}>
        <BackMusicButton />
        <ResetAccountButton />
      </View>
    </>
  );
};

export default UserPromptAndMusicButton;
