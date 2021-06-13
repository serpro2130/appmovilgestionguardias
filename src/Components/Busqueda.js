import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { Buscar } from "../Utils/Acciones";

export default function Busqueda(props) {
  const {
    setproductlist,
    actualizarProductos,
    setsearch,
    search,
    setmensajes,
  } = props;

  useEffect(() => {
    let resultados = [];
    if (search) {
      (async () => {
        resultados = await Buscar(search);
        setproductlist(resultados);
        if (resultados.length === 0) {
          setmensajes("No se encontraron datos para la búsqueda " + search);
        }
      })();
    }
  }, [search]);

  return (
    <SearchBar
      placeholder="¿Qué estás Buscando?"
      containerStyle={{
        backgroundColor: "transparent",
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
      }}
      inputContainerStyle={{
        backgroundColor: "#fff",
        alignItems: "center",
      }}
      inputStyle={{ fontFamily: "Roboto", fontSize: 20 }}
      onChangeText={(text) => {
        setsearch(text);
      }}
      value={search}
      onClear={() => {
        setsearch("");
        setproductlist([]);
        actualizarProductos();
      }}
    />
  );
}
