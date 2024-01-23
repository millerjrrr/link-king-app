import AppButton from "../../ui/AppButton";
import { useFormikContext } from "formik";

const SubmitBtn = (props) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton onPress={handleSubmit} title={props.title} />
  );
};

export default SubmitBtn;
