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

export default function RegistrarGuardia() {
  const [nombreGuardia, setNombreGuardia] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccionGuardia, setDireccionGuardia] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [puestoTrabajo, setPuestoTrabajo] = useState("");
  const [bachiller, setBachiller] = useState("");
  const [cursoGuardia, setCursoGuardia] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  const addDocumento = async () => {
    setErrores({});
    if (isEmpty(nombreGuardia)) {
      setErrores({
        nombreGuardia: "El campo nombre guardia es obligatorio",
      });
    } else if (isEmpty(cedula)) {
      setErrores({
        cedula: "El campo cédula es obligatorio",
      });
    } else if (isEmpty(telefono)) {
      setErrores({
        telefono: "El campo teléfono es obligatorio",
      });
    } else if (isEmpty(direccionGuardia)) {
      setErrores({
        direccionGuardia: "El campo dirección es obligatorio",
      });
    } else if (isEmpty(fechaIngreso)) {
      setErrores({
        fechaIngreso: "El campo fecha ingreso es obligatorio",
      });
    } else if (isEmpty(puestoTrabajo)) {
      setErrores({
        puestoTrabajo: "El campo puesro trabajo es obligatorio",
      });
    } else if (isEmpty(bachiller)) {
      setErrores({
        bachiller: "El campo bachiller es obligatorio",
      });
    } else if (isEmpty(cursoGuardia)) {
      setErrores({
        cursoGuardia: "El campo curso guardia es obligatorio",
      });
    } else {
      const documento = {
        nombreGuardia,
        cedula,
        telefono,
        direccionGuardia,
        fechaIngreso,
        puestoTrabajo,
        bachiller,
        cursoGuardia,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await addRegistro("Guardias", documento);
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Registro Exitoso",
          "El guardia se ha registrado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("Guardias"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Registro Fallido",
          "Ha ocurrido un error al registrar el guardia",
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
        placeholder="Cédula"
        onChangeText={(text) => setCedula(text)}
        inputStyle={styles.input}
        errorMessage={errores.cedula}
      />
      <Input
        placeholder="Teléfono"
        onChangeText={(text) => setTelefono(text)}
        inputStyle={styles.input}
        errorMessage={errores.telefono}
      />
      <Input
        placeholder="Dirección"
        onChangeText={(text) => setDireccionGuardia(text)}
        inputStyle={styles.input}
        errorMessage={errores.direccionGuardia}
      />
      <Input
        placeholder="Fecha ingreso dd/mm/yyyy"
        onChangeText={(text) => setFechaIngreso(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaIngreso}
      />
      <Input
        placeholder="Puesto de trabajo"
        onChangeText={(text) => setPuestoTrabajo(text)}
        inputStyle={styles.input}
        errorMessage={errores.puestoTrabajo}
      />
      {/* <Input
        placeholder="Bachiller"
        onChangeText={(text) => setBachiller(text)}
        inputStyle={styles.input}
        errorMessage={errores.bachiller}
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
          Seleccione formación
        </Text>
        <Picker
          note
          mode="dialog"
          style={{ width: 100, height: 60 }}
          // selectedValue={hora}
          onValueChange={(value) => setBachiller(value)}
        >
          <Picker.Item label="Escoja" value="0" />
          <Picker.Item label="Secundaria" value="Secundaria" />
          <Picker.Item label="Universitaria" value="Universitaria" />
        </Picker>
      </View>
      {/* <Input
        placeholder="Curso guardia"
        onChangeText={(text) => setCursoGuardia(text)}
        inputStyle={styles.input}
        errorMessage={errores.cursoGuardia}
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
          Seleccione curso
        </Text>
        <Picker
          note
          mode="dialog"
          style={{ width: 100, height: 60 }}
          // selectedValue={hora}
          onValueChange={(value) => setCursoGuardia(value)}
        >
          <Picker.Item label="Escoja" value="0" />
          <Picker.Item label="Guardia" value="Guardia" />
          <Picker.Item label="Supervisor" value="Supervisor" />
        </Picker>
      </View>
      <Button
        title="Agregar Guardia"
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
