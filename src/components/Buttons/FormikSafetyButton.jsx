import React from "react";
import { useFormikContext } from "formik";
import { View } from "react-native";
import RedSafetyButton from "./RedSafetyButton";
import BusyWrapper from "./../Loader/BusyWrapper";

const FormikSafetyButton = ({
  setElapsedTime,
  setCoverZIndex,
  iconName = "delete",
}) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  const completeFunction = () => {
    handleSubmit();
    setTimeout(() => {
      setElapsedTime(0);
      setCoverZIndex(1);
    }, 3000);
  };

  return (
    <BusyWrapper {...{ busy: isSubmitting }}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          padding: 15,
        }}
      >
        <RedSafetyButton
          {...{
            setElapsedTime,
            completeFunction,
            setCoverZIndex,
            iconName,
            size: 100,
          }}
        />
      </View>
    </BusyWrapper>
  );
};

export default FormikSafetyButton;
