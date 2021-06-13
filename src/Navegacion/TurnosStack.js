import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Turnos from "../Pantallas/Turnos/Turnos";
import RegistrarTurno from "../Pantallas/Turnos/RegistrarTurno";
import EditarTurno from "../Pantallas/Turnos/EditarTurno";

const Stack = createStackNavigator();

export default function TurnosStack() {
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
        component={Turnos}
        name="Turnos"
        options={{ title: "Turnos", headerLeft: () => buttonLeft() }}
      />
      <Stack.Screen
        component={RegistrarTurno}
        name="RegistrarTurno"
        options={{ title: "Registrar Turno" }}
      />
      <Stack.Screen
        component={EditarTurno}
        name="EditarTurno"
        options={{ title: "Editar Turno" }}
      />
    </Stack.Navigator>
  );
}
