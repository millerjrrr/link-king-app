import { Formik } from "formik";

const Form = (props) => {
  return (
    <Formik
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      validationSchema={props.signUpSchema}
    >
      {props.children}
    </Formik>
  );
};

export default Form;
