import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import { Dimensions, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getAdress } from "../utils/Geolocator";
import ScooterPopUp from "./ScooterPopUp";
import { PopUpContext } from "../Contexts/PopUpContext";

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
    battery: 100,
    image:
      "https://firebasestorage.googleapis.com/v0/b/scootersharing-24093.appspot.com/o/1547202571.png?alt=media&token=1301d1e9-6d18-46ae-9519-b557c4bff77d",
  },
  {
    coordinates: {
      latitude: 55.662,
      longitude: 12.339298,
    },
    name: "Scooter2",
    battery: 76,
    image:
      "https://firebasestorage.googleapis.com/v0/b/scootersharing-24093.appspot.com/o/1547202571.png?alt=media&token=1301d1e9-6d18-46ae-9519-b557c4bff77d",
  },
  {
    coordinates: {
      latitude: 55.65911,
      longitude: 12.339327,
    },
    name: "Scooter3",
    battery: 30,
    image:
      "https://firebasestorage.googleapis.com/v0/b/scootersharing-24093.appspot.com/o/1547202571.png?alt=media&token=1301d1e9-6d18-46ae-9519-b557c4bff77d",
  },
];

export default function MapComponent() {
  const [trackingStatus, setTrackingStatus] = useState("");
  const [mapRegion, setMapRegion] = useState(null);
  const mapViewRef = useRef();
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentScooter, setCurrentScooter] = useState({
    coordinates: { latitude: 0, longitude: 0 },
    name: "placeholder",
    battery: 0,
    image: "",
  });
  const [address, setAddress] = useState("");
  const moveSpeed = 200;

  function moveMap(lat, long) {
    mapViewRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      moveSpeed
    );
  }

  const initMap = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setTrackingStatus("Permission to access location was denied");
        return;
      } else {
        setTrackingStatus(status);
        initMap();
      }
    })();
  }, []);

  return (
    <PopUpContext.Provider value={{ showPopUp, setShowPopUp }}>
      <View className="h-full w-full relative">
        <View className="h-full w-full absolute bg-blue-500r flex items-center justify-center top-0 left-0">
          <Text className="text-white text-3xl">
            {trackingStatus === "granted" ? "Loading Map..." : trackingStatus}
          </Text>
        </View>
        {mapRegion != null && (
          <MapView
            ref={mapViewRef}
            className="h-full w-full"
            mapPadding={{ top: 28, right: 0, left: 0, bottom: 0 }}
            region={mapRegion}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            onPress={() => {
              setShowPopUp(false);
            }}
            onPanDrag={() => {
              setShowPopUp(false);
            }}
          >
            {scooters.map((scooter, index) => (
              <Marker
                key={index}
                coordinate={scooter.coordinates}
                stopPropagation={true}
                onPress={() => {
                  setShowPopUp(false);
                  moveMap(
                    scooter.coordinates.latitude,
                    scooter.coordinates.longitude
                  );
                  setCurrentScooter(scooter);
                  setTimeout(() => {
                    setShowPopUp(true);
                  }, moveSpeed);
                }}
                tracksViewChanges={false}
              />
            ))}
          </MapView>
        )}
        <ScooterPopUp scooter={currentScooter} />
      </View>
    </PopUpContext.Provider>
  );
}
