import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Guardias from "../Pantallas/Guardias/Guardias";
import RegistrarGuardia from "../Pantallas/Guardias/RegistrarGuardia";
import EditarGuardia from "../Pantallas/Guardias/EditarGuardia";

const Stack = createStackNavigator();

export default function GuardiasStack() {
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
        component={Guardias}
        name="Guardias"
        options={{ title: "Guardias", headerLeft: () => buttonLeft() }}
      />
      <Stack.Screen
        component={RegistrarGuardia}
        name="RegistrarGuardia"
        options={{ title: "Registrar Guardia" }}
      />
      <Stack.Screen
        component={EditarGuardia}
        name="EditarGuardia"
        options={{ title: "Editar Guardia" }}
      />
    </Stack.Navigator>
  );
}
