import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import CodeInput from "react-native-code-input";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../Components/Loading";
import {
  confirmarcodigo,
  obtenerToken,
  ObtenerUsuario,
  addRegistroEspecifico,
} from "../../Utils/Acciones";
import * as SecureStore from "expo-secure-store";

export default function ConfirmarNumero(props) {
  const { route } = props;
  const { verificationid } = route.params;

  const [loading, setloading] = useState(false);

  const confirmarCodigoSMS = async (code) => {
    //Va a extraer la información del usuario
    //Va a obtener el token pushnotificación
    //Va a hacer las validaciones y confirmar autenticación

    setloading(true);
    const resultado = await confirmarcodigo(verificationid, code);
    // console.log(resultado);
    // console.log(await obtenerToken());
    if (resultado) {
      const token = await obtenerToken();
      const { uid, displayName, photoURL, email, phoneNumber } =
        ObtenerUsuario();
      let rol = await SecureStore.getItemAsync("ROL");

      console.log("AQUI ESTA EL ROL");
      console.log(JSON.parse(rol).rol);

      const registro = await addRegistroEspecifico("Usuarios", uid, {
        token,
        displayName,
        photoURL,
        email,
        phoneNumber,
        fechacreacion: new Date(),
        rol: JSON.parse(rol).rol,
      });
      setloading(false);
    } else {
      Alert.alert("Error", "Favor válidar el código introducido", [
        {
          style: "default",
          text: "Entendido",
        },
      ]);
      setloading(false);
    }

    //1. Obtener token móvil para push notification
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/serproemcam.png")}
        style={styles.imglogo}
      />
      <Text style={styles.titulo}>
        Favor revise su sms e introduzca los códigos de confirmación
      </Text>
      <CodeInput
        activeColor="#fff"
        inactiveColor="#fff"
        autoFocus={true}
        inputPosition="center"
        size={50}
        codeLength={6}
        containerStyle={{ marginTop: 30 }}
        codeInputStyle={{ borderWidth: 1.5 }}
        onFulfill={(code) => {
          confirmarCodigoSMS(code);
        }}
        secureTextEntry
      />
      <Loading isVisible={loading} text="Favor espere" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f07218",
    paddingHorizontal: 20,
  },
  imglogo: {
    width: 106,
    height: 106,
    alignSelf: "center",
    marginTop: 20,
  },
  titulo: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginVertical: 20,
  },
});
