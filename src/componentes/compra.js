import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";

export default function App({ navigation }) {
  var [idproductos, setidproductos] = useState(null);
  var [nombre_producto, setnombre_producto] = useState(null);
  var [marca_producto, setmarca_producto] = useState(null);
  var [cantidad, setcantidad] = useState(null);
  var [precio, setPrecio] = useState(null);
  var [subtotal, setSubtotal] = useState(null);
  var [impuesto, setImpuesto] = useState(null);
  var [total, setTotal] = useState(null);
  var [idusuario, setidusuario] = useState(null);
  var [nombre_usuario, setNombre_Usuario]= useState(null);
  


  const calculosListado = async () => {
    try {
      var datos = JSON.parse(await AsyncStorage.getItem("datos_productos"));
      var nombre = JSON.parse(await AsyncStorage.getItem("cliente_usuario"));
    } catch (error) {
      Alert.alert("Error al leer:" + error);
    }
    setidproductos(datos.idproductos);
    setnombre_producto(datos.nombre_producto);
    setmarca_producto(datos.marca_producto);
    setPrecio(datos.precio_producto);
    setSubtotal(parseInt(precio, 10) * parseInt(cantidad, 10));
    setImpuesto(parseInt(subtotal, 10) * 0.15);
    setTotal(parseInt(subtotal, 10) + parseInt(impuesto, 10));
    setNombre_Usuario(nombre);
      try {
        var nombre = JSON.parse(await AsyncStorage.getItem("cliente_usuario"));
        var cliente = JSON.parse(await AsyncStorage.getItem("cliente"));
        var token = cliente.token;
        const response = await fetch(
          "http://192.168.0.3:3001/api/usuarios/?nombre_usuario=" + nombre,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const json = await response.json();
        var id = json.idusuario;
        console.log(json);
        setidusuario(id);
      } catch (error) {
        console.error(error);
      }
  };

  const pressdetalle = async () => {
    if (
      !idproductos ||
      !nombre_producto ||
      !cantidad ||
      !subtotal ||
      !impuesto ||
      !total ||
      !idusuario ||
      !nombre_usuario 
    ) {
      console.log("Debe escribir los datos completos");
      Alert.alert("Prometheus", "Debe escribir los datos completos");
    } else {
      try {
        var cliente = JSON.parse(await AsyncStorage.getItem("cliente"));
        var token = cliente.token;
        

        const response = await fetch("http://192.168.0.3:3001/api/detalles_factura/guardar", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },

          body: JSON.stringify({
            idproductos: idproductos,
            nombre_producto: nombre_producto,
            cantidad: cantidad,
            subtotal: subtotal,
            impuesto: impuesto,
            total: total,
            idusuario:idusuario,
            nombre_usuario:nombre_usuario
          }),
        });
        
        Alert.alert("Prometheus", "Detalle ingresado correctamente");
      } catch (error) {
        console.error(error);
      }
    }
  };

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
              <Text style={globalTyT.texto}>{nombre_producto}</Text>
              <Text style={globalTyT.texto}>{marca_producto}</Text>
            </View>
            <View></View>
            <View style={styles.contenedores}>
              <Text style={globalTyT.texto}>Cantidad:</Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="#"
                style={globalEntradas.entradaTexto}
                placeholderTextColor="#ced4da"
                onChangeText={setcantidad}
              />
            </View>
            <View style={styles.contenedores}>
              <Text style={globalTyT.texto}>Sbt: {subtotal}</Text>
              <Text style={globalTyT.texto}>Isv: {impuesto}</Text>
            </View>
            <View>
              <Text style={globalTyT.texto}>Ttl: {total}</Text>
            </View>
            <Pressable onPress={pressdetalle}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Confirmar</Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={calculosListado}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Listar</Text>
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
