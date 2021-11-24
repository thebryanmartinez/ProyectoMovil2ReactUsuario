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
import { globalFooter } from "../styles/footer";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";
import { LinearGradient } from "expo-linear-gradient";

export default function App({ navigation }) {
  const [nombre_completo, setNombre_Completo] = useState(null);
  const [contrasena_encriptada, setContrasena_Encriptada] = useState(null);
  const [nombre_usuario, setNombre_Usuario] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [direccion_usuario, setDireccion_Usuario] = useState(false);

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalTyT.titulo}>INGRESAR PRODUCTO</Text>
          <Pressable onPress={() => navigation.replace("Login")}>
            <Image source={require("../../assets/img/exit.png")} />
          </Pressable>
        </View>
        <ScrollView style={styles.main}>
          <Text style={globalTyT.texto}>Nombre del producto: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            style={globalEntradas.entradaTexto}
            onChangeText={setNombre_Completo}
            placeholder="Nombre del producto"
          ></TextInput>
          <Text style={globalTyT.texto}>Cantidad del producto: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
            style={globalEntradas.entradaTexto}
            onChangeText={setNombre_Usuario}
            placeholder="Cantidad en inventario"
          ></TextInput>
          <Text style={globalTyT.texto}>Precio de compra del producto: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
            style={globalEntradas.entradaTexto}
            onChangeText={setContrasena_Encriptada}
            placeholder="Precio de compra del producto"
          ></TextInput>
          <Text style={globalTyT.texto}>Marca del producto: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            style={globalEntradas.entradaTexto}
            onChangeText={setCorreo}
            placeholder="Marca del producto"
          ></TextInput>
          <Text style={globalTyT.texto}>ID de categoria: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
            style={globalEntradas.entradaTexto}
            onChangeText={setCorreo}
            placeholder="ID de Categoria"
          ></TextInput>
          <Text style={globalTyT.texto}>Precio de venta: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
            style={globalEntradas.entradaTexto}
            onChangeText={setCorreo}
            placeholder="Precio de venta"
          ></TextInput>
          <View style={styles.contenedorBotones}>
            <Pressable onPress={() => navigation.replace("")}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Cancelar</Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={() => navigation.replace("PrincipalEmpleado")}>
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
            <Pressable onPress={() => navigation.replace("PrincipalEmpleado")}>
              <Image source={require("../../assets/img/home.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.replace("IngresarProducto")}>
              <Image source={require("../../assets/img/add.png")} />
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
