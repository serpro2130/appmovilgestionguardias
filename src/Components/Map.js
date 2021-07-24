import React from "react";
import MapView from "react-native-maps";
//import openMap from "react-native-open-maps";

export default function Map(props) {
  const { locationCliente, nombreCliente, height } = props;

  // const openAppMap = () => {
  //   openMap({
  //     latitude: locationCliente.latitude,
  //     longitude: locationCliente.longitude,
  //     zoom: 19,
  //     query: nombreCliente,
  //   });
  // };

  return (
    <MapView
      style={{ height: height, width: "100%" }}
      initialRegion={locationCliente}
      //   onPress={openAppMap}
    >
      <MapView.Marker
        coordinate={{
          latitude: locationCliente.latitude,
          longitude: locationCliente.longitude,
        }}
      />
    </MapView>
  );
}
