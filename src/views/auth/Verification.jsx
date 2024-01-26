import { StyleSheet, View } from "react-native";
import AppLink from "../../ui/AppLink";
import AuthFormContainer from "../../components/AuthFormContainer";
import OTPField from "../../ui/OTPField";
import AppButton from "../../ui/AppButton";
import { useRef, useState, useEffect } from "react";

const otpFields = new Array(6).fill("");

const Verification = (props) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    if (value === "Backspace") {
      if (index != 0 && !newOtp[index])
        setActiveOtpIndex(index - 1);
      newOtp[index] = "";
    } else {
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }

    setOtp([...newOtp]);
  };

  const handlePaste = (value) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split("");
      setOtp([...newOtp]);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <AuthFormContainer heading="Please check your email!">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              ref={
                activeOtpIndex === index ? inputRef : null
              }
              key={index}
              placeholder="*"
              onKeyPress={({ nativeEvent }) => {
                handleChange(nativeEvent.key, index);
              }}
              keyboardType="numeric"
              value={otp[index] || ""}
            />
          );
        })}
      </View>
      <AppButton title="Submit" />
      <View style={styles.linkContainer}>
        <AppLink title="Re-send OTP" />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "flex-end",
  },
});

export default Verification;
