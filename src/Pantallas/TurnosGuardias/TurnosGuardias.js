import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, Alert } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { ListarTurnos, eliminarProducto } from "../../Utils/Acciones";

export default function TurnosGuardias() {
  const navigation = useNavigation();
  const [turnos, setTurnos] = useState({});

  useEffect(() => {
    (async () => {
      setTurnos(await ListarTurnos());
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setTurnos(await ListarTurnos());
      })();
    }, [])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {turnos.length > 0 ? (
        <FlatList
          data={turnos}
          renderItem={(item) => (
            <Turno
              turnos={item}
              setTurnos={setTurnos}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <View style={{ alignSelf: "center" }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderColor: "#f07218",
              borderWidth: 1,
              borderRadius: 60,
              alignSelf: "center",
            }}
          >
            <Icon
              type="material-community"
              name="timer-sand"
              size={100}
              color="#f07218"
              style={{ margin: 10 }}
            />
            {/* <Avatar
              rounded
              size="xlarge"
              source={require("../../../assets/serproemcam.png")}
              // onPress={() => props.navigation.toggleDrawer()}
            /> */}
          </View>
        </View>
      )}
      {/* <Icon
        name="plus"
        type="material-community"
        color="#f07218"
        containerStyle={styles.btncontainer}
        onPress={() => {
          navigation.navigate("RegistrarTurno");
        }}
        reverse
      /> */}
    </View>
  );
}

function Turno(props) {
  const { turnos, setTurnos, navigation } = props;
  const { nombreGuardia, puestoTrabajo, fechaTurno, horarioTurno, id } =
    turnos.item;

  return (
    <View style={styles.container}>
      <View style={styles.viewmedio}>
        <Text style={styles.nombreDocumento}>{nombreGuardia}</Text>
        <Text style={styles.nombreInstitucion}>{puestoTrabajo}</Text>
        <Text style={styles.fechaPresentacion}>{fechaTurno}</Text>
        <Text style={styles.fechaPresentacion}>{horarioTurno}</Text>
      </View>
      {/* <View style={styles.iconbar}>
        <View style={styles.iconedit}>
          <Icon
            type="material-community"
            name="pencil-outline"
            color="#FFA000"
            style={styles.iconedit}
            onPress={() => {
              navigation.navigate("EditarTurno", { id });
            }}
          />
        </View>
        <View style={styles.icondelete}>
          <Icon
            type="material-community"
            name="trash-can-outline"
            color="#D32F2F"
            style={styles.icondelete}
            onPress={async () => {
              Alert.alert(
                "Eliminar Turno",
                "??Est??s seguro que deseas eliminar el turno",
                [
                  {
                    style: "default",
                    text: "Confirmar",
                    onPress: async () => {
                      await eliminarProducto("Turnos", id);
                      setTurnos(await ListarTurnos());
                    },
                  },
                  {
                    style: "default",
                    text: "Salir",
                  },
                ]
              );
            }}
          />
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  btncontainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
  },
  container: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 10,
    borderBottomColor: 0.5,
    borderBottomColor: "#f07218",
    shadowColor: "#f07218",
    shadowOffset: { height: 10 },
    shadowOpacity: 0.9,
  },
  viewmedio: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  nombreDocumento: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#075e54",
  },
  nombreInstitucion: {
    fontSize: 16,
    color: "#757575",
  },
  fechaPresentacion: {
    fontSize: 16,
    color: "#f07218",
  },
  iconbar: {
    marginTop: 20,
    flexDirection: "row",
  },
  icon: {
    borderWidth: 1,
    borderColor: "#25D366",
    padding: 5,
    borderRadius: 60,
    marginLeft: 20,
  },
  iconedit: {
    borderWidth: 1,
    borderColor: "#FFA000",
    padding: 5,
    borderRadius: 50,
    marginLeft: 20,
  },
  icondelete: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    padding: 5,
    borderRadius: 50,
    marginLeft: 20,
  },
});
