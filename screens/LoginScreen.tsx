import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "../components/Input";
import { useState } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        {/* <Image source={require("../assets/background.png")} /> */}
        <KeyboardAvoidingView style={styles.formContainer}>
          <Text>Login</Text>
          <View style={styles.innerContainer}>
            <Input
              value={email}
              placeholder="Email"
              onTextChange={handleEmailChange}
            />
            <Input
              value={password}
              placeholder="Password"
              onTextChange={handlePasswordChange}
              secureTextEntry={true}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    padding: 20,
  },
});
