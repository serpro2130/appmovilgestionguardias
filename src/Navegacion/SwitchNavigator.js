import React, { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import RutasAutenticadas from "./RutasAutenticadas";
import RutasAutenticadasClientes from "./RutasAutenticadasClientes";
import RutasAutenticadasGuardias from "./RutasAutenticadasGuardias";
import { Text } from "react-native";

import CuentaStack from "./CuentaStack";
import { validarPhone, cerrarsesion } from "../Utils/Acciones";
import * as SecureStore from "expo-secure-store";

export default function SwitchNavigator() {
  const [phoneauth, setphoneauth] = useState(false);
  const [loading, setloading] = useState(true);
  const [rol, setrol] = useState("0");

  useEffect(() => {
    //cerrarsesion();
    validarPhone(setphoneauth, setrol);
    setTimeout(() => {
      setloading(false);
    }, 5000);
  }, []);

  if (loading) {
    return <Loading isVisible={loading} text="Cargando Configuración" />;
  } else {
    console.log(phoneauth);
    if (phoneauth) {
      console.log("EL ROL ES ACÁ EN EL SWITH");
      console.log(rol);
      switch (rol) {
        case "1":
          console.log("entro supervisor");

          return <RutasAutenticadas />;
        case "2":
          console.log("entro cliente");
          return <RutasAutenticadasClientes />;
        case "3":
          console.log("entro guardia");

          return <RutasAutenticadasGuardias />;
        default:
          return <Text>Cargando...</Text>;
      }
    } else {
      return <CuentaStack />;
    }
  }
}
