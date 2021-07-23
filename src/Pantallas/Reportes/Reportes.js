import React, { useState, useEffect, useCallback } from "react";
import { firebaseapp } from "../../Utils/Firebase";
import * as firebase from "firebase";
import "firebase/firestore";
import { View, Text, StyleSheet, FlatList, Image, Alert } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  ListarReportes,
  eliminarProducto,
  numReportes,
  ordernReportes,
} from "../../Utils/Acciones";
import ListReportes from "../../Components/ListReportes";

const db = firebase.firestore(firebaseapp);
const limitReportes = 12;

export default function Reportes() {
  const navigation = useNavigation();
  const [reportes, setReportes] = useState({});
  const [reportesOrd, setReportesOrd] = useState([]);
  const [totalReportes, setTotalReportes] = useState(0);
  const [startReportes, setStartReportes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //console.log(totalReportes);
  //console.log(reportesOrd);

  useEffect(() => {
    (async () => {
      setReportes(await ListarReportes());
    })();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     //   // (async () => {
  //     //   //   setTotalReportes(await numReportes());
  //     //   // })();

  //     //   // const resultReportes = [];
  //     //   // (async () => {
  //     //   //   setStartReportes(await ordernReportes());
  //     //   //   setReportesOrd(await ordernReportes());
  //     //   // })();
  //     db.collection("Reportes")
  //       .get()
  //       .then((snap) => {
  //         setTotalReportes(snap.size);
  //       });

  //     const resultReportes = [];

  //     db.collection("Reportes")
  //       .orderBy("fechacreacion", "desc")
  //       .limit(limitReportes)
  //       .get()
  //       .then((response) => {
  //         setStartReportes(response.docs[response.docs.leght - 1]);
  //         response.forEach((doc) => {
  //           const report = doc.data();
  //           report.id = doc.id;
  //           resultReportes.push(report);
  //         });
  //         setReportesOrd(resultReportes);
  //       });
  //   }, [])
  // );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setReportes(await ListarReportes());
      })();
    }, [])
  );

  // const handleLoadMore = () => {
  //   const resultReportes = [];
  //   reportesOrd.length < totalReportes && setIsLoading(true);

  //   db.collection("Reportes")
  //     .orderBy("fechacreacion", "desc")
  //     .startAfter(startReportes.data().fechacreacion)
  //     .limit(limitReportes)
  //     .get()
  //     .then((response) => {
  //       if (response.docs.length > 0) {
  //         setStartReportes(response.docs[response.docs.leght - 1]);
  //       } else {
  //         setIsLoading(false);
  //       }
  //       response.forEach((doc) => {
  //         const report = doc.data();
  //         report.id = doc.id;
  //         resultReportes.push(report);
  //       });
  //       setReportesOrd([...reportesOrd, ...resultReportes]);
  //     });
  // };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {reportes.length > 0 ? (
        <FlatList
          data={reportes}
          renderItem={(item) => (
            <Reporte
              reportes={item}
              setReportes={setReportes}
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
              name="keyboard"
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

      <Icon
        name="plus"
        type="material-community"
        color="#f07218"
        containerStyle={styles.btncontainer}
        onPress={() => {
          navigation.navigate("RegistrarReporte");
        }}
        reverse
      />
    </View>

    // <View style={styles.viewBody}>
    //   <ListReportes
    //     reportesOrd={reportesOrd}
    //     handleLoadMore={handleLoadMore}
    //     isLoading={isLoading}
    //   />
    //   <Icon
    //     name="plus"
    //     type="material-community"
    //     color="#f07218"
    //     containerStyle={styles.btncontainer}
    //     onPress={() => {
    //       navigation.navigate("RegistrarReporte");
    //     }}
    //     reverse
    //   />
    // </View>
  );
}

function Reporte(props) {
  const { reportes, setReportes, navigation } = props;
  const {
    nombreGuardia,
    puestoTrabajo,
    reporte,
    fechaReporte,
    horaReporte,
    id,
  } = reportes.item;

  return (
    <View style={styles.container}>
      <View style={styles.viewmedio}>
        <Text style={styles.nombreDocumento}>{nombreGuardia}</Text>
        <Text style={styles.nombreInstitucion}>{puestoTrabajo}</Text>
        <Text style={styles.fechaPresentacion}>{fechaReporte}</Text>
        <Text style={styles.fechaPresentacion}>{reporte}</Text>
        <Text style={styles.fechaPresentacion}>{horaReporte}</Text>
      </View>
      <View style={styles.iconbar}>
        <View style={styles.iconedit}>
          <Icon
            type="material-community"
            name="pencil-outline"
            color="#FFA000"
            style={styles.iconedit}
            onPress={() => {
              navigation.navigate("EditarReporte", { id });
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
                "Eliminar Reporte",
                "¿Estás seguro que deseas eliminar el reporte",
                [
                  {
                    style: "default",
                    text: "Confirmar",
                    onPress: async () => {
                      await eliminarProducto("Reportes", id);
                      setReportes(await ListarReportes());
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
