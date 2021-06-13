import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";
import { size } from "lodash";

export const validaremail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};

export const cargarImagenesxAspecto = async (array) => {
  let imgResponse = { status: false, imagen: "" };
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  if (status === "denied") {
    alert("Usted debe permitir el accesos para cargar las imagenes");
  } else {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: array,
    });

    if (!result.cancelled) {
      imgResponse = { status: true, imagen: result.uri };
    }
  }
  return imgResponse;
};

export const convertirFicheroBlob = async (rutafisica) => {
  const fichero = await fetch(rutafisica);
  const blob = await fichero.blob();

  return blob;
};

export const enviarWhatsapp = (numero, text) => {
  let link = `whatsapp://send?phone=${numero.substring(
    1,
    size(numero)
  )}&text=${text}`;
  Linking.canOpenURL(link).then((supported) => {
    if (!supported) {
      Alert.alert("Favor instale whatsapp para enviar un mensaje directo");
    } else {
      return Linking.openURL(link);
    }
  });
};
