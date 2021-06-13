import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import AdelantosGuardias from "../Pantallas/AdelantosGuardias/AdelantosGuardias";

const Stack = createStackNavigator();

export default function AdelantosGuardiasStack() {
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
        component={AdelantosGuardias}
        name="AdelantosGuardias"
        options={{ title: "Adelantos", headerLeft: () => buttonLeft() }}
      />
    </Stack.Navigator>
  );
}
