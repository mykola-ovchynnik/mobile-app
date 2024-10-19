import React from "react";
import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/global";

interface FormContainerProps {
  children: React.ReactNode;
  isKeyboardVisible: boolean;
  extraStyle?: object;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  isKeyboardVisible,
  extraStyle,
}) => (
  <View style={styles.container}>
    <ImageBackground
      source={require("../assets/images/registration_bg.jpg")}
      style={StyleSheet.absoluteFill}
    />
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={[
            styles.formOuterContainer,
            !isKeyboardVisible && { height: "60%" },
            extraStyle,
          ]}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formOuterContainer: {
    position: "relative",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 32,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

export default FormContainer;
