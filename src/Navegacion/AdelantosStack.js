import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Adelantos from "../Pantallas/Adelantos/Adelantos";
import RegistrarAdelanto from "../Pantallas/Adelantos/RegistrarAdelanto";
import EditarAdelanto from "../Pantallas/Adelantos/EditarAdelanto";

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
        component={Adelantos}
        name="Adelantos"
        options={{ title: "Adelantos", headerLeft: () => buttonLeft() }}
      />
      <Stack.Screen
        component={RegistrarAdelanto}
        name="RegistrarAdelanto"
        options={{ title: "Registrar Adelanto" }}
      />
      <Stack.Screen
        component={EditarAdelanto}
        name="EditarAdelanto"
        options={{ title: "Editar Adelanto" }}
      />
    </Stack.Navigator>
  );
}
