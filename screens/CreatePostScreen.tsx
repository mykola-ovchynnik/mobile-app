import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import FIcon from "react-native-vector-icons/Feather";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";

import { ScreenNames } from "../App.consts";
import { RootStackNavigationProp } from "../App.types";
import { useAppDispatch } from "../store/store";
import { createPost } from "../firebase/firestore";
import { postSliceActions } from "../store/postSlice";
import { NewPost } from "../firebase/firestore.types";
import { colors } from "../styles/global";

const CreatePostScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const [postTitle, setPostTitle] = useState<string>("");
  const [postLocation, setPostLocation] = useState<string>("");
  const dispatch = useAppDispatch();

  const cameraRef = useRef<CameraView | null>(null);
  const [publishInProgress, setPublishInProgress] = useState<boolean>(false);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        setCapturedPhoto(photo.uri);
      }
    }
  };

  const publishPost = () => {
    let location = postLocation.trim();

    if (publishInProgress) {
      return;
    }

    if (!capturedPhoto) {
      Alert.alert("Image is missing");
      return;
    }

    const defineLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location access denied");
        setPublishInProgress(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      location = `${loc.coords.latitude}, ${loc.coords.longitude}`;
      setPostLocation(location);
      publish();
    };

    const publish = async () => {
      const newPost: NewPost = {
        image: { uri: capturedPhoto },
        name: postTitle || "No title",
        location,
        comments: [],
        likesCount: 0,
      };

      try {
        const createdPost = await createPost(newPost);
        dispatch(postSliceActions.createNewPost(createdPost));

        navigation.push(ScreenNames.BottomTabNavigator);
      } catch (error) {
        console.error("firestore createPost error", error);
      } finally {
        setPublishInProgress(false);
      }
    };

    console.log("publishing photo...");
    setPublishInProgress(true);

    if (!location) {
      Alert.alert(
        `You didn't define location!`,
        "Would you like to define location?",
        [
          {
            text: "Так",
            onPress: () => {
              defineLocation().catch((err) => {
                console.error("Error while defining location", err);
                setPublishInProgress(false);
              });
            },
            style: "default",
          },
          {
            text: "Ні",
            onPress: () => {
              setPublishInProgress(false);
            },
            style: "cancel",
          },
        ]
      );
      return;
    }

    publish();
  };

  const clearPost = () => {
    setCapturedPhoto(null);
    setPostTitle("");
    setPostLocation("");
  };

  if (permission === null) {
    return (
      <View style={styles.permissionView}>
        <Text>Requesting permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionView}>
        <Text>Надайте дозвіл на користування камерою</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Надати дозвіл</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePicker}>
        <View style={styles.imagePlaceholder}>
          {capturedPhoto ? (
            <>
              <Image
                resizeMode="cover"
                source={{ uri: capturedPhoto }}
                style={styles.image}
              />
              <TouchableOpacity
                style={[styles.imageIconWrapper, styles.imageLoadedIconWrapper]}
                onPress={() => setCapturedPhoto(null)}
              >
                <Icon name="camera" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </>
          ) : (
            <CameraView style={styles.camera} facing="back" ref={cameraRef}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePhoto}
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
          value={postTitle}
          placeholderTextColor={"#BDBDBD"}
          onChangeText={setPostTitle}
        />

        <View>
          <TextInput
            style={styles.inputLocation}
            placeholder="Місцевість..."
            value={postLocation}
            placeholderTextColor={"#BDBDBD"}
            onChangeText={setPostLocation}
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
        style={[styles.publishButton]}
        onPress={publishPost}
        accessibilityLabel="Publish"
        accessible={true}
      >
        <Text style={[styles.publishButtonText]}>Опублікувати</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.trashWrapper}
        accessibilityLabel="Delete"
        accessible={true}
        onPress={clearPost}
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
    backgroundColor: colors.orange,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  publishButtonText: {
    color: "#FFF",
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
  permissionView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostScreen;
