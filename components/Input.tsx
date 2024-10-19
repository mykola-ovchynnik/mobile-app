import { FC, useState } from "react";
import { StyleSheet, TextInput, View, ViewProps } from "react-native";
import { colors } from "../styles/global";

type InputProps = {
  value: string;
  placeholder?: string;
  onTextChange: (text: string) => void;
  rightButton?: React.ReactNode;
  outerStyles?: ViewProps["style"];
  secureTextEntry?: boolean;
  autofocus?: boolean;
};

const Input: FC<InputProps> = ({
  value,
  placeholder,
  onTextChange,
  rightButton,
  outerStyles,
  secureTextEntry = false,
  autofocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.input, isFocused && styles.focused, outerStyles]}>
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        value={value}
        onChangeText={onTextChange}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.placeholderGrey}
        autoCapitalize="none"
        autoFocus={autofocus}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {rightButton}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 16,
    backgroundColor: colors.lightGrey,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.borderGrey,
  },
  text: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
});

export default Input;
