import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useLayoutEffect,
} from "react";
import { Dimensions, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import ScooterPopUp from "./ScooterPopup";
import { PopUpContext } from "../contexts/PopUpContext";
import { getUnreservedScooters, getScooter } from "../utils/Firebase";
import { UserContext } from "../contexts/UserContext";
import { GOOGLE_MAPS_APIKEY } from "../utils/Google";
import { LocationContext } from "../contexts/LocationContext";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapComponent() {
  const [trackingStatus, setTrackingStatus] = useState("");
  const [mapRegion, setMapRegion] = useState(null);
  const mapViewRef = useRef();
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentScooter, setCurrentScooter] = useState(null);
  const [availableScooters, setAvailableScooters] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const moveSpeed = 200;
  const [userLocation, setUserLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });
  const [destination, setDestination] = useState();

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
        await Location.watchPositionAsync(
          {
            distanceInterval: 0.5,
          },
          (res) => setUserLocation(res)
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (user.currentScooter === 0) {
      getUnreservedScooters().then((res) => {
        setAvailableScooters(res);
      });
    } else {
      getScooter(user.currentScooter).then((res) => {
        setAvailableScooters(res);
      });
    }
  }, [user.currentScooter]);

  return (
    <LocationContext.Provider value={{ userLocation, setUserLocation }}>
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
              {availableScooters.map((scooter) => (
                <Marker
                  key={scooter.ID}
                  coordinate={{
                    latitude: scooter.coordinates.latitude,
                    longitude: scooter.coordinates.longitude,
                  }}
                  stopPropagation={true}
                  tracksViewChanges={false}
                  onPress={() => {
                    setDestination(
                      scooter.coordinates.latitude +
                        "," +
                        scooter.coordinates.longitude
                    );
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
                />
              ))}
              <MapViewDirections
                origin={
                  userLocation.coords.latitude +
                  "," +
                  userLocation.coords.longitude
                }
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeColor="blue"
                strokeWidth={3}
                mode="WALKING"
              />
            </MapView>
          )}
          {currentScooter && <ScooterPopUp scooter={currentScooter} />}
        </View>
      </PopUpContext.Provider>
    </LocationContext.Provider>
  );
}
