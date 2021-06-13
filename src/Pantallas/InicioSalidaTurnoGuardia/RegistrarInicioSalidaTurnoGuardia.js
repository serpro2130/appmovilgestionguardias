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

export default function RegistrarInicioSalidaTurnoGuardia() {
  const [nombreGuardia, setNombreGuardia] = useState("");
  const [puestoTrabajo, setPuestoTrabajo] = useState("");
  const [fechaTurno, setFechaTurno] = useState("");
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  const addDocumento = async () => {
    setErrores({});
    if (isEmpty(nombreGuardia)) {
      setErrores({
        nombreGuardia: "El campo nombre guardia es obligatorio",
      });
    } else if (isEmpty(puestoTrabajo)) {
      setErrores({
        puestoTrabajo: "El campo puesro trabajo es obligatorio",
      });
    } else if (isEmpty(fechaTurno)) {
      setErrores({
        fechaTurno: "El campo fecha de turno es obligatorio",
      });
    } else if (isEmpty(horaEntrada)) {
      setErrores({
        horaEntrada: "El campo hora de entrada es obligatorio",
      });
    } else if (isEmpty(horaSalida)) {
      setErrores({
        horaSalida: "El campo hora de salida es obligatorio",
      });
    } else {
      const documento = {
        //nombreGuardia,
        // puestoTrabajo,
        // fechaTurno,
        horaEntrada,
        horaSalida,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await addRegistro("Turnos", documento);
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Registro Exitoso",
          "El inicio y salida del turno se ha registrado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("InicioSalidaTurno"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Registro Fallido",
          "Ha ocurrido un error al registrar el turno",
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
        placeholder="Puesto de trabajo"
        onChangeText={(text) => setPuestoTrabajo(text)}
        inputStyle={styles.input}
        errorMessage={errores.puestoTrabajo}
      />
      <Input
        placeholder="Fecha del turno"
        onChangeText={(text) => setFechaTurno(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaTurno}
      />
      <Input
        placeholder="Hora de entrada"
        onChangeText={(text) => setHoraEntrada(text)}
        inputStyle={styles.input}
        errorMessage={errores.horarioTurno}
      />
      <Input
        placeholder="Hora de salida"
        onChangeText={(text) => setHoraSalida(text)}
        inputStyle={styles.input}
        errorMessage={errores.horarioTurno}
      />
      <Button
        title="Agregar Inicio y Salida"
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
