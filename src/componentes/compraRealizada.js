import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";

export default function App({ navigation }) {
  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.imagen}>
            <Image source={require("../../assets/img/check.png")} />
          </View>
          <View style={styles.texto}>
            <Text style={globalTyT.titulo}>Compra realizada con exito!</Text>
            <Text style={globalTyT.titulo}>Gracias por su compra!</Text>
          </View>
          <Pressable onPress={() => navigation.replace("Principal")}>
            <LinearGradient
              style={globalBotones.boton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#E43E31", "#F4AA31"]}
            >
              <Text style={globalBotones.tituloBoton}>Continuar</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
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
    justifyContent: "center",
  },
  main: {
    display: "flex",
    alignItems: "center",
  },
  imagen: {
    marginBottom: 30,
  },
  texto: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});
