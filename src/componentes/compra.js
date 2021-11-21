import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";

export default function App({ navigation }) {
  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalTyT.titulo}>COMPRA</Text>
        </View>
        <ScrollView style={styles.main}>
          <View style={styles.contenedorImagen}>
            <Image source={require("../../assets/img/adidas3.jpg")} />
          </View>
          <View style={styles.contenedorInfo}>
            <View style={styles.contenedores}>
              <Text style={globalTyT.texto}>Nombre</Text>
              <Text style={globalTyT.texto}>Marca</Text>
            </View>
            <View></View>
            <View style={styles.contenedores}>
              <Text style={globalTyT.texto}>Cantidad:</Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="#"
                style={globalEntradas.entradaTexto}
                placeholderTextColor="#ced4da"
              />
            </View>
            <View style={styles.contenedores}>
              <Text style={globalTyT.texto}>Subtotal</Text>
              <Text style={globalTyT.texto}>Impuesto</Text>
            </View>
            <View>
              <Text style={globalTyT.texto}>Total</Text>
            </View>
            <Pressable>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Comprar</Text>
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
    backgroundColor: "#072C50",
  },
  header: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    backgroundColor: "#154472",
  },
  main: {
    flex: 1,
  },
  contenedorImagen: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorInfo: {
    margin: 20,
  },
  contenedores: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
