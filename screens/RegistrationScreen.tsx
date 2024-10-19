import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormContainer from "../components/FormContainer";
import Header from "../components/Header";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import SwitchScreenLink from "../components/SwitchScreenLink";
import useKeyboardVisibility from "../hooks/useKeyboardVisibility";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { colors } from "../styles/global";
import { sharedStyles } from "../styles/SharedStyles";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [avatarUri, setAvatarUri] = useState("");
  const isKeyboardVisible = useKeyboardVisibility();

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const handleAvatarSelection = () => {
    setAvatarUri((prevUri) => (prevUri ? "" : "dummyUri"));
  };

  const handleFormSubmit = () => {
    // Handle registration logic
  };

  return (
    <FormContainer
      isKeyboardVisible={isKeyboardVisible}
      extraStyle={{ paddingTop: 92 }}
    >
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handleAvatarSelection}
      >
        <Image style={styles.avatarPlaceholder} />
        <Icon
          name={avatarUri ? "close" : "plus"}
          size={25}
          color={avatarUri ? colors.placeholderGrey : colors.orange}
          style={styles.addAvatar}
        />
      </TouchableOpacity>

      <Header title="Реєстрація" />

      <View style={sharedStyles.formInnerContainer}>
        <Input value={login} placeholder="Логін" onTextChange={setLogin} />
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
        <View style={styles.buttonContainer}>
          <SubmitButton text="Зареєструватися" onPress={handleFormSubmit} />
          <SwitchScreenLink
            prompt="Вже є акаунт?"
            linkText="Увійти"
            onPress={() => {
              // Navigate to login screen
            }}
          />
        </View>
      )}
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: "absolute",
    top: 0,
    transform: [{ translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: colors.lightGrey,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    bottom: 14,
    right: 0,
    transform: [{ translateX: 12 }],
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  buttonContainer: {
    marginTop: 24,
    paddingBottom: 46,
    gap: 16,
    width: "100%",
  },
});

export default RegistrationScreen;
