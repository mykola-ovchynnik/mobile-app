import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Input from "./Input";
import { colors } from "../styles/global";

interface PasswordInputProps {
  value: string;
  placeholder: string;
  onTextChange: (text: string) => void;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  placeholder,
  onTextChange,
  isPasswordVisible,
  togglePasswordVisibility,
}) => (
  <Input
    value={value}
    placeholder={placeholder}
    secureTextEntry={isPasswordVisible}
    onTextChange={onTextChange}
    rightButton={
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Text style={styles.passwordButtonText}>Показати</Text>
      </TouchableOpacity>
    }
    outerStyles={styles.passwordInputContainer}
  />
);

const styles = StyleSheet.create({
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordButtonText: {
    color: colors.blue,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
});

export default PasswordInput;
