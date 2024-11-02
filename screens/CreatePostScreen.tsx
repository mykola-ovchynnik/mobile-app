import React, { useEffect, useState } from "react";
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

import {
  Camera,
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

import publicationImage from "../assets/images/Publication.png";

import { NavigationProp } from "@react-navigation/native";

interface CreatePostScreenProps {
  navigation: NavigationProp<any>;
}

const CreatePostScreen = ({ navigation }: CreatePostScreenProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [locationName, setLocationName] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(status === "granted");
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      if (hasMediaLibraryPermission) {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }
      setImage(photo.uri);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>Permission to access camera was denied</Text>;
  }

  const handlePublish = () => {
    if (isFormValid) {
      console.log("Location:", location);
      navigation.navigate("Posts");
    }
  };

  const isFormValid = image && title && locationName && location;

  return (
    <View style={styles.container}>
      <View style={styles.imagePicker}>
        <View style={styles.imagePlaceholder}>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={[styles.imageIconWrapper, styles.imageLoadedIconWrapper]}
                onPress={() => setImage(null)}
              >
                <Icon name="camera" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </>
          ) : (
            <CameraView
              style={styles.camera}
              facing="back"
              ref={(ref) => setCameraRef(ref)}
            >
              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCapture}
              >
                <Icon name="camera" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </CameraView>
          )}
        </View>

        <Text style={styles.placeholderText}>Завантажте фото</Text>
      </View>

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
            value={locationName}
            placeholderTextColor={"#BDBDBD"}
            onChangeText={setLocationName}
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
        onPress={handlePublish}
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
    alignItems: "center",
    justifyContent: "center",
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
  camera: {
    width: "100%",
    height: "100%",
  },
  captureButton: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    transform: [{ translateY: -24 }],
    padding: 16,
    backgroundColor: "#ffffff80",
    borderRadius: 50,
  },
});

export default CreatePostScreen;
