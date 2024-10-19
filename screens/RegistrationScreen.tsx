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
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [avatarUri, setAvatarUri] = useState("");

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

  const handleLoginChange = (value: string) => {
    setLogin(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleAvatarSelection = () => {
    setAvatarUri((prevUri) => (prevUri ? "" : "dummyUri"));
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
          <View style={styles.formOuterContainer}>
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

            <Text style={styles.title}>Реєстрація</Text>

            <View style={styles.formInnerContainer}>
              <Input
                value={login}
                autofocus={true}
                placeholder="Логін"
                onTextChange={handleLoginChange}
              />
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
                  onPress={() => {}}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Зареєструватися"
                >
                  <Text style={[styles.baseText, styles.registerButtonText]}>
                    Зареєструватися
                  </Text>
                </TouchableOpacity>

                <View style={styles.signInContainer}>
                  <Text style={[styles.baseText]}>
                    Вже є акаунт?
                    <TouchableWithoutFeedback>
                      <Text> Увійти</Text>
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
    paddingTop: 92,
    paddingLeft: 16,
    paddingBottom: 32,
    paddingRight: 16,
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
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
  buttonContainer: {
    marginTop: 24,
    paddingBottom: 46,
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
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordButtonText: {
    color: colors.blue,
  },
});

export default RegistrationScreen;
