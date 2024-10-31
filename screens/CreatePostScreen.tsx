import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FIcon from "react-native-vector-icons/Feather";

// Import image
import publicationImage from "../assets/images/Publication.png";

const CreatePostScreen = () => {
  const [image, setImage] = useState("1");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const isFormValid = image && title && location;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePicker}>
        <View style={styles.imagePlaceholder}>
          {image ? (
            <>
              <Image source={publicationImage} style={styles.image} />
              <View
                style={[styles.imageIconWrapper, styles.imageLoadedIconWrapper]}
              >
                <Icon name="camera" size={24} color="#FFFFFF" />
              </View>
            </>
          ) : (
            <View style={styles.imageIconWrapper}>
              <Icon name="camera" size={24} color="#BDBDBD" />
            </View>
          )}
        </View>

        <Text style={styles.placeholderText}>Завантажте фото</Text>
      </TouchableOpacity>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          value={title}
          placeholderTextColor={"#BDBDBD"}
          onChangeText={setTitle}
        />

        <View>
          <TextInput
            style={styles.inputLocation}
            placeholder="Місцевість..."
            value={location}
            placeholderTextColor={"#BDBDBD"}
            onChangeText={setLocation}
          />
          <FIcon
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{
              position: "absolute",
              top: 13,
              left: 0,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.publishButton,
          isFormValid ? styles.publishButtonActive : null,
        ]}
        accessibilityLabel="Publish"
        accessible={true}
      >
        <Text
          style={[
            styles.publishButtonText,
            isFormValid ? styles.publishButtonTextActive : null,
          ]}
        >
          Опублікувати
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.trashWrapper}
        accessibilityLabel="Delete"
        accessible={true}
      >
        <FIcon name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 32,
    backgroundColor: "#fff",
  },
  imagePicker: {
    position: "relative",
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
  },
  imageIconWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
    padding: 16,
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageLoadedIconWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  imagePlaceholder: {
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#BDBDBD",
  },
  inputWrapper: {
    width: "100%",
    gap: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontSize: 16,
    fontWeight: "400",
  },
  inputLocation: {
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    position: "relative",
    paddingLeft: 28,
    fontSize: 16,
    fontWeight: "400",
  },
  publishButton: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  publishButtonActive: { backgroundColor: "#FF6C00" },
  publishButtonText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "400",
  },
  publishButtonTextActive: { color: "#fff" },
  trashWrapper: {
    position: "absolute",
    bottom: 32,
    left: "50%",
    transform: [{ translateX: -24 }],
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  absolutePosition: {
    position: "absolute",
    top: 13,
    left: 0,
  },
});

export default CreatePostScreen;
