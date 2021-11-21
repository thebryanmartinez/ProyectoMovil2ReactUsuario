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
import { ModalPicker } from './ModalPicker'
import { Colors } from "react-native/Libraries/NewAppScreen";

var ops;

export default function App({ navigation }) {
  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('cliente');
    console.log("Sesion Cerrada");
    Alert.alert("Prometheus", "Sesion Cerrada");
  };

  const [chooseData, setchooseData] = useState('Seleccione una opción');
  const [isModalVisible, setisModalVisible] = useState(false);
  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  }

  const setData = (option) => {
    ops= option;
    setchooseData(option)
    alert(ops);
  }



  return (
    <View style={styles.fondo}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={globalTyT.titulo}>PROMETHEUS</Text>
          <View style={styles.headerbotones}>
            <View style={styles.contenedorBotones}>
              <Pressable onPress={() => changeModalVisibility(true)} style={{ marginRight: 10 }}>
                <Image source={require('../../assets/img/filtrar.png')} />
              </Pressable>
              <Pressable onPress={() => navigation.replace('Login')}>
                <Image source={require('../../assets/img/exit.png')} />
              </Pressable>
            </View>
          </View>
        </View>
        <ScrollView style={styles.main}>

          <Modal
            transparent={true}
            animationType='fade'
            visible={isModalVisible}
            nRequestClose={() => changeModalVisibility(false)}>

            <ModalPicker
              changeModalVisibility={changeModalVisibility}
              setData={setData}
            />

          </Modal>
          <Image source={require('../../assets/img/adidas1.jpg')} styles={styles.imagen} />
          <Image source={require('../../assets/img/adidas2.jpg')} styles={styles.imagen} />
          <Image source={require('../../assets/img/adidas3.jpg')} styles={styles.imagen} />
        </ScrollView>
        <View>
          <LinearGradient
            style={globalFooter.footer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#E43E31', '#F4AA31']}
          >
            <Pressable onPress={() => navigation.replace('Principal')}>
              <Image source={require('../../assets/img/home.png')} />
            </Pressable>
            <Pressable onPress={() => navigation.replace('Producto')}>
              <Image source={require('../../assets/img/search.png')} />
            </Pressable>
            <Pressable onPress={() => navigation.replace('CarritoCompras')}>
              <Image source={require('../../assets/img/shoppingcart.png')} />
            </Pressable>
            <Pressable onPress={() => navigation.replace('Usuarios')}>
              <Image source={require('../../assets/img/user.png')} />
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
    marginTop: 25,
    marginLeft: 20,
  },
  imagen: {
    marginTop: 20,
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
});
