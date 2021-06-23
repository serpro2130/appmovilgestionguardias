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

export default function EditarReporte(props) {
  const { route } = props;
  const { id } = route.params;
  const [nombreGuardia, setNombreGuardia] = useState("");
  const [puestoTrabajo, setPuestoTrabajo] = useState("");
  const [reporte, setReporte] = useState("");
  const [horaReporte, setHoraReporte] = useState("");
  const [fechaReporte, setFechaReporte] = useState("");
  const [errores, setErrores] = useState({});
  const btnref = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await obternerRegistroxID("Reportes", id);
      const { data } = response;
      setNombreGuardia(data.nombreGuardia);
      setPuestoTrabajo(data.puestoTrabajo);
      setReporte(data.reporte);
      setFechaReporte(data.fechaReporte);
      setHoraReporte(data.horaReporte);
    })();
  }, []);

  const EditReporte = async () => {
    setErrores({});
    if (isEmpty(nombreGuardia)) {
      setErrores({
        nombreGuardia: "El campo nombre guardia es obligatorio",
      });
    } else if (isEmpty(puestoTrabajo)) {
      setErrores({
        puestoTrabajo: "El campo puesro trabajo es obligatorio",
      });
    } else if (isEmpty(reporte)) {
      setErrores({
        reporte: "El campo reporte es obligatorio",
      });
    } else if (isEmpty(fechaReporte)) {
      setErrores({
        fechaReporte: "El campo horario de turno es obligatorio",
      });
    } else if (isEmpty(horaReporte)) {
      setErrores({
        horaReporte: "El campo hora del reporte es obligatorio",
      });
    } else {
      const documento = {
        nombreGuardia,
        puestoTrabajo,
        reporte,
        fechaReporte,
        horaReporte,
        usuario: ObtenerUsuario().uid,
        status: 1,
        fechacreacion: new Date(),
      };

      const registrardocumento = await actualizarRegistro(
        "Reportes",
        id,
        documento
      );
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Actualización completa",
          "El reporte se ha actualizado correctamente",
          [
            {
              style: "cancel",
              text: "Aceptar",
              onPress: () => navigation.navigate("Reportes"),
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
        placeholder="Nombre Guardia"
        onChangeText={(text) => setNombreGuardia(text)}
        inputStyle={styles.input}
        errorMessage={errores.nombreGuardia}
        value={nombreGuardia}
        maxLength={15}
      />
      <Input
        placeholder="Puesto de trabajo"
        onChangeText={(text) => setPuestoTrabajo(text)}
        inputStyle={styles.input}
        errorMessage={errores.puestoTrabajo}
        value={puestoTrabajo}
        maxLength={2}
      />
      <Input
        placeholder="Fecha dd/mm/yyyy"
        onChangeText={(text) => setFechaReporte(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaReporte}
        value={fechaReporte}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <Input
        placeholder="Hora del reporte"
        onChangeText={(text) => setHoraReporte(text)}
        inputStyle={styles.input}
        errorMessage={errores.horaReporte}
        value={horaReporte}
        maxLength={8}
      />
      <Input
        placeholder="Reporte de la guardia"
        onChangeText={(text) => setReporte(text)}
        inputStyle={styles.input}
        errorMessage={errores.reporte}
        value={reporte}
      />
      <Button
        title="Editar Reporte"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={EditReporte}
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
