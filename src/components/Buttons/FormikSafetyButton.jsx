import React from "react";
import { useFormikContext } from "formik";
import { View } from "react-native";
import RedSafetyButton from "./RedSafetyButton";
import BusyWrapper from "./../Loader/BusyWrapper";

const FormikSafetyButton = ({ iconName = "delete" }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  const completeFunction = () => {
    handleSubmit();
  };

  return (
    <BusyWrapper busy={isSubmitting} size={150}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          padding: 15,
        }}
      >
        <RedSafetyButton
          completeFunction={completeFunction}
          iconName={iconName}
          size={100}
        />
      </View>
    </BusyWrapper>
  );
};

export default FormikSafetyButton;
