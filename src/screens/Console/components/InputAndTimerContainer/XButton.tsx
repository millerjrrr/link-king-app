import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectConsoleState, updateFormValue } from "@src/store/console";

const XButton: React.FC<{color: string}> = ({color}) => {
  const dispatch = useDispatch();
  const {locals:{formValue}}= useSelector(selectConsoleState);
  
  return  formValue.length>0 && (
    <TouchableOpacity
    onPress={() => {
        dispatch(updateFormValue(""));
      }}
      style={styles.container}>
      <MaterialCommunityIcons name="close" size={24} color={color} />
        </TouchableOpacity>
      
  );  
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: "100%",
    aspectRatio: 1,
    borderRadius: 1000,
    position: "absolute",
    left: 0,
    zIndex: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default XButton;
