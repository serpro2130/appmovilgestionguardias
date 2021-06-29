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
import { Picker } from "native-base";

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
      {/* <Input
        placeholder="Nombre Documento"
        onChangeText={(text) => setNombreDocumento(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreDocumento}
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
          Seleccione documento
        </Text>
        <Picker
          note
          mode="dialog"
          style={{ width: 100, height: 60 }}
          // selectedValue={hora}
          onValueChange={(value) => setNombreDocumento(value)}
        >
          <Picker.Item label="Escoja" value="0" />
          <Picker.Item
            label="Permiso de operaciones"
            value="Permiso de operaciones"
          />
          <Picker.Item label="Tenencia de armas" value="Tenencia de armas" />
          <Picker.Item
            label="Permiso de uniformes"
            value="Permiso de uniformes"
          />
          <Picker.Item label="Matrícula de armas" value="Matrícula de armas" />
          <Picker.Item
            label="Autorización de funcionamiento"
            value="Autorización de funcionamiento"
          />
          <Picker.Item
            label="Patente de funcionamiento"
            value="Patente de funcionamiento"
          />
          <Picker.Item
            label="Nombramiento de gerente y presidente"
            value="Nombramiento de gerente y presidente"
          />
          <Picker.Item
            label="Obligaciones tributarias"
            value="Obligaciones tributarias"
          />
          <Picker.Item
            label="Aportaciones al Seguro Social"
            value="Aportaciones al Seguro Social"
          />
          <Picker.Item label="Pólizas" value="Pólizas" />
          <Picker.Item label="Registros guardias" value="Registros guardias" />
        </Picker>
      </View>

      {/* <Input
        placeholder="Nombre Institución"
        onChangeText={(text) => setNombreInstitucion(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreInstitucion}
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
          Seleccione institución
        </Text>
        <Picker
          note
          mode="dialog"
          style={{ width: 100, height: 60 }}
          // selectedValue={hora}
          onValueChange={(value) => setNombreInstitucion(value)}
        >
          <Picker.Item label="Escoja" value="0" />
          <Picker.Item label="COSP" value="COSP" />
          <Picker.Item label="CCFFAA" value="CCFFAA" />
          <Picker.Item
            label="Ministerio del Trabajo"
            value="Ministerio del Trabajo"
          />
          <Picker.Item label="Municipio" value="Municipio" />
          <Picker.Item label="Notaria" value="Notaria" />
          <Picker.Item label="SRI" value="SRI" />
          <Picker.Item label="IESS" value="IESS" />
          <Picker.Item label="Seguros" value="Seguros" />
          <Picker.Item label="POFASA" value="POFASA" />
        </Picker>
      </View>

      <Input
        placeholder="Presentar dd/mm/yyyy"
        onChangeText={(text) => setFechaPresentacion(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaPresentacion}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <Input
        placeholder="Presentado dd/mm/yyyy"
        onChangeText={(text) => setFechaPresentada(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaPresentada}
        keyboardType="phone-pad"
        maxLength={10}
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
