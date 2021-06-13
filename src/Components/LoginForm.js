import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Input, Divider, Button } from "react-native-elements";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { validaremail } from "../Utils/Utils";
import { isEmpty } from "lodash";
import { validarsesion } from "../Utils/Acciones";
import Loading from "../Components/Loading";
import * as firebase from "firebase";

export default function LoginForm(props) {
  const { toastRef } = props;
  const navigation = useNavigation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);

  const iniciarsesion = () => {
    if (isEmpty(email) || isEmpty(password)) {
      toastRef.current.show("Debe ingresar los valores de email y password");
    } else if (!validaremail(email)) {
      toastRef.current.show("Ingrese un correo válido");
    } else {
      setloading(true);

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          setloading(false);
          toastRef.current.show("Ha iniciado sesión exitosamente");
          console.log(firebase.auth().currentUser);
        })
        .catch((err) => {
          setloading(false);
          toastRef.current.show(
            "Ha ocurrido un error al intentar iniciar sesión"
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: "#f07218",
          borderBottomWidth: 2,
          width: 100,
        }}
      />
      <Input
        placeholder="Correo"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#f07218",
          onPress: () => alert("Hola"),
        }}
        leftIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#f07218",
        }}
        onChangeText={(text) => {
          setemail(text);
        }}
        value={email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        leftIcon={{
          type: "material-community",
          name: "security",
          color: "#f07218",
        }}
        rightIcon={{
          type: "material-community",
          name: show ? "eye-off-outline" : "eye-outline",
          color: "#f07218",
          onPress: () => setshow(!show),
        }}
        onChangeText={(text) => {
          setpassword(text);
        }}
        secureTextEntry={!show}
        value={password}
      />
      <Button
        title="ENTRAR"
        containerStyle={styles.btnentrar}
        buttonStyle={{ backgroundColor: "#f07218" }}
        onPress={() => iniciarsesion()}
      />
      <Text style={styles.txtcrearcuenta}>
        ¿No Tienes Cuenta?
        <Text
          style={styles.cuenta}
          onPress={() => navigation.navigate("Registrar")}
        >
          {" "}
          Crear Cuenta
        </Text>
      </Text>
      <Divider
        style={{
          backgroundColor: "#f07218",
          height: 1,
          width: "90%",
          marginTop: 20,
        }}
      />
      {/* <Text style={styles.texto}>O</Text>

      <View style={styles.btnlogin}>
        <TouchableOpacity style={styles.btnloginsocial}>
          <Icon
            size={24}
            type="material-community"
            name="google"
            color="#fff"
            backgroundColor="transparent"
            // onPress={() => signInAsync()}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnloginsocial} onPress={() => logIn()}>
          <Icon
            size={24}
            type="material-community"
            name="facebook"
            color="#fff"
            backgroundColor="transparent"
          />
        </TouchableOpacity>
      </View> */}

      <Loading isVisible={loading} text="Favor espere" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F6F8",
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingTop: 20,
  },
  input: {
    width: "90%",
    marginTop: 20,
    height: 50,
  },
  btnentrar: {
    width: "90%",
    marginTop: 20,
  },
  txtcrearcuenta: {
    marginTop: 20,
  },
  cuenta: {
    color: "#f07218",
    fontFamily: "Roboto",
    fontSize: 15,
  },
  texto: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    color: "#128c7e",
  },
  btnlogin: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  btnloginsocial: {
    backgroundColor: "#f07218",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
