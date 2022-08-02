import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";

export default function App({ navigation }) {
  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [search, setSearch] = useState("");
  const [idusuario, setidusuario] = useState(null);
  var idusu;

  const Introducir = async () => {
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
    try {
      idusu = idusuario;
      const response = fetch(
        "http://192.168.0.3:3001/api/detalles_factura/listar2?idusuario=" +
          idusu
      )
        .then((response) => response.json())
        .then((json) => {
          setinfo(json);

          console.log(json);
        });
      setEjecucion(false);
    } catch (error) {
      setEjecucion(false);
      console.error(error);
    }
  };
  const GuardarFactura = async () => {
    try {
      var cliente = JSON.parse(await AsyncStorage.getItem("cliente"));
      var token = cliente.token;

      const response = await fetch("http://192.168.0.3:3001/api/facturas/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },

        body: JSON.stringify({
          idusuario: idusuario,
        }),
      });
      Alert.alert("Prometheus", "Compra realizada");
    } catch (error) {
      console.error(error);
    }
    const factura = await fetch(
      "http://192.168.0.3:3001/api/facturas/facturaReciente",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const json = await factura.json();
    var idfacturas = json.idfacturas;
    if (!idfacturas) {
      fetch(
        "http://192.168.0.3:3001/api/detalles_factura/modificar?idusuario=" +
          idusuario,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            idfacturas: idfacturas,
          }),
        }
      )
        .then((res) => res.text()) // or res.json()
        .then((res) => console.log(res));
      navigation.replace("CompraRealizada");
    } else {
      Alert.alert("No tiene ningun producto en el carrito");
    }
  };

  function eliminarDetalle(id) {
    fetch("http://192.168.0.3:3001/api/detalles_factura/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
    Alert.alert("Eliminado", "Su producto ha sido eliminado del carrito");
  }

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalTyT.titulo}>COMPRAS</Text>
        </View>
        <View style={styles.main}>
          <View>
            <FlatList
              numColumns={1}
              style={styles.productos}
              data={info}
              keyExtractor={(item) => item.iddetalles_Factura}
              renderItem={({ item }) => {
                return (
                  <Pressable style={styles.contenedorFuera}>
                    <View style={styles.contenedorDentro}>
                      <View style={styles.contenedorImagen}>
                        <Image
                          source={require("../../assets/img/user.png")}
                          style={styles.imagen}
                        />
                      </View>
                      <View style={styles.contenedorInfo}>
                        <Text style={styles.productoNombre}>
                          {item.nombre_producto}
                        </Text>
                        <Text style={styles.productoPrecio}>
                          L. {item.total}
                        </Text>
                      </View>
                      <View styles={styles.contenedorBoton}>
                        <Pressable
                          style={styles.eliminar}
                          onPress={() =>
                            eliminarDetalle(item.iddetalles_Factura)
                          }
                        >
                          <Image
                            source={require("../../assets/img/shoppingcart_error.png")}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>

        <View style={styles.contenedorBoton}>
          <Pressable onPress={Introducir}>
            <LinearGradient
              style={globalBotones.botonConMargen}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#E43E31", "#F4AA31"]}
            >
              <Text style={globalBotones.tituloBoton}>Llenar</Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={GuardarFactura}>
            <LinearGradient
              style={globalBotones.botonConMargen}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#E43E31", "#F4AA31"]}
            >
              <Text style={globalBotones.tituloBoton}>Comprar</Text>
            </LinearGradient>
          </Pressable>
        </View>
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
    marginTop: StatusBar.currentHeight,
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
  contenedorFuera: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  contenedorDentro: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorInfo: {
    display: "flex",
    flexGrow: 1,
  },
  contenedorImagen: {
    flex: 1,
    flexGrow: 2,
  },
  productoNombre: {
    textAlign: "left",
    color: "#ed7731",
    fontSize: 18,
    fontFamily: "montserrat-semibold",
  },
  productoPrecio: {
    marginTop: 15,
    textAlign: "left",
    color: "#ed7731",
    fontSize: 20,
    fontFamily: "montserrat-bold",
  },
  eliminar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    backgroundColor: "#ED553B",
  },
  contenedorBoton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
