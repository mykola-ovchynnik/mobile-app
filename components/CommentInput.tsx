import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type InputState = {
  value: string;
  isValid: boolean;
  error?: string;
};

export const Input: FC<{
  placeholder: string;
  inputState: InputState;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightButton?: React.ReactNode;
  wrapStyle?: ViewStyle;
  inputStyle?: TextStyle;
  rightButtonStyle?: ViewStyle;
}> = ({
  placeholder,
  inputState,
  onChangeText,
  secureTextEntry = false,
  rightButton,
  wrapStyle,
  inputStyle,
  rightButtonStyle,
}) => {
  const [focused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.inputWrap, wrapStyle && wrapStyle]}>
      <TextInput
        value={inputState.value}
        style={[
          styles.input,
          focused && styles.inputFocused,
          !inputState.isValid && styles.inputInvalid,
          inputStyle && inputStyle,
        ]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {rightButton && (
        <View
          style={[styles.rightButton, rightButtonStyle && rightButtonStyle]}
        >
          {rightButton}
        </View>
      )}
      {!inputState.isValid && (
        <Text style={styles.invalidText}>{inputState.error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    padding: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "left",
  },
  inputWrap: {
    width: "100%",
    position: "relative",
  },
  rightButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -9 }],
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  inputInvalid: {
    borderColor: "red",
    backgroundColor: "#FFFFFF",
  },
  invalidText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    lineHeight: 14.06,
    textAlign: "left",
  },
});
