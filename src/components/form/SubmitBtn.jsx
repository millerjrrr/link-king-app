import AppButton from "../../ui/AppButton";
import { useFormikContext } from "formik";

const SubmitBtn = (props) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <AppButton
      busy={isSubmitting}
      onPress={handleSubmit}
      title={props.title}
    />
  );
};

export default SubmitBtn;
