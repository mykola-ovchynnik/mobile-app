import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import FormContainer from "../components/FormContainer";
import Header from "../components/Header";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import SwitchScreenLink from "../components/SwitchScreenLink";
import useKeyboardVisibility from "../hooks/useKeyboardVisibility";
import { sharedStyles } from "../styles/SharedStyles";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "../navigation/StackNavigator";

type LoginScreenProps = NativeStackScreenProps<StackParamList, "Login">;

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isKeyboardVisible = useKeyboardVisibility();

  const handleEmailChange = (text: string) => setEmail(text);

  const handlePasswordChange = (text: string) => setPassword(text);

  const handleFormSubmit = () => {
    navigation.navigate("BottomTabNavigator");
  };

  const onRegistrationPress = () => {
    navigation.navigate("Registration");
  };

  return (
    <FormContainer isKeyboardVisible={isKeyboardVisible}>
      <Header title="Увійти" />

      <View style={sharedStyles.formInnerContainer}>
        <Input
          value={email}
          placeholder="Адреса електронної пошти"
          onTextChange={handleEmailChange}
        />
        <PasswordInput
          value={password}
          placeholder="Пароль"
          onTextChange={handlePasswordChange}
        />
      </View>

      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
          <SubmitButton text="Увійти" onPress={handleFormSubmit} />
          <SwitchScreenLink
            prompt="Немає акаунту?"
            linkText="Зареєструватися"
            onPress={onRegistrationPress}
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
