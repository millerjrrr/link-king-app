import { useFormikContext } from "formik";
import AuthButton from "../Buttons/AuthButton";

const SubmitBtn = ({ title }) => {
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

export default SubmitBtn;
