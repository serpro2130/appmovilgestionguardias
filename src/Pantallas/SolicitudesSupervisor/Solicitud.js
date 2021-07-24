import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Loading from "../../Components/Loading";
import Map from "../../Components/Map";
import { Icon } from "react-native-elements";

import { firebaseapp } from "../../Utils/Firebase";
import * as firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseapp);

export default function Solicitud(props) {
  const { navigation, route } = props;
  const { id, nombreCliente } = route.params;
  const [solicitud, setSolicitud] = useState(null);

  navigation.setOptions({ title: nombreCliente });

  useEffect(() => {
    db.collection("Solicitudes")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setSolicitud(data);
      });
  }, []);

  if (!solicitud) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView style={styles.viewBody}>
      <InfoSolicitud
        nombreCliente={solicitud.nombreCliente}
        direccion={solicitud.direccion}
        fecha={solicitud.fecha}
        numeroPuestos={solicitud.numeroPuestos}
        tipoServicio={solicitud.tipoServicio}
      />
      <UbicacionSolicitud
        locationCliente={solicitud.locationCliente}
        nombreCliente={solicitud.nombreCliente}
        direccion={solicitud.direccion}
      />
      <View style={styles.iconbar}>
        <View style={styles.iconedit}>
          <Text>Responder solicitud</Text>
          <Icon
            type="material-community"
            name="check"
            color="#FFA000"
            style={styles.iconedit}
            onPress={() => {
              navigation.navigate("ResponderSolicitudSupervisor", { id });
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.viewmedio}>
          <Text style={styles.fechaPresentacion}>
            Guardia {solicitud.nombreGuardia}
          </Text>
          <Text style={styles.fechaPresentacion}>
            Valor servicio: ${solicitud.precioServicio}
          </Text>
          <Text style={styles.fechaPresentacion}>
            Valor total: ${solicitud.valorTotal}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoSolicitud(props) {
  const { nombreCliente, direccion, fecha, numeroPuestos, tipoServicio } =
    props;
  return (
    <View style={styles.viewInfoSolicitud}>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.puestosSolicitud}>Dirección: {direccion}</Text>
        <Text style={styles.puestosSolicitud}>Puestos: {numeroPuestos}</Text>
        <Text style={styles.puestosSolicitud}>
          Servicio: {tipoServicio} horas
        </Text>
        <Text style={styles.puestosSolicitud}>Fecha: {fecha}</Text>
      </View>
    </View>
  );
}

function UbicacionSolicitud(props) {
  const { locationCliente, nombreCliente, direccion } = props;
  return (
    <View style={styles.viewUbicSoli}>
      <Text style={styles.solicitudInfoTitle}>Ubicación del cliente</Text>
      <Map
        locationCliente={locationCliente}
        nombreCliente={nombreCliente}
        height={150}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  viewInfoSolicitud: {
    padding: 10,
  },
  dirSolicitud: {
    fontSize: 15,
    fontWeight: "bold",
  },
  puestosSolicitud: {
    marginTop: 5,
    color: "black",
  },
  viewUbicSoli: {
    margin: 10,
    marginTop: 5,
  },
  solicitudInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
  fechaPresentacion: {
    fontSize: 16,
    color: "#f07218",
  },
});
