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
import {
  actualizarRegistro,
  ObtenerUsuario,
  obternerRegistroxID,
} from "../../Utils/Acciones";

export default function EditarSolicitudesCliente(props) {
  const { route } = props;
  const { id } = route.params;
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [numeroPuestos, setNumeroPuestos] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await obternerRegistroxID("Solicitudes", id);
      const { data } = response;
      setNombreCliente(data.nombreCliente);
      setDireccion(data.direccion);
      setFecha(data.fecha);
      setTipoServicio(data.tipoServicio);
      setNumeroPuestos(data.numeroPuestos);
    })();
  }, []);

  const EditSolicitud = async () => {
    setErrores({});
    if (isEmpty(nombreCliente)) {
      setErrores({
        nombreCliente: "El campo nombre cliente es obligatorio",
      });
    } else if (isEmpty(direccion)) {
      setErrores({
        direccion: "El campo dirección es obligatorio",
      });
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
        fecha,
        tipoServicio,
        numeroPuestos,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await actualizarRegistro(
        "Solicitudes",
        id,
        documento
      );
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Actualización completa",
          "La solicitud se ha actualizado correctamente",
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
          "Actualización Fallida",
          "Ha ocurrido un error al actualizar el turno",
          [
            {
              style: "cancel",
              text: "Aceptar",
            },
          ]
        );
      }
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.conteiner}>
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
        value={nombreCliente}
      />
      <Input
        placeholder="Dirección"
        onChangeText={(text) => setDireccion(text)}
        inputStyle={styles.input}
        errorMessage={errores.direccion}
        value={direccion}
      />
      <Input
        placeholder="Fecha dd/mm/yyyy"
        onChangeText={(text) => setFecha(text)}
        inputStyle={styles.input}
        errorMessage={errores.fecha}
        value={fecha}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <Input
        placeholder="Tipo servicio 24-12-8 horas"
        onChangeText={(text) => setTipoServicio(text)}
        inputStyle={styles.input}
        errorMessage={errores.tipoServicio}
        value={tipoServicio}
        keyboardType="numeric"
        maxLength={2}
      />
      <Input
        placeholder="Numero puestos"
        onChangeText={(text) => setNumeroPuestos(text)}
        inputStyle={styles.input}
        errorMessage={errores.numeroPuestos}
        value={numeroPuestos}
        keyboardType="numeric"
        maxLength={1}
      />
      <Button
        title="Editar Solicitud"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={EditSolicitud}
      />
    </KeyboardAwareScrollView>
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
  btnaddnew: {
    backgroundColor: "#f07218",
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
  },
});
