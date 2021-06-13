import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import {Button} from "react-native-elements"
import {useNavigation} from "@react-navigation/native";

export default function UserGuest(){
    const navigation = useNavigation();
    

    return(
       <ScrollView 
       showsVerticalScrollIndicator={false}
       centerContent={true} 
       style={styles.viewBody}
       >
           <Image
             source={require("../../../assets/logo.png")}
             resizeMode="contain"
             style={styles.image}
           />
           <Text style={styles.title}>Consulta tu perfil de AppSerpro</Text>
           <Text style={styles.description}>
               Aplicación movil para la gestión de guardias en lo relacionado a: documentos, solicitudes, 
               clientes, guardias, turnos, reportes, sueldos. 
           </Text>
           <View style={styles.viewBtn} >
               <Button
                title="Ver tu perfil"
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainer}
                onPress={()=> navigation.navigate("login")}
               />
           </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody:{
      marginLeft: 30,
      marginRight: 30,
    },
    image:{
        height:300,
        width:"100%",
        marginBottom: 40,
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center",
    },
    description:{
        textAlign: "center",
        marginBottom: 20,
    },
    viewBtn:{
        flex: 1,
        alignItems: "center"
    },
    btnStyle:{
        backgroundColor: "#00a680"
    },
    btnContainer:{
       width:"70%",
    }
  
})