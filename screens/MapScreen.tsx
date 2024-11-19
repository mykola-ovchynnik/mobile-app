import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: lat, longitude: long }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
