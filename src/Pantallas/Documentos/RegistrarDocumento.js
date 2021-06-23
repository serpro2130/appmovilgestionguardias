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
import Loading from "../../Components/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addRegistro, ObtenerUsuario } from "../../Utils/Acciones";

export default function RegistrarDocumento() {
  const [nombreDocumento, setNombreDocumento] = useState("");
  const [nombreInstitucion, setNombreInstitucion] = useState("");
  const [fechaPresentacion, setFechaPresentacion] = useState("");
  const [fechaPresentada, setFechaPresentada] = useState("");
  const [imagenes, setimagenes] = useState([]);
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  const addDocumento = async () => {
    setErrores({});
    if (isEmpty(nombreDocumento)) {
      setErrores({
        nombreDocumento: "El campo nombre documento es obligatorio",
      });
    } else if (isEmpty(nombreInstitucion)) {
      setErrores({
        nombreInstitucion: "El campo nombre institución es obligatorio ",
      });
    } else if (isEmpty(fechaPresentacion)) {
      setErrores({
        fechaPresentacion: "El campo fecha presentación es obligatorio",
      });
    } else if (isEmpty(fechaPresentada)) {
      setErrores({
        fechaPresentada: "El campo fecha presentación es obligatorio",
      });
    } else {
      const documento = {
        nombreDocumento,
        nombreInstitucion,
        fechaPresentacion,
        fechaPresentada,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await addRegistro("Documentos", documento);
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Registro Exitoso",
          "El documento se ha registrado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("Documentos"),
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
        placeholder="Nombre Documento"
        onChangeText={(text) => setNombreDocumento(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreDocumento}
      />
      <Input
        placeholder="Nombre Institución"
        onChangeText={(text) => setNombreInstitucion(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreInstitucion}
      />
      <Input
        placeholder="Presentar dd/mm/yyyy"
        onChangeText={(text) => setFechaPresentacion(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaPresentacion}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Presentado dd/mm/yyyy"
        onChangeText={(text) => setFechaPresentada(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaPresentada}
        keyboardType="phone-pad"
      />
      <Button
        title="Agregar Documento"
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
