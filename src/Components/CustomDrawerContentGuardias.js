import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Icon } from "react-native-elements";
import { ObtenerUsuario, cerrarsesion } from "../Utils/Acciones";

export default function CustomDrawerContentGuardias(props) {
  const { displayName, photoURL, email } = ObtenerUsuario();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar
                rounded
                size="medium"
                source={require("../../assets/serproemcam.png")}
                onPress={() => props.navigation.toggleDrawer()}
              />

              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Text style={styles.title}>SERPROEMCAM</Text>
                <Text style={styles.caption}>Seguridad Privada</Text>
              </View>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="air-horn"
                  color={color}
                  size={size}
                  type="material-community"
                />
              )}
              label="Reportes"
              onPress={() => {
                props.navigation.navigate("ReportesStack");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="badge-account-horizontal"
                  color={color}
                  size={size}
                  type="material-community"
                />
              )}
              label="Turnos"
              onPress={() => {
                props.navigation.navigate("TurnosGuardiasStack");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="badge-account-horizontal"
                  color={color}
                  size={size}
                  type="material-community"
                />
              )}
              label="Inicio Salida Turno"
              onPress={() => {
                props.navigation.navigate("InicioSalidaTurnoGuardiaStack");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-cash"
                  color={color}
                  size={size}
                  type="material-community"
                />
              )}
              label="Sueldos"
              onPress={() => {
                props.navigation.navigate("AdelantosGuardiasStack");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="book-account"
                  color={color}
                  size={size}
                  type="material-community"
                />
              )}
              label="Solicitudes"
              onPress={() => {
                props.navigation.navigate("SolicitudesGuardiaStack");
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-box"
                  color={color}
                  size={size}
                  type="material-community"
                />
              )}
              label="Cuenta"
              onPress={() => {
                props.navigation.navigate("perfil");
              }}
            /> */}
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
              type="material-community"
            />
          )}
          label="Cerrar Sesi??n"
          onPress={() => {
            cerrarsesion();
            console.log("Hola");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
