// PasswordInput.tsx
import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import Input from "./Input";
import { colors } from "../styles/global";

interface PasswordInputProps {
  value: string;
  placeholder?: string;
  onTextChange: (text: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  placeholder,
  onTextChange,
  containerStyle,
  inputStyle,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onTextChange={onTextChange}
      secureTextEntry={!isPasswordVisible}
      rightElement={
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.toggleButtonText}>
            {isPasswordVisible ? "Приховати" : "Показати"}
          </Text>
        </TouchableOpacity>
      }
      containerStyle={containerStyle}
      inputStyle={inputStyle}
    />
  );
};

const styles = StyleSheet.create({
  toggleButtonText: {
    color: colors.blue,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
});

export default PasswordInput;
