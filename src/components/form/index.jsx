import { Formik } from "formik";

const Form = ({
  onSubmit,
  initialValues,
  validationSchema,
  children,
}) => {
  return (
    <Formik
      {...{
        onSubmit,
        initialValues,
        validationSchema,
        style: { flex: 1 },
      }}
    >
      {children}
    </Formik>
  );
};

export default Form;
