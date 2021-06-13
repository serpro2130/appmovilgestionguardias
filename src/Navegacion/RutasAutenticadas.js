import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";

import AdelantosStack from "./AdelantosStack";
import DocumentosStack from "./DocumentosStack";
//import DocumentoStack from "./DocumentoStack";
import ReportesStack from "./ReportesStack";
//import SolicitudesStack from "./SolicitudesStack";
//import SolicitudesClienteStack from "./SolicitudesClienteStack";
import SolicitudesSupervisorStack from "./SolicitudesSupervisorStack";
import TurnosStack from "./TurnosStack";
import GuardiasStack from "./GuardiasStack";
import ClientesStack from "./ClientesStack";
import PerfilStack from "./PerfilStack";
import InicioSalidaTurnoStack from "./InicioSalidaTurnoStack";
//import CuentaStack from "./CuentaStack";
import CustomDrawerContent from "../Components/CustomDrawerContent";

//aquí importaremos algunos componentes más tarde

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="seguridad"
      tabBarOptions={{
        inactiveTintColor: "#fff",
        activeTintColor: "#fff",
        style: {
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          alignItems: "center",
          backgroundColor: "#f07218",
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        component={DocumentosStack}
        name="DocumentosStack"
        options={{ title: "D" }}
      />
      {/* <Tab.Screen
        component={DocumentoStack}
        name="DocumentoStack"
        options={{ title: "Do" }}
      /> */}
      <Tab.Screen
        component={SolicitudesSupervisorStack}
        name="SolicitudesSupervisorStack"
        options={{ title: "S" }}
      />
      <Tab.Screen
        component={ClientesStack}
        name="ClientesStack"
        options={{ title: "C" }}
      />
      <Tab.Screen
        component={GuardiasStack}
        name="GuardiasStack"
        options={{ title: "G" }}
      />
      <Tab.Screen
        component={TurnosStack}
        name="TurnosStack"
        options={{ title: "T" }}
      />
      <Tab.Screen
        component={InicioSalidaTurnoStack}
        name="InicioSalidaTurnoStack"
        options={{ title: "I/S" }}
      />
      <Tab.Screen
        component={ReportesStack}
        name="ReportesStack"
        options={{ title: "R" }}
      />
      <Tab.Screen
        component={AdelantosStack}
        name="AdelantosStack"
        options={{ title: "S" }}
      />
      {/* <Tab.Screen
        component={CuentaStack}
        name="cuenta"
        options={{ title: "C" }}
      /> */}
      <Tab.Screen
        component={PerfilStack}
        name="cuenta"
        options={{ title: "Cu" }}
      />
    </Tab.Navigator>
  );
};

export default function RutasAutenticadas() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Tienda"
          component={TabBar}
          options={{
            title: "Tienda",
            drawerIcon: () => {
              <Icon type="material-community" name="store" size={24} />;
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
