import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Documento from "../Pantallas/Documento/Documento";
import AddDocument from "../Pantallas/Documento/AddDocument";
import Contacto from "../Pantallas/Documento/Contacto";
import MensajesList from "../Pantallas/Documento/MensajesList";
import Detalle from "../Pantallas/Documento/Detalle";

const Stack = createStackNavigator();

export default function DocumentoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Documento}
        name="documento"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AddDocument}
        name="add-document"
        options={{
          title: "Agregar Nuevo Documento",
          headerStyle: { backgroundColor: "#f07218" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        component={Detalle}
        name="detalle"
        options={{
          headerTransparent: true,
          headerTintColor: "#f07218",
          title: "",
        }}
      />
      <Stack.Screen
        component={MensajesList}
        name="mensajes"
        options={{
          title: "Mensajes",
          headerStyle: { backgroundColor: "#f07218" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        component={Contacto}
        name="contacto"
        options={{
          title: "Contacto",
          headerStyle: { backgroundColor: "#f07218" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}
