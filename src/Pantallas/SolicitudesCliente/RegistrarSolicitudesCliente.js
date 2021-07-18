import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import {
  Input,
  Image,
  Button,
  Icon,
  Avatar,
  AirbnbRating,
} from "react-native-elements";
import { map, size, filter, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "native-base";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Toast from "react-native-easy-toast";

import Modal from "../../Components/Modal";
import { addRegistro, ObtenerUsuario } from "../../Utils/Acciones";

//import DateTimePickerModal from "react-native-modal-datetime-picker";
//import moment from "moment";

export default function RegistrarSolicitudesCliente() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState(8);
  //const [rol, setrol] = useState(1);
  const [tipoServicio, setTipoServicio] = useState("");
  const [numeroPuestos, setNumeroPuestos] = useState("");
  //const [formData, setFormData] = useState({});
  const [isDatePicketVisible, setIsDatePicketVisible] = useState(false);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationCliente, setLocationCliente] = useState(null);
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const toastRef = useRef();
  const navigation = useNavigation();

  //console.log(formData);

  const addDocumento = async () => {
    setErrores({});
    if (isEmpty(nombreCliente)) {
      setErrores({
        nombreCliente: "El campo nombre cliente es obligatorio",
      });
    } else if (isEmpty(direccion)) {
      setErrores({
        direccion: "El campo dirección es obligatorio",
      });
    } else if (!locationCliente) {
      toastRef.current.show("Tienes que localizar el restaurnate en el mapa");
    } else if (isEmpty(fecha)) {
      setErrores({
        fecha: "El campo fecha es obligatorio",
      });
    } else if (isEmpty(tipoServicio)) {
      setErrores({
        tipoServicio: "El campo tipo de servicio es obligatorio",
      });
    } else if (isEmpty(numeroPuestos)) {
      setErrores({
        numeroPuestos: "El campo tipo de puestos es obligatorio",
      });
    } else {
      const documento = {
        nombreCliente,
        direccion,
        locationCliente,
        fecha,
        tipoServicio,
        numeroPuestos,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await addRegistro("Solicitudes", documento);
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Registro Exitoso",
          "La solicitud se ha registrado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("SolicitudesCliente"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Registro Fallido",
          "Ha ocurrido un error al registrar el reporte",
          [
            {
              style: "cancel",
              text: "Aceptar",
            },
          ]
        );
      }
    }
    //   console.log(locationRestaurant);
  };

  // const hideDatePicker = () => {
  //   setIsDatePicketVisible(false);
  // };
  // const handlerConfirm = (date) => {
  //   const dateSolicitud = date;
  //   dateSolicitud.setHours(0);
  //   dateSolicitud.setMinutes(0);
  //   dateSolicitud.setSeconds(0);
  //   setFecha(dateSolicitud);
  //   hideDatePicker();
  // };

  // const showDatePicker = () => {
  //   setIsDatePicketVisible(true);
  // };

  return (
    <KeyboardAwareScrollView style={styles.conteiner}>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <View
        style={{
          borderBottomColor: "#f07218",
          borderBottomWidth: 2,
          width: 100,
          marginTop: 20,
          alignSelf: "center",
        }}
      />
      <Input
        placeholder="Nombre Cliente"
        onChangeText={(text) => setNombreCliente(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreCliente}
      />
      <Input
        placeholder="Dirección Cliente"
        onChangeText={(text) => setDireccion(text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationCliente ? "#f07218" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
        inputStyle={styles.input}
        errorMessage={errores.direccion}
      />
      {/* <View style={[styles.inputFecha, styles.datepicker]}>
        <Text style={styles.addButton} onPress={showDatePicker}>
          {fecha ? moment(fecha).format("LL") : "Fecha de la solicitud"}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePicketVisible}
        mode="date"
        onConfirm={handlerConfirm}
        onCancel={hideDatePicker}
      /> */}
      <Input
        placeholder="Fecha dd/mm/yyyy"
        onChangeText={(text) => setFecha(text)}
        inputStyle={styles.input}
        errorMessage={errores.fecha}
        keyboardType="phone-pad"
        maxLength={10}
      />
      {/* <Input
        placeholder="Tipo servicio 24-12-8 horas"
        onChangeText={(text) => setTipoServicio(text)}
        inputStyle={styles.input}
        errorMessage={errores.tipoServicio}
      /> */}
      <View
        style={{
          width: "90%",
          height: 90,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            width: "40%",
            fontSize: 16,
            fontStyle: "italic",
            marginLeft: 5,
          }}
        >
          Seleccione el tipo de servicio
        </Text>
        <Picker
          note
          mode="dialog"
          style={{ width: 100, height: 60 }}
          selectedValue={hora}
          onValueChange={(value) => setTipoServicio(value)}
        >
          <Picker.Item label="Escoja" value="0" />
          <Picker.Item label="8 horas" value="8" />
          <Picker.Item label="12 horas" value="12" />
          <Picker.Item label="24 horas" value="24" />
        </Picker>
      </View>
      <Input
        placeholder="Numero puestos"
        onChangeText={(text) => setNumeroPuestos(text)}
        inputStyle={styles.input}
        errorMessage={errores.numeroPuestos}
        keyboardType="numeric"
        maxLength={1}
      />
      <Button
        title="Agregar Solicitud"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={addDocumento}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationCliente={setLocationCliente}
        toastRef={toastRef}
      />
    </KeyboardAwareScrollView>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationCliente, toastRef } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;
      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localizacion para crear un restaurante",
          3000
        );
        console.log("Permisos");
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationCliente(location);
    toastRef.current.show("Localizacion guardada correctamente");
    console.log("Localizacion guardada correctamente");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicacion"
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar Ubicacion"
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
    margin: 5,
    padding: 5,
    elevation: 3,
  },
  input: {
    width: "90%",
    borderRadius: 10,
    borderColor: "#707070",
    marginTop: 20,
    paddingHorizontal: 20,
    height: 50,
  },
  inputFecha: {
    height: 50,
    color: "#fff",
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#f07218",
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 18,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1e3040",
  },
  datepicker: {
    justifyContent: "center",
  },
  btnaddnew: {
    backgroundColor: "#f07218",
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  addButton: {
    fontSize: 18,
    color: "#fff",
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#f07218",
  },
});
