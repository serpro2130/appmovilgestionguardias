import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import TurnosGuardias from "../Pantallas/TurnosGuardias/TurnosGuardias";

const Stack = createStackNavigator();

export default function TurnosGuardiasStack() {
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
        component={TurnosGuardias}
        name="TurnosGuardias"
        options={{ title: "Turnos", headerLeft: () => buttonLeft() }}
      />
    </Stack.Navigator>
  );
}
