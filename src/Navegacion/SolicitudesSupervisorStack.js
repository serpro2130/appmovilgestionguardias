import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import SolicitudesSupervisor from "../Pantallas/SolicitudesSupervisor/SolicitudesSupervisor";
import ResponderSolicitudSupervisor from "../Pantallas/SolicitudesSupervisor/ResponderSolicitudSupervisor";
const Stack = createStackNavigator();

export default function SolicitudesSupervisorStack() {
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
        component={SolicitudesSupervisor}
        name="SolicitudesSupervisor"
        options={{
          title: "Solicitudes cliente",
          headerLeft: () => buttonLeft(),
        }}
      />

      <Stack.Screen
        component={ResponderSolicitudSupervisor}
        name="ResponderSolicitudSupervisor"
        options={{ title: "Responder solicitud" }}
      />
    </Stack.Navigator>
  );
}
