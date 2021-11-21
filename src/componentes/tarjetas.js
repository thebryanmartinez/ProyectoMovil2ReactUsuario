import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";

export default function App({ navigation }) {
  const [nombre_completo, setNombre_Completo] = useState(null);
  const [contrasena_encriptada, setContrasena_Encriptada] = useState(null);
  const [nombre_usuario, setNombre_Usuario] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [direccion_usuario, setDireccion_Usuario] = useState(false);

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("cliente");
    console.log("Sesion Cerrada");
    Alert.alert("Prometheus", "Sesion Cerrada");
  };

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalTyT.titulo}>TARJETAS</Text>
          <Pressable onPress={() => navigation.replace("Login")}>
            <Image source={require("../../assets/img/exit.png")} />
          </Pressable>
        </View>
        <ScrollView style={styles.main}>
          <Text style={globalTyT.texto}>Numero de tarjeta: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setNombre_Completo}
            placeholder="Numero de tarjeta"
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
          ></TextInput>
          <Text style={globalTyT.texto}>VIN: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setNombre_Usuario}
            placeholder="VIN"
            keyboardType="number-pad"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <Text style={globalTyT.texto}>Tipo tarjeta: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setContrasena_Encriptada}
            placeholder="Tipo de tarjeta"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <Text style={globalTyT.texto}>Fecha de vencimiento: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setCorreo}
            placeholder="Fecha de vencimiento"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <View style={styles.contenedorBotones}>
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
            <Pressable>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Ingresar</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
        <View>
          <LinearGradient
            style={globalFooter.footer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#E43E31", "#F4AA31"]}
          >
            <Pressable onPress={() => navigation.replace("Principal")}>
              <Image source={require("../../assets/img/home.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.replace("Producto")}>
              <Image source={require("../../assets/img/search.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.replace("CarritoCompras")}>
              <Image source={require("../../assets/img/shoppingcart.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.replace("Usuarios")}>
              <Image source={require("../../assets/img/user.png")} />
            </Pressable>
          </LinearGradient>
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
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#072C50",
  },
  header: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
    backgroundColor: "#154472",
  },
  main: {
    display: "flex",
    marginTop: 25,
    margin: 20,
  },
  contenedorBotones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
});
