import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";

export default function App({ navigation }) {
  const [correo, setcorreo] = useState(null);
  const [focusNombre, setFocusNombre] = useState(false);

  const pressRecuperacion = async () => {
    if (!correo) {
      console.log("Debe su correo para la recuperacion");
      Alert.alert("Prometheus", "Debe escribir los datos completos");
    } else {
      try {
        const response = await fetch(
          "http://192.168.0.3:3001/api/autenticacion/recuperacion/",
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.fondo}>
      <ScrollView style={styles.container}>
        <Text style={styles.tituloPrometheus}>PROMETHEUS</Text>
        <View style={styles.main}>
          <Text style={globalTyT.texto}>Correo electronico: </Text>
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
          <Pressable onPress={() => navigation.replace("Login")}>
            <LinearGradient
              style={globalBotones.boton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#E43E31", "#F4AA31"]}
            >
              <Text style={globalBotones.tituloBoton}>Regresar</Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={pressRecuperacion}>
            <LinearGradient
              style={globalBotones.boton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#E43E31", "#F4AA31"]}
            >
              <Text style={globalBotones.tituloBoton}>Enviar</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: "#072C50",
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: "#072C50",
  },
  main: {
    marginTop: 40,
    display: "flex",
  },
  tituloPrometheus: {
    color: "#ed7731",
    marginTop: 20,
    fontSize: 40,
    textAlign: "center",
    fontFamily: "montserrat-bold",
  },
  contenedorBotones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
