import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RouteProp } from "@react-navigation/native";
import { MapScreenRouteProp } from "../App.types";

type MapScreenProps = {
  route?: MapScreenRouteProp;
};

const MapScreen: React.FC<MapScreenProps> = ({ route }) => {
  const [lat, long] = route?.params?.location
    .split(",")
    .map((item) => Number(item.trim())) ?? [37.78825, -122.4324];

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: lat || 0,
          longitude: long || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: long }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
