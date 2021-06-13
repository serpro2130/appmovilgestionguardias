import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import SolicitudesCliente from "../Pantallas/SolicitudesCliente/SolicitudesCliente";
import RegistrarSolicitudesCliente from "../Pantallas/SolicitudesCliente/RegistrarSolicitudesCliente";
import EditarSolicitudesCliente from "../Pantallas/SolicitudesCliente/EditarSolicitudesCliente";
//import SolicitudesGuardia from "../Pantallas/SolicitudesGuardia/SolicitudesGuardia";
//import ResponderSolicitud from "../Pantallas/SolicitudesGuardia/ResponderSolicitud";

const Stack = createStackNavigator();

export default function SolicitudesClienteStack() {
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
        component={SolicitudesCliente}
        name="SolicitudesCliente"
        options={{
          title: "Solicitudes cliente",
          headerLeft: () => buttonLeft(),
        }}
      />
      <Stack.Screen
        component={RegistrarSolicitudesCliente}
        name="RegistrarSolicitudesCliente"
        options={{ title: "Registrar solicitud" }}
      />
      <Stack.Screen
        component={EditarSolicitudesCliente}
        name="EditarSolicitudesCliente"
        options={{ title: "Editar solicitud" }}
      />
      {/* <Stack.Screen
        component={ResponderSolicitud}
        name="ResponderSolicitud"
        options={{ title: "Responder solicitud cliente" }}
      /> */}
    </Stack.Navigator>
  );
}
