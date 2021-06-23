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

export default function EditarDocumento(props) {
  const { route } = props;
  const { id } = route.params;
  const [nombreDocumento, setNombreDocumento] = useState("");
  const [nombreInstitucion, setNombreInstitucion] = useState("");
  const [fechaPresentacion, setFechaPresentacion] = useState("");
  const [fechaPresentada, setFechaPresentada] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await obternerRegistroxID("Documentos", id);
      const { data } = response;
      setNombreDocumento(data.nombreDocumento);
      setNombreInstitucion(data.nombreInstitucion);
      setFechaPresentacion(data.fechaPresentacion);
      setFechaPresentada(data.fechaPresentada);
    })();
  }, []);

  const editDocumento = async () => {
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

      const registrardocumento = await actualizarRegistro(
        "Documentos",
        id,
        documento
      );
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Actualización completa",
          "El documento se ha actualizado correctamente",
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
          "Actualización Fallida",
          "Ha ocurrido un error al actualizar el documento",
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
        value={nombreDocumento}
      />
      <Input
        placeholder="Nombre Institución"
        onChangeText={(text) => setNombreInstitucion(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreInstitucion}
        value={nombreInstitucion}
      />
      <Input
        placeholder="Presentar dd/mm/yyyy"
        onChangeText={(text) => setFechaPresentacion(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaPresentacion}
        value={fechaPresentacion}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Presentado dd/mm/yyyy"
        onChangeText={(text) => setFechaPresentada(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaPresentada}
        value={fechaPresentada}
        keyboardType="phone-pad"
      />
      <Button
        title="Editar Documento"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={editDocumento}
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
