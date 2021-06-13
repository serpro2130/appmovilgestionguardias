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

export default function EditarGuardia(props) {
  const { route } = props;
  const { id } = route.params;
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

  useEffect(() => {
    (async () => {
      const response = await obternerRegistroxID("Guardias", id);
      const { data } = response;
      setNombreGuardia(data.nombreGuardia);
      setCedula(data.cedula);
      setTelefono(data.telefono);
      setDireccionGuardia(data.direccionGuardia);
      setFechaIngreso(data.fechaIngreso);
      setPuestoTrabajo(data.puestoTrabajo);
      setBachiller(data.bachiller);
      setCursoGuardia(data.cursoGuardia);
    })();
  }, []);

  const editGuardia = async () => {
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

      const registrardocumento = await actualizarRegistro(
        "Guardias",
        id,
        documento
      );
      if (registrardocumento.statusreponse) {
        Alert.alert(
          "Actualización completa",
          "El guardia se ha actualizado correctamente",
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
          "Actualizacion Fallida",
          "Ha ocurrido un error al actualizar el guardia",
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
      />
      <Input
        placeholder="Cédula"
        onChangeText={(text) => setCedula(text)}
        inputStyle={styles.input}
        errorMessage={errores.cedula}
        value={cedula}
      />
      <Input
        placeholder="Teléfono"
        onChangeText={(text) => setTelefono(text)}
        inputStyle={styles.input}
        errorMessage={errores.telefono}
        value={telefono}
      />
      <Input
        placeholder="Dirección"
        onChangeText={(text) => setDireccionGuardia(text)}
        inputStyle={styles.input}
        errorMessage={errores.direccionGuardia}
        value={direccionGuardia}
      />
      <Input
        placeholder="Fecha ingreso"
        onChangeText={(text) => setFechaIngreso(text)}
        inputStyle={styles.input}
        errorMessage={errores.fechaIngreso}
        value={fechaIngreso}
      />
      <Input
        placeholder="Puesto de trabajo"
        onChangeText={(text) => setPuestoTrabajo(text)}
        inputStyle={styles.input}
        errorMessage={errores.puestoTrabajo}
        value={puestoTrabajo}
      />
      <Input
        placeholder="Bachiller"
        onChangeText={(text) => setBachiller(text)}
        inputStyle={styles.input}
        errorMessage={errores.bachiller}
        value={bachiller}
      />
      <Input
        placeholder="Curso guardia"
        onChangeText={(text) => setCursoGuardia(text)}
        inputStyle={styles.input}
        errorMessage={errores.cursoGuardia}
        value={cursoGuardia}
      />
      <Button
        title="Editar Guardia"
        buttonStyle={styles.btnaddnew}
        ref={btnref}
        onPress={editGuardia}
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
