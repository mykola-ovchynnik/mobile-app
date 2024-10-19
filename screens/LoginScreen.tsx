import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FormContainer from "../components/FormContainer";
import Header from "../components/Header";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import SwitchScreenLink from "../components/SwitchScreenLink";
import useKeyboardVisibility from "../hooks/useKeyboardVisibility";
import { sharedStyles } from "../styles/SharedStyles";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const isKeyboardVisible = useKeyboardVisibility();

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const handleFormSubmit = () => {
    // Handle login logic
  };

  return (
    <FormContainer isKeyboardVisible={isKeyboardVisible}>
      <Header title="Увійти" />

      <View style={sharedStyles.formInnerContainer}>
        <Input
          value={email}
          placeholder="Адреса електронної пошти"
          onTextChange={setEmail}
        />
        <PasswordInput
          value={password}
          placeholder="Пароль"
          onTextChange={setPassword}
          isPasswordVisible={isPasswordVisible}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </View>

      {!isKeyboardVisible && (
        <View style={sharedStyles.buttonContainer}>
          <SubmitButton text="Увійти" onPress={handleFormSubmit} />
          <SwitchScreenLink
            prompt="Немає акаунту?"
            linkText="Зареєструватися"
            onPress={() => {
              // Navigate to registration screen
            }}
          />
        </View>
      )}
    </FormContainer>
  );
};

export default LoginScreen;
