import React from "react";
import { useFormikContext } from "formik";
import { View } from "react-native";
import RedSafetyButton from "./RedSafetyButton";
import BusyWrapper from "../Loader/BusyWrapper";
import { AntDesign } from "@expo/vector-icons";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const FormikSafetyButton: React.FC<{
  iconName?: keyof typeof AntDesign.glyphMap;
}> = ({ iconName = "delete" }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  const completeFunction = () => {
    handleSubmit();
  };

  return (
    <BusyWrapper busy={isSubmitting} size={base * 150}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          padding: base * 15,
        }}
      >
        <RedSafetyButton
          completeFunction={completeFunction}
          iconName={iconName}
          size={base * 100}
        />
      </View>
    </BusyWrapper>
  );
};

export default FormikSafetyButton;
