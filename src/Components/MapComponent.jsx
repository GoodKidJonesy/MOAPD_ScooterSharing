import React, { useState, useEffect } from "react";
import { Dimensions, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getAdress } from "../utils/Geolocator";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const scooters = [
  {
    coordinates: {
      latitude: 55.659957,
      longitude: 12.334714,
    },
    name: "Scooter1",
  },
  {
    coordinates: {
      latitude: 55.661156,
      longitude: 12.339298,
    },
    name: "Scooter2",
  },
  {
    coordinates: {
      latitude: 55.65911,
      longitude: 12.339327,
    },
    name: "Scooter3",
  },
];

export default function MapComponent() {
  const [trackingStatus, setTrackingStatus] = useState("Loading...");

  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setTrackingStatus("Permission to access location was denied");
        return;
      } else {
        console.log("Access granted!!");
        setTrackingStatus(status);

        goToUser();
      }
    })();
  }, []);

  const goToUser = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  return (
    <View className="h-full w-full">
      {mapRegion != null ? (
        <MapView
          className="h-full w-full"
          region={mapRegion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
        >
          {scooters.map((scooter, index) => (
            <Marker
              key={index}
              coordinate={scooter.coordinates}
              onPress={async () => {
                //Show component with scooter object info displayed
                const msg = await getAdress(
                  scooter.coordinates.latitude,
                  scooter.coordinates.longitude
                );
                console.log(msg);
              }}
              tracksViewChanges={false}
            />
          ))}
        </MapView>
      ) : (
        <View>
          <Text>{trackingStatus}</Text>
        </View>
      )}
    </View>
  );
}
