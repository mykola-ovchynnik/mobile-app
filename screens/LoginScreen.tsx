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
  const isKeyboardVisible = useKeyboardVisibility();

  const handleFormSubmit = () => {
    console.log("Email: ", email, "\nPassword: ", password);
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
        />
      </View>

      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 43,
    paddingBottom: 43,
    gap: 16,
    width: "100%",
  },
});

export default LoginScreen;
