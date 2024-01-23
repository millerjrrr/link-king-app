import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

const SafeAreaAndroid = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight &&
  `margin-top: ${StatusBar.currentHeight}px`};
`;

export default SafeAreaAndroid;
