import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import Toast from "react-native-easy-toast";

import RegisterForm from "../../Components/RegisterForm";

export default function Registrar() {
  const toastRef = useRef();
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#f07218" />
      <Image
        source={require("../../../assets/serproemcam.png")}
        style={styles.imglogo}
      />
      <Text style={styles.textobaner}>CREAR CUENTA</Text>
      <RegisterForm toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f07218",
  },
  imglogo: {
    width: 106,
    height: 106,
    marginTop: 40,
    alignSelf: "center",
  },
  textobaner: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
    alignSelf: "center",
  },
});
