// listenerService.ts
import Voice from "@react-native-voice/voice";
import store from "@src/store"; // your redux store instance
import {
  updateFormValue,
  updateOptions,
} from "@src/store/console";
import { Audio } from "expo-av";

Voice.onSpeechResults = (event) => {
  if (event.value && event.value.length > 0) {
    store.dispatch(updateFormValue(event.value[0]));
  }
};

Voice.onSpeechEnd = () => {
  store.dispatch(updateOptions({ listening: false }));
  setTimeout(
    () => store.dispatch(updateFormValue("")),
    2000,
  );
};

Voice.onSpeechError = (error) => {
  console.error("Speech recognition error:", error);
  store.dispatch(updateOptions({ listening: false }));
};

const requestMicPermission = async () => {
  const { status } = await Audio.requestPermissionsAsync();
  if (status !== "granted") {
    alert(
      "Microphone permission is required to use voice recognition.",
    );
    return false;
  }
  return true;
};

const startListening = async () => {
  const hasPermission = await requestMicPermission();
  if (!hasPermission) {
    store.dispatch(updateOptions({ listening: false }));
    return;
  }

  try {
    store.dispatch(updateOptions({ listening: true }));
    await new Promise((resolve) =>
      setTimeout(resolve, 2000),
    );
    await Voice.stop();
    await Voice.start("en-US");
  } catch (e) {
    console.error("Voice start error:", e);
    store.dispatch(updateOptions({ listening: false }));
  }
};

const stopListening = async () => {
  try {
    await Voice.stop();
  } catch (e) {
    console.error("Voice stop error:", e);
  }
  store.dispatch(updateOptions({ listening: false }));
};

export default {
  startListening,
  stopListening,
};
