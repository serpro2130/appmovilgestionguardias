import React, { useState, useRef } from "react";
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
import { addRegistro, ObtenerUsuario } from "../../Utils/Acciones";
import { Picker } from "native-base";

export default function RegistrarCliente() {
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [fechaInicioServicio, setFechaInicioServicio] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [numeroPuestos, setNumeroPuestos] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  const addDocumento = async () => {
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

      const registrardocumento = await addRegistro("Clientes", documento);
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Registro Exitoso",
          "El cliente se ha registrado correctamente",
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
          "Registro Fallido",
          "Ha ocurrido un error al registrar el documento",
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
      />
      <Input
        placeholder="Dirección Cliente"
        onChangeText={(text) => setDireccionCliente(text)}
        inputStyle={styles.input}
        errorMessage={errores.direccionCliente}
      />
      <Input
        placeholder="Inicio servicio dd/mm/yyyy"
        onChangeText={(text) => setFechaInicioServicio(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaInicioServicio}
        keyboardType="phone-pad"
      />
      {/* <Input
        placeholder="Tipo servicio"
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
          Seleccione tipo servicio
        </Text>
        <Picker
          note
          mode="dialog"
          style={{ width: 100, height: 60 }}
          // selectedValue={hora}
          onValueChange={(value) => setTipoServicio(value)}
        >
          <Picker.Item label="Escoja" value="0" />
          <Picker.Item label="8 horas" value="8 horas" />
          <Picker.Item label="12 horas" value="12 horas" />
          <Picker.Item label="24 horas" value="24 horas" />
        </Picker>
      </View>
      <Input
        placeholder="Número puestos"
        onChangeText={(text) => setNumeroPuestos(text)}
        inputStyle={styles.input}
        errorMessage={errores.numeroPuestos}
        keyboardType="numeric"
      />
      <Button
        title="Agregar Cliente"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={addDocumento}
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
