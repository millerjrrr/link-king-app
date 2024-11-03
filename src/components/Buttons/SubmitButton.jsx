import { useFormikContext } from "formik";
import AuthButton from "./AuthButton";

const SubmitButton = ({ title }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <AuthButton
      {...{
        title,
        busy: isSubmitting,
        onPress: handleSubmit,
      }}
    />
  );
};

export default SubmitButton;
