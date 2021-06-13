import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ConfirmarNumero from "../Pantallas/Cuenta/ConfirmarNumero";
import EnviarConfirmacion from "../Pantallas/Cuenta/EnviarConfirmacion";

const Stack = createStackNavigator();

export default function CuentaStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={EnviarConfirmacion}
          name="enviar-informacion"
          options={{
            title: "Confirma Tu Número De Teléfono",
            headerStyle: { backgroundColor: "#f07218" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          component={ConfirmarNumero}
          name="confirmar-movil"
          options={{
            title: "Confirmar Número",
            headerStyle: { backgroundColor: "#f07218" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
