import useColors from "@src/hooks/utilityHooks/useColors";
import RNPickerSelect from "react-native-picker-select";
import {
  Container,
  DropdownContainer,
} from "./StyledComponents";

interface DropdownSelectorProps {
  onSelect: (value: number) => void;
  length: number;
  start: number;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  onSelect,
  length,
  start,
}) => {
  const { SECONDARY, CONTRAST } = useColors();

  // Create items for the picker
  const pickerItems = Array.from(
    { length },
    (_, index) => ({
      label: index.toString(),
      value: index,
    }),
  );

  const commonStyles = {
    fontSize: 40,
    color: CONTRAST,
    backgroundColor: SECONDARY,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    boderRadius: 8,
    outline: "none", // Remove the white border (focus outline)
    borderWidth: 0,
  };

  return (
    <DropdownContainer>
      <RNPickerSelect
        onValueChange={(value) => {
          if (value !== null) onSelect(value);
        }}
        items={pickerItems}
        placeholder={{}} //hide the placeholder
        style={{
          inputWeb: commonStyles as any,
        }}
        value={start}
      />
    </DropdownContainer>
  );
};

export default DropdownSelector;
