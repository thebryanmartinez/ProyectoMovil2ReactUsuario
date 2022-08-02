import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";

export default function login({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [contrasena, setContrasena] = useState(null);
  const [focusNombre, setFocusNombre] = useState(false);

  const pressIniciarSesion = async () => {
    if (!usuario || !contrasena) {
      console.log("Debe escribir los datos completos");
      Alert.alert("Prometheus", "Debe escribir los datos completos");
    } else {
      try {
        const response = await fetch(
          "http://192.168.0.3:3001/api/autenticacion/iniciosesion/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre_usuario: usuario,
              contrasena_encriptada: contrasena,
            }),
          }
        );
        const json = await response.json();

        console.log(json);
        if (json.data.length == 0) {
          console.log(json.msj);
          Alert.alert("Prometheus", json.msj);
        } else {
          const cliente = JSON.stringify(json.data);
          await AsyncStorage.setItem("cliente", cliente);

          const cliente_usuario = JSON.stringify(usuario);
          await AsyncStorage.setItem("cliente_usuario", cliente_usuario);

          const cliente_contrasena = JSON.stringify(contrasena);
          await AsyncStorage.setItem("contrasena", cliente_contrasena);

          console.log(json.msj);
          Alert.alert("Prometheus", json.msj);
          navigation.replace("Principal");
        }
      } catch (error) {
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
            <Text style={globalTyT.texto}>Ingrese su usuario:</Text>
            <TextInput
              value={usuario}
              onChangeText={setUsuario}
              placeholder="Escriba el usuario o correo"
              placeholderTextColor="#ced4da"
              style={globalEntradas.entradaTexto}
              autoFocus={focusNombre}
            ></TextInput>
            <Text style={globalTyT.texto}>Ingrese su contraseña:</Text>
            <TextInput
              value={contrasena}
              onChangeText={setContrasena}
              placeholder="Escriba la contraseña"
              placeholderTextColor="#ced4da"
              style={globalEntradas.entradaTexto}
              passwordRules=""
              secureTextEntry={true}
            ></TextInput>
          </View>
          <View style={styles.contenedorBotones}>
            <Pressable onPress={pressIniciarSesion}>
              <LinearGradient
                style={styles.botonInicioSesion}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Iniciar sesión</Text>
              </LinearGradient>
            </Pressable>
          </View>
            <View style={styles.botonRedes}>
              <Pressable onPress={() => navigation.replace("Registro")}>
                <Text style={styles.registreseAqui}>Registrese aquí</Text>
              </Pressable>
          </View>
            <View style={styles.botonRedes}>
              <Pressable onPress={() => navigation.replace("Correo")}>
                <Text style={styles.registreseAqui}>Se le olvidó su contraseña</Text>
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
