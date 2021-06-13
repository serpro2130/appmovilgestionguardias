import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import InicioSalidaTurnoGuardia from "../Pantallas/InicioSalidaTurnoGuardia/InicioSalidaTurnoGuardia";
import RegistrarInicioSalidaTurnoGuardia from "../Pantallas/InicioSalidaTurnoGuardia/RegistrarInicioSalidaTurnoGuardia";
import EditarInicioSalidaTurnoGuardia from "../Pantallas/InicioSalidaTurnoGuardia/EditarInicioSalidaTurnoGuardia";

const Stack = createStackNavigator();

export default function InicioSalidaTurnoGuardiaStack() {
  const navigation = useNavigation();

  const buttonLeft = () => {
    return (
      <Icon
        type="material-community"
        name="menu"
        color="#f07218"
        size={30}
        onPress={() => navigation.toggleDrawer()}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={InicioSalidaTurnoGuardia}
        name="InicioSalidaTurnoGuardia"
        options={{
          title: "Inicio y salida del turno..",
          headerLeft: () => buttonLeft(),
        }}
      />
      <Stack.Screen
        component={RegistrarInicioSalidaTurnoGuardia}
        name="RegistrarInicioSalidaTurnoGuardia"
        options={{ title: "Registrar inicio y salida" }}
      />
      <Stack.Screen
        component={EditarInicioSalidaTurnoGuardia}
        name="EditarInicioSalidaTurnoGuardia"
        options={{ title: "Inicio y salida turno" }}
      />
    </Stack.Navigator>
  );
}
