import { View } from "react-native";
import BackMusicButton from "./BackMusicButton";
import UserPrompt from "./UserPrompt";

const UserPromptAndMusicButton: React.FC<{
  isKeyboardVisible: boolean;
}> = ({ isKeyboardVisible }) => {
  return isKeyboardVisible ? null : (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <UserPrompt />
      <BackMusicButton />
    </View>
  );
};

export default UserPromptAndMusicButton;
