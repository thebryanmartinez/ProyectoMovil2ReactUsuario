import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";

export default function login({ navigation }) {
  const [correo, setcorreo] = useState(null);
  const [focusNombre, setFocusNombre] = useState(false);

  const pressrecuperacion = async () => {
    if (!correo) {
      console.log("Debe su correo para la recuperacion");
      Alert.alert("Prometheus", "Debe escribir los datos completos");
    } else {
      try {
        const response = await fetch(
          "http://192.168.0.8:3001/api/autenticacion/recuperacion/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              correo: correo,
              
            }),
          }
        );
        const json = await response.json();
        console.log(json);
        Alert.alert("Su nueva contrasena es 123");
        navigation.replace("Login");
        }
       catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogin}>
        <View style={styles.contenedorTitulo}>
          <Text style={globalTyT.titulo}>PROMETHEUS</Text>
        </View>

        <View style={[styles.contenedorControles, styles.sombraControles]}>
          <View style={styles.controles}>
            <Text style={globalTyT.texto}>Ingrese su correo:</Text>
            <TextInput
              value={correo}
              onChangeText={setcorreo}
              placeholder="Escriba el correo"
              placeholderTextColor="#ced4da"
              style={globalEntradas.entradaTexto}
              autoFocus={focusNombre}
            ></TextInput>
          </View>
          <View style={styles.contenedorBotones}>
            <Pressable onPress={pressrecuperacion}>
              <LinearGradient
                style={styles.botonInicioSesion}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Iniciar sesión</Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={() => navigation.replace("Login")}>
            <LinearGradient
              style={globalBotones.boton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#E43E31", "#F4AA31"]}
            >
              <Text style={globalBotones.tituloBoton}>Cancelar</Text>
            </LinearGradient>
          </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#072C50",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 20,
    width: "100%",
    height: "100%",
  },
  contenedorImagen: {
    flex: 1,
  },
  contenedorLogin: {
    alignItems: "stretch",
    justifyContent: "center",
    height: 530,
    width: 360,
  },
  contenedorTitulo: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  contenedorControles: {
    flex: 3,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 10,
  },
  texto: {
    fontFamily: "montserrat-bold",
    color: "#ed7731",
    fontSize: 18,
    textAlign: "center",
  },
  tituloLogin: {
    color: "#ed7731",
    fontFamily: "montserrat-bold",
    fontSize: 40,
    fontWeight: "600",
  },
  controles: {
    flex: 4,
    marginBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  contenedorBotones: {
    flex: 1,
    padding: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  contenedorBotonesRedes: {
    flex: 2,
    padding: 10,
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  boton: {
    flex: 1,
    alignItems: "stretch",
    marginLeft: 10,
    marginRight: 10,
  },
  botonRedes: {
    flex: 1,
    alignItems: "stretch",
    margin: 5,
  },
  botonInicioSesion: {
    backgroundColor: "#ed7731",
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    padding: 8,
    borderRadius: 5,
  },
  registreseAqui: {
    fontFamily: "montserrat-bold",
    color: "#ed7731",
    fontSize: 18,
    textAlign: "center",
    textDecorationLine: "underline",
    borderColor: "#ed7731",
  },
});
