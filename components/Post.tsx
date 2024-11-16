import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/global";
import { StackNavigationProp } from "@react-navigation/stack";

interface PostProps {
  image: any;
  title: string;
  commentsCount: number;
  location: string;
  coordinates: { latitude: number; longitude: number };
}

const Post: React.FC<PostProps> = ({
  image,
  title,
  commentsCount,
  location,
  coordinates,
}) => {
  type RootStackParamList = {
    PostComments: { image: any };
    Map: { latitude: number; longitude: number };
  };

  type PostNavigationProp = StackNavigationProp<
    RootStackParamList,
    "PostComments"
  >;

  const navigation = useNavigation<PostNavigationProp>();

  const handleLocationPress = () => {
    navigation.navigate("Map", {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.commentsContainer}
          onPress={() => navigation.navigate("PostComments", { image })}
        >
          <Feather
            name="message-circle"
            size={24}
            color={colors.placeholderGrey}
          />
          <Text style={styles.commentsText}>{commentsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={handleLocationPress}
        >
          <Feather name="map-pin" size={24} color={colors.placeholderGrey} />
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: colors.blackPrimary,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsText: {
    fontSize: 16,
    color: colors.blackPrimary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 16,
    textDecorationLine: "underline",
    color: colors.blackPrimary, // Use blackPrimary for location text
  },
});

export default Post;
