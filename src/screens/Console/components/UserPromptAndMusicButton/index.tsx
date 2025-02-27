import BackMusicButton from "./BackMusicButton";
import UserPrompt from "./UserPrompt";

const UserPromptAndMusicButton: React.FC<{
  isKeyboardVisible: boolean;
}> = ({ isKeyboardVisible }) => {
  return isKeyboardVisible ? null : (
    <>
      <UserPrompt />
      <BackMusicButton />
    </>
  );
};

export default UserPromptAndMusicButton;
