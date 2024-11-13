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
import { LoginScreenNavigationProp, LoginScreenRouteProp } from "../App.types";
import { ScreenNames } from "../App.consts";
import { loginUserInDb } from "../firebase/firebase-auth";
import { useAppDispatch } from "../store/store";
import { userSliceActions } from "../store/userSlice";

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isKeyboardVisible = useKeyboardVisibility();
  const dispatch = useAppDispatch();

  const handleEmailChange = (text: string) => setEmail(text);

  const handlePasswordChange = (text: string) => setPassword(text);

  const handleFormSubmit = async () => {
    if (email === "" || password === "") {
      return;
    }

    try {
      const user = await loginUserInDb({
        email: email,
        password: password,
      });

      if (!user) {
        console.error("User not found");
        return;
      }

      console.log(`User logged in successfully!`);

      dispatch(
        userSliceActions.setUser({
          id: user.uid,
          name: user.displayName || "",
          email: user.email || email,
        })
      );

      navigation.navigate(ScreenNames.BottomTabNavigator);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const onRegistrationPress = () => {
    navigation.navigate(ScreenNames.Registration);
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
