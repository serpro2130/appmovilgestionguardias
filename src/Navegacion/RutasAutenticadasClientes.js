import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
//import ShopButton from "../Components/ShopButton";

//import SolicitudesStack from "./SolicitudesStack";
import SolicitudesClienteStack from "./SolicitudesClienteStack";
//import PerfilStack from "./PerfilStack";
//import MiTienda from "./MiTiendaStack";
import CustomDrawerContentClientes from "../Components/CustomDrawerContentClientes";

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
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ color }) => mostrarIcono(route, color),
      // })}
    >
      <Tab.Screen
        component={SolicitudesClienteStack}
        name="SolicitudesClienteStack"
        options={{ title: "Solicitudes" }}
      />
      {/* <Tab.Screen
        component={MiTienda}
        name="mitienda"
        options={{ title: "", tabBarIcon: () => <ShopButton /> }}
      /> */}
      {/* <Tab.Screen
        component={PerfilStack}
        name="cuenta"
        options={{ title: "Cuenta" }}
      /> */}
    </Tab.Navigator>
  );
};

// function mostrarIcono(route, color) {
//   let iconName = "";

//   switch (route.name) {
//     case "SolicitudesStack":
//       iconName = "cart-outline";
//       break;

//     case "cuenta":
//       iconName = "account-circle-outline";
//       break;

//     case "mitienda":
//       iconName = "cart-outline";
//       break;
//   }

//   return (
//     <Icon type="material-community" name={iconName} size={24} color={color} />
//   );
// }

export default function RutasAutenticadasClientes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContentClientes {...props} />}
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
