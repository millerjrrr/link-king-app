import { useFormikContext } from "formik";
import AuthButton from "./AuthButton";

const SubmitButton: React.FC<{ title: string }> = ({
  title,
}) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <AuthButton
      title={title}
      busy={isSubmitting}
      onPress={handleSubmit}
    />
  );
};

export default SubmitButton;
