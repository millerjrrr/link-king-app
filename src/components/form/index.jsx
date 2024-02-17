import { Formik } from "formik";

const Form = (props) => {
  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={props.signUpSchema}
      style={{ flex: 1 }}
    >
      {props.children}
    </Formik>
  );
};

export default Form;
