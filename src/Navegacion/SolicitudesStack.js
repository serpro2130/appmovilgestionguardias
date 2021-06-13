import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Solicitudes from "../Pantallas/Solicitudes/Solicitudes";
import RegistrarSolicitud from "../Pantallas/Solicitudes/RegistrarSolicitud";
import AddProduct from "../Pantallas/Solicitudes/AddProduct";
import Contacto from "../Pantallas/Solicitudes/Contacto";
import MensajesList from "../Pantallas/Solicitudes/MensajesList";
import Detalle from "../Pantallas/Solicitudes/Detalle";

const Stack = createStackNavigator();

export default function SolicitudesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Solicitudes}
        name="Solicitudes"
        options={{ headerShown: false }} //headerShown:false
      />
      <Stack.Screen
        component={RegistrarSolicitud}
        name="RegistrarSolicitud"
        options={{ title: "RegistrarSolicitud" }}
      />
      <Stack.Screen
        component={AddProduct}
        name="add-product"
        options={{
          title: "Agregar Nuevo Servicio",
          headerStyle: { backgroundColor: "#f07218" },
          headerTintColor: "#fff",
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
        component={Detalle}
        name="detalle"
        options={{
          headerTransparent: true,
          headerTintColor: "#f07218",
          title: "",
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
