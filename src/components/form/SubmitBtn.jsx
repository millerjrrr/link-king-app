import AppButton from "../../ui/AppButton";
import { useFormikContext } from "formik";

const SubmitBtn = ({ title }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <AppButton
      {...{
        title,
        busy: isSubmitting,
        onPress: handleSubmit,
      }}
    />
  );
};

export default SubmitBtn;
