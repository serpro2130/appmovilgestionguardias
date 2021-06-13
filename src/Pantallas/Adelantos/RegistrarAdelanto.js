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

export default function RegistrarAdelanto() {
  const [nombreGuardia, setNombreGuardia] = useState("");
  const [fechaAdelanto, setFechaAdelanto] = useState("");
  const [montoAdelanto, setMontoAdelanto] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  const addDocumento = async () => {
    setErrores({});
    if (isEmpty(nombreGuardia)) {
      setErrores({
        nombreGuardia: "El campo nombre guardia es obligatorio",
      });
    } else if (isEmpty(fechaAdelanto)) {
      setErrores({
        fechaAdelanto: "El campo fecha adelanto es obligatorio",
      });
    } else if (isEmpty(montoAdelanto)) {
      setErrores({
        montoAdelanto: "El campo monto adelanro es obligatorio",
      });
    } else {
      const documento = {
        nombreGuardia,
        fechaAdelanto,
        montoAdelanto,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await addRegistro("Adelantos", documento);
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Registro Exitoso",
          "El adelanto se ha registrado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("Adelantos"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Registro Fallido",
          "Ha ocurrido un error al registrar el adelanto",
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
        placeholder="Nombre Guardia"
        onChangeText={(text) => setNombreGuardia(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreGuardia}
      />
      <Input
        placeholder="Fecha adelanto"
        onChangeText={(text) => setFechaAdelanto(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaAdelanto}
      />
      <Input
        placeholder="Monto adelanto"
        onChangeText={(text) => setMontoAdelanto(text)}
        inputStyle={styles.input}
        errorMessage={errores.montoAdelanto}
      />
      <Button
        title="Agregar Adelanto"
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
