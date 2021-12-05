import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalTyT } from "../styles/textoytitulo";
import { ModalPicker } from "./ModalPicker";
import { render } from "react-dom";

var ops;

export default function App({ navigation }) {
  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("cliente");
    console.log("Sesion Cerrada");
    Alert.alert("Prometheus", "Sesion Cerrada");
  };

  const [chooseData, setchooseData] = useState("Seleccione una opción");
  const [isModalVisible, setisModalVisible] = useState(false);
  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  const setData = (option) => {
    ops = option;
    setchooseData(option);

    if (ops == "Camisas") {
      navigation.replace("ProductosCamisas");
    } else {
      if (ops == "Joggers") {
        navigation.replace("ProductosJoggers");
      } else {
        if (ops == "Accesorios") {
          navigation.replace("ProductosAccesorios");
        } else {
          if (ops == "Sneakers") {
            navigation.replace("ProductosSneakers");
          }
        }
      }
    }
  };

  return (
    <View style={styles.fondo}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={globalTyT.titulo}>PROMETHEUS</Text>
          <View style={styles.headerbotones}>
            <View style={styles.contenedorBotones}>
              <Pressable
                onPress={() => changeModalVisibility(true)}
                style={{ marginRight: 10 }}
              >
                <Image source={require("../../assets/img/filtrar.png")} />
              </Pressable>
              <Pressable onPress={() => navigation.replace("Login")}>
                <Image source={require("../../assets/img/exit.png")} />
              </Pressable>
            </View>
          </View>
        </View>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisibility(false)}
        >
          <ModalPicker
            changeModalVisibility={changeModalVisibility}
            setData={setData}
          />
        </Modal>

        <ScrollView style={styles.main}>
          <Image
            source={require("../../assets/img/PrometheusLogo.jpg")}
            style={styles.imagen}
          ></Image>

          <View style={styles.contenedorSmall}>
            <Text style={globalTyT.titulo}>MISIÓN</Text>
            <Text style={globalTyT.textoSmall}>
              Ofrecer a nuestros clientes productos de calidad, a precios
              cómodos que cumplan con sus necesidades y exigencias, abarcando
              sus gustos de acuerdo a su estilo de ver y vivir la vida.
            </Text>
          </View>
          <View style={styles.contenedorSmall}>
            <Text style={globalTyT.titulo}>VISIÓN</Text>
            <Text style={globalTyT.textoSmall}>
              Ser una empresa líder y reconocida en la venta de ropa, lograr
              también extendernos y crear nuestras cadenas de almacenes,
              proporcionando cada día más un servicio de excelencia a nuestros
              clientes y que al mismo tiempo nos permitan competir en el mercado
              nacional con los mejores precios del mercado.
            </Text>
          </View>
          <View style={styles.contenedorSmall}>
            <Text style={globalTyT.titulo}>Aplicacion hecha por: </Text>
            <Text style={globalTyT.textoSmall}>Lizzi Silva Alonzo</Text>
            <Text style={globalTyT.textoSmall}>Bryan Martinez Zelaya</Text>
            <Text style={globalTyT.textoSmall}>Otoniel Aguirre Aguilar</Text>
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
      </SafeAreaView>
    </View>
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
    marginHorizontal: 20,
  },
  imagen: {
    height: 400,
    width: 400,
  },
  headerbotones: {
    display: "flex",
    flexDirection: "row",
  },
  contenedorBotones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorSmall: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
});
