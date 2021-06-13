import React, {useRef} from 'react';
import { StyleSheet, View, Text, ScrollView, Image} from "react-native";
import { Divider } from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../Components/Account/LoginForm";

export default function Login2() {
    const toastRef = useRef();

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Image
                source={require("../../../assets/logo.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef}/>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
            <Text>Social Login</Text>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
    
}

function CreateAccount() {
    const navigation = useNavigation();
    
    return(
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{" "}
            <Text 
              style={styles.btnRegister}
              onPress={()=> navigation.navigate("register")}
            >
                Regístrate
            </Text>
        </Text>
    )
}


const styles = StyleSheet.create({
    logo:{
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40,
    },
    textRegister:{
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister:{
        color: "#00a680",
        fontWeight: "bold",
    },
    divider:{
        backgroundColor: "#00a680",
        margin: 40
    }
})