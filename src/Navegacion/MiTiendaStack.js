import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MiTienda from "../Pantallas/MiTienda/MiTienda";
import EditarProducto from "../Pantallas/MiTienda/EditarProducto";
import RegistrarSolicitud from "../Pantallas/Solicitudes/RegistrarSolicitud";

const Stack = createStackNavigator();

export default function MiTiendaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#f07218" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        component={MiTienda}
        name="mitienda"
        options={{
          title: "Mi Tienda",
        }}
      />
      <Stack.Screen
        component={RegistrarSolicitud}
        name="RegistrarSolicitud"
        options={{ title: "RegistrarSolicitud" }}
      />
      {/* <Stack.Screen
          component={AddProduct}
          name="add-product"
          options={{
            title: "Agregar Nuevo Producto",
            headerStyle: { backgroundColor: "#128C7E" },
            headerTintColor: "#fff",
          }}
        /> */}
      <Stack.Screen
        component={EditarProducto}
        name="edit-product"
        options={{
          title: "Editar Producto",
        }}
      />
    </Stack.Navigator>
  );
}
