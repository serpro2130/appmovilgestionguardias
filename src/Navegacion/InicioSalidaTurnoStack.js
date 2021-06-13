import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import InicioSalidaTurno from "../Pantallas/InicioSalidaTurno/InicioSalidaTurno";
import RegistrarInicioSalidaTurno from "../Pantallas/InicioSalidaTurno/RegistrarInicioSalidaTurno";
import EditarInicioSalidaTurno from "../Pantallas/InicioSalidaTurno/EditarInicioSalidaTurno";

const Stack = createStackNavigator();

export default function InicioSalidaTurnoStack() {
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
        component={InicioSalidaTurno}
        name="InicioSalidaTurno"
        options={{
          title: "Inicio y salida del turno",
          headerLeft: () => buttonLeft(),
        }}
      />
      <Stack.Screen
        component={RegistrarInicioSalidaTurno}
        name="RegistrarInicioSalidaTurno"
        options={{ title: "Registrar inicio y salida" }}
      />
      <Stack.Screen
        component={EditarInicioSalidaTurno}
        name="EditarInicioSalidaTurno"
        options={{ title: "Editar inicio y salida turno" }}
      />
    </Stack.Navigator>
  );
}
