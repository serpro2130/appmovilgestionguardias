import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Pantallas/Cuenta/Login";
import Registrar from "../Pantallas/Cuenta/Registrar";
import RestaurarPassword from "../Pantallas/Cuenta/RestaurarPassword";

const Stack = createStackNavigator();

export default function RutasNoAutenticadas() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={Registrar} name="Registrar" />
        <Stack.Screen component={RestaurarPassword} name="RestaurarPassword" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
