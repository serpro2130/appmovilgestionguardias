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

export default function EditarCliente(props) {
  const { route } = props;
  const { id } = route.params;
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [fechaInicioServicio, setFechaInicioServicio] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [numeroPuestos, setNumeroPuestos] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await obternerRegistroxID("Clientes", id);
      const { data } = response;
      setNombreCliente(data.nombreCliente);
      setDireccionCliente(data.direccionCliente);
      setFechaInicioServicio(data.fechaInicioServicio);
      setTipoServicio(data.tipoServicio);
      setNumeroPuestos(data.numeroPuestos);
    })();
  }, []);

  const editCliente = async () => {
    setErrores({});
    if (isEmpty(nombreCliente)) {
      setErrores({
        nombreCliente: "El campo nombre cliente es obligatorio",
      });
    } else if (isEmpty(direccionCliente)) {
      setErrores({
        direccionCliente: "El campo dirección cliente es obligatorio",
      });
    } else if (isEmpty(fechaInicioServicio)) {
      setErrores({
        fechaInicioServicio: "El campo fecha inicio servicio es obligatorio",
      });
    } else if (isEmpty(tipoServicio)) {
      setErrores({
        tipoServicio: "El campo tipo servicio es obligatorio",
      });
    } else if (isEmpty(numeroPuestos)) {
      setErrores({
        numeroPuestos: "El campo número puestos es obligatorio",
      });
    } else {
      const documento = {
        nombreCliente,
        direccionCliente,
        fechaInicioServicio,
        tipoServicio,
        numeroPuestos,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await actualizarRegistro(
        "Clientes",
        id,
        documento
      );
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Actualización completa",
          "El cliente se ha actualizado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("Clientes"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Actualización Fallida",
          "Ha ocurrido un error al actualizar el cliente",
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
        placeholder="Dirección Cliente"
        onChangeText={(text) => setDireccionCliente(text)}
        inputStyle={styles.input}
        errorMessage={errores.direccionCliente}
        value={direccionCliente}
      />
      <Input
        placeholder="Inicio servicio dd/mm/yyyy"
        onChangeText={(text) => setFechaInicioServicio(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaInicioServicio}
        value={fechaInicioServicio}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <Input
        placeholder="Tipo servicio"
        onChangeText={(text) => setTipoServicio(text)}
        inputStyle={styles.input}
        errorMessage={errores.tipoServicio}
        value={tipoServicio}
        maxLength={8}
      />
      <Input
        placeholder="Número puestos"
        onChangeText={(text) => setNumeroPuestos(text)}
        inputStyle={styles.input}
        errorMessage={errores.numeroPuestos}
        value={numeroPuestos}
        keyboardType="numeric"
        maxLength={1}
      />
      <Button
        title="Editar Cliente"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={editCliente}
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
