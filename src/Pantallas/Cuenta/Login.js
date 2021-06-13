import React, { useRef } from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../Components/LoginForm";
import Toast from "react-native-easy-toast";

export default function Login() {
  const toastRef = useRef();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f07218" />
      <Image
        source={require("../../../assets/serproemcam.png")}
        style={styles.imglogo}
      />
      <Text style={styles.textobaner}>¡Bienvenido!</Text>
      <LoginForm toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
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
