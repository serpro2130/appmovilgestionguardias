import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Clientes from "../Pantallas/Clientes/Clientes";
import RegistrarCliente from "../Pantallas/Clientes/RegistrarCliente";
import EditarCliente from "../Pantallas/Clientes/EditarCliente";

const Stack = createStackNavigator();

export default function AdelantosStack() {
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
        component={Clientes}
        name="Clientes"
        options={{ title: "Clientes", headerLeft: () => buttonLeft() }}
      />
      <Stack.Screen
        component={RegistrarCliente}
        name="RegistrarCliente"
        options={{ title: "Registrar Cliente" }}
      />
      <Stack.Screen
        component={EditarCliente}
        name="EditarCliente"
        options={{ title: "Editar Cliente" }}
      />
    </Stack.Navigator>
  );
}
