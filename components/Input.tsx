// Input.tsx
import React, { FC, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TextInputProps,
  TextStyle,
} from "react-native";
import { colors } from "../styles/global";

interface InputProps extends Omit<TextInputProps, "style"> {
  value: string;
  onTextChange: (text: string) => void;
  placeholder?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const Input: FC<InputProps> = ({
  value,
  placeholder,
  onTextChange,
  rightElement,
  leftElement,
  containerStyle,
  inputStyle,
  secureTextEntry = false,
  autoFocus = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focusedContainer,
        containerStyle,
      ]}
    >
      {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onTextChange}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.placeholderGrey}
        autoCapitalize="none"
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessible={true}
        accessibilityLabel={placeholder}
        {...rest}
      />
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.borderGrey,
    flexDirection: "row",
    alignItems: "center",
  },
  focusedContainer: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
  textInput: {
    flex: 1,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: colors.blackPrimary,
    paddingVertical: 0, // Adjusted to align text vertically
  },
  leftElement: {
    marginRight: 8,
  },
  rightElement: {
    marginLeft: 8,
  },
});

export default Input;
