import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListSolicitudes(props) {
  const { solicitudesMapa } = props;
  const navigation = useNavigation();

  return (
    <View>
      {size(solicitudesMapa) > 0 ? (
        <FlatList
          data={solicitudesMapa}
          renderItem={(solicitud) => (
            <Solicitud solicitud={solicitud} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          //   onEndReachedThreshold={0.5}
          //   onEndReached={handleLoadMore}
          //   ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderReportes}>
          <ActivityIndicator color="#f07218" size="large" />
          <Text>Cargando solicitudes</Text>
        </View>
      )}
    </View>
  );
}

function Solicitud(props) {
  const { solicitud, navigation } = props;
  const { id, fecha, nombreCliente } = solicitud.item;

  const goSolicitud = () => {
    navigation.navigate("Solicitud", {
      id,
      nombreCliente,
    });
  };

  return (
    <TouchableOpacity onPress={goSolicitud}>
      <View style={styles.viewReporte}>
        <View style={styles.viewReporteImage}>
          <Text>
            {fecha} - {nombreCliente}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
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
});
