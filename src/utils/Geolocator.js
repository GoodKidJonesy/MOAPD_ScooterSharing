import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyC9D_mvijKjsgeB563KJrk4cjBDvHu_iPc");

export function getAdress({ latitude, longitude }) {
  return Geocoder.from(latitude, longitude)
    .then((res) => {
      return res.results[0].formatted_address;
    })
    .catch((error) => {
      return error;
    });
}
