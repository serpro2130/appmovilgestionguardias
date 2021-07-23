import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { Item } from "native-base";

export default function ListReportes(props) {
  const { reportesOrd, handleLoadMore, isLoading } = props;

  return (
    <View>
      {size(reportesOrd) > 0 ? (
        <FlatList
          data={reportesOrd}
          renderItem={(reporte) => <Reporte reporte={reporte} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderReportes}>
          <ActivityIndicator color="#f07218" size="large" />
          <Text>Cargando reportes</Text>
        </View>
      )}
    </View>
  );
}

function Reporte(props) {
  const { reporte } = props;
  const { fechaReporte, puestoTrabajo, horaReporte } = reporte.item;

  const goReporte = () => {
    console.log("s/n");
  };

  return (
    <TouchableOpacity onPress={goReporte}>
      <View style={styles.viewReporte}>
        <View style={styles.viewReporteImage}>
          <Text>
            {fechaReporte} - {puestoTrabajo} - {horaReporte}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <View style={styles.loaderReportes}>
        <ActivityIndicator color="#f07218" size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundReportes}>
        <Text>No quedan reportes por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderReportes: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewReporte: {
    flexDirection: "row",
    margin: 9,
  },
  viewReporteImage: {
    marginRight: 15,
  },
  notFoundReportes: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
