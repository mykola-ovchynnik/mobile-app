import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "../components/Input";
import { colors } from "../styles/global";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleFormSubmit = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
  };

  const showButton = (
    <TouchableOpacity onPress={togglePasswordVisibility}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>Показати</Text>
    </TouchableOpacity>
  );

  return (
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
            ]}
          >
            <Text style={styles.title}>Увійти</Text>

            <View style={styles.formInnerContainer}>
              <Input
                value={email}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
              />
              <Input
                value={password}
                placeholder="Пароль"
                rightButton={showButton}
                outerStyles={styles.passwordButton}
                onTextChange={handlePasswordChange}
                secureTextEntry={isPasswordVisible}
              />
            </View>

            {!isKeyboardVisible && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleFormSubmit}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Зареєструватися"
                >
                  <Text style={[styles.baseText, styles.registerButtonText]}>
                    Увійти
                  </Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                  <Text style={[styles.baseText]}>
                    Немає акаунту?
                    <TouchableWithoutFeedback>
                      <Text style={{ textDecorationLine: "underline" }}>
                        {" "}
                        Зареєструватися
                      </Text>
                    </TouchableWithoutFeedback>
                  </Text>
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

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
    paddingLeft: 16,
    paddingBottom: 32,
    paddingRight: 16,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    color: colors.blackPrimary,
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35.16,
    marginBottom: 32,
  },
  formInnerContainer: {
    width: "100%",
    gap: 16,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  buttonContainer: {
    marginTop: 43,
    gap: 16,
    width: "100%",
  },
  registerButton: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  registerButtonText: {
    color: colors.white,
    lineHeight: 18.75,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegistrationScreen;
