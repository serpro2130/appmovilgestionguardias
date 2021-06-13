import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import {
  Input,
  Text,
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

export default function EditarInicioSalidaTurnoGuardia(props) {
  const { route } = props;
  const { id } = route.params;
  const [nombreGuardia, setNombreGuardia] = useState("");
  const [puestoTrabajo, setPuestoTrabajo] = useState("");
  const [fechaTurno, setFechaTurno] = useState("");
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await obternerRegistroxID("Turnos", id);
      const { data } = response;
      setNombreGuardia(data.nombreGuardia);
      setPuestoTrabajo(data.puestoTrabajo);
      setFechaTurno(data.fechaTurno);
      setHoraEntrada(data.horaEntrada);
      setHoraSalida(data.horaSalida);
    })();
  }, []);

  const editTurno = async () => {
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
        nombreGuardia,
        puestoTrabajo,
        fechaTurno,
        horaEntrada,
        horaSalida,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await actualizarRegistro(
        "Turnos",
        id,
        documento
      );
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Registro correcto",
          "El inicio y salida del turno se ha registrado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("InicioSalidaTurnoGuardia"),
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
      {/* <Input
        placeholder="Nombre Guardia"
        onChangeText={(text) => setNombreGuardia(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreGuardia}
        value={nombreGuardia}
      />
      <Input
        placeholder="Puesto de trabajo"
        onChangeText={(text) => setPuestoTrabajo(text)}
        inputStyle={styles.input}
        errorMessage={errores.puestoTrabajo}
        value={puestoTrabajo}
      />
      <Input
        placeholder="Fecha del turno"
        onChangeText={(text) => setFechaTurno(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaTurno}
        value={fechaTurno}
      /> */}
      <View style={styles.viewText}>
        <Text style={styles.text}>Hora entrada</Text>
      </View>

      <Input
        placeholder="Hora de entrada am o pm"
        onChangeText={(text) => setHoraEntrada(text)}
        inputStyle={styles.input}
        errorMessage={errores.horaEntrada}
        value={horaEntrada}
      />
      <View style={styles.viewText}>
        <Text style={styles.text}>Hora salida</Text>
      </View>

      <Input
        placeholder="Hora de salida am o pm"
        onChangeText={(text) => setHoraSalida(text)}
        inputStyle={styles.input}
        errorMessage={errores.horaSalida}
        value={horaSalida}
      />

      <Button
        title="Registrar inicio salida turno"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={editTurno}
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
  viewText: {
    margin: 5,
    marginLeft: 5,
    paddingLeft: 15,
  },
  text: {
    fontWeight: "bold",
    // alignSelf: "center",
    color: "#f07218",
  },
  btnaddnew: {
    backgroundColor: "#f07218",
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,
  },
});
