import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";

import AdelantosGuardiasStack from "./AdelantosGuardiasStack";
import ReportesStack from "./ReportesStack";
//import SolicitudesStack from "./SolicitudesStack";
import SolicitudesClienteStack from "./SolicitudesClienteStack";
import SolicitudesGuardiaStack from "./SolicitudesGuardiaStack";
import TurnosGuardiasStack from "./TurnosGuardiasStack";
import PerfilStack from "./PerfilStack";
import InicioSalidaTurnoGuardiaStack from "./InicioSalidaTurnoGuardiaStack";
import CustomDrawerContentGuardias from "../Components/CustomDrawerContentGuardias";

//aquí importaremos algunos componentes más tarde

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="ReportesStack"
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
        component={SolicitudesGuardiaStack}
        name="SolicitudesGuardiaStack"
        options={{ title: "S" }}
      />
      <Tab.Screen
        component={TurnosGuardiasStack}
        name="TurnosGuardiasStack"
        options={{ title: "T" }}
      />
      <Tab.Screen
        component={InicioSalidaTurnoGuardiaStack}
        name="InicioSalidaTurnoGuardiaStack"
        options={{ title: "I/S" }}
      />
      <Tab.Screen
        component={ReportesStack}
        name="ReportesStack"
        options={{ title: "R" }}
      />
      <Tab.Screen
        component={AdelantosGuardiasStack}
        name="AdelantosGuardiasStack"
        options={{ title: "S" }}
      />
      <Tab.Screen
        component={PerfilStack}
        name="cuenta"
        options={{ title: "C" }}
      />
    </Tab.Navigator>
  );
};

export default function RutasAutenticadasGuardias() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContentGuardias {...props} />}
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
