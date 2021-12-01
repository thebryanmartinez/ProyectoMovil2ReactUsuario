import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Alert,
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
  const [nombre_producto, setnombre_producto] = useState(null);
  const [cantidad_producto, setcantidad_producto] = useState(null);
  const [precio_producto, setprecio_producto] = useState(null);
  const [marca_producto, setmarca_producto] = useState(null);
  const [idcategorias, setidcategoria] = useState(null);
  const [costo, setcosto] = useState(false);

  const pressingresarproducto = async () => {
    if (
      !nombre_producto ||
      !cantidad_producto ||
      !precio_producto ||
      !marca_producto ||
      !idcategorias ||
      !costo
    ) {
      console.log("Debe escribir los datos completos");
      Alert.alert("Prometheus", "Debe escribir los datos completos");
    } else {
      try {
        var cliente = JSON.parse(await AsyncStorage.getItem("cliente"));
        var token = cliente.token;

        const response = await fetch("http://192.168.0.8:3001/api/productos/guardar", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },

          body: JSON.stringify({
            nombre_producto: nombre_producto,
            cantidad_producto: cantidad_producto,
            precio_producto: precio_producto,
            marca_producto: marca_producto,
            idcategorias: idcategorias,
            costo: costo,
          }),
        });
        Alert.alert("Prometheus", "Producto ingresado correctamente");
      } catch (error) {
        console.error(error);
      }
    }
  };


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
            onChangeText={setnombre_producto}
            placeholder="Nombre del producto"
          ></TextInput>
          <Text style={globalTyT.texto}>Cantidad del producto: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
            style={globalEntradas.entradaTexto}
            onChangeText={setcantidad_producto}
            placeholder="Cantidad en inventario"
          ></TextInput>
          <Text style={globalTyT.texto}>Precio de compra del producto: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
            style={globalEntradas.entradaTexto}
            onChangeText={setcosto}
            placeholder="Precio de compra del producto"
          ></TextInput>
          <Text style={globalTyT.texto}>Marca del producto: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            style={globalEntradas.entradaTexto}
            onChangeText={setmarca_producto}
            placeholder="Marca del producto"
          ></TextInput>
          <Text style={globalTyT.texto}>ID de categoria: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
            style={globalEntradas.entradaTexto}
            onChangeText={setidcategoria}
            placeholder="ID de Categoria"
          ></TextInput>
          <Text style={globalTyT.texto}>Precio de venta: </Text>
          <TextInput
            placeholderTextColor="#ced4da"
            keyboardType="number-pad"
            style={globalEntradas.entradaTexto}
            onChangeText={setprecio_producto}
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
            <Pressable onPress={pressingresarproducto}>
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
