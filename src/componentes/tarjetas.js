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
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function App({ navigation }) {
  const [num_tarjeta, setnum_tarjeta] = useState(null);
  const [fecha_vencimiento, setfecha_vencimiento] = useState(null);
  const [VIN, setVIN] = useState(null);
  const [tipo_tarjeta, settipo_tarjeta] = useState(null);
  const [idusuario, setidusuario] = useState(null);

  const [chooseData, setchooseData] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  var Fecha = new Date();
  var FechaFormato;

  onChange = (fecha) => {
    this.setState({ fecha: fecha });
  };

  Mostrar = (fecha) => {
    Fecha = fecha;
    FechaFormato =
      Fecha.getFullYear() +
      "-" +
      (Fecha.getMonth() + 1) +
      "-" +
      Fecha.getDate();
    setchooseData(FechaFormato);
    setfecha_vencimiento(FechaFormato);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    Mostrar(date);
  };

  const IntroducirTarjeta = async () => {
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
    if (
      !idusuario ||
      !num_tarjeta ||
      !fecha_vencimiento ||
      !VIN ||
      !tipo_tarjeta
    ) {
      console.log("Debe escribir los datos completos");
      Alert.alert("Prometheus", "Debe escribir los datos completos");
    } else {
      try {
        const response = await fetch("http://192.168.0.3:3001/api/tarjetas", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            num_tarjeta: num_tarjeta,
            fecha_vencimiento: fecha_vencimiento,
            VIN: VIN,
            tipo_tarjeta: tipo_tarjeta,
            idusuario: idusuario,
          }),
        });

        const usu = {
          num_tarjeta: num_tarjeta,
          fecha_vencimiento: fecha_vencimiento,
          VIN: VIN,
          tipo_tarjeta: tipo_tarjeta,
          idusuario: idusuario,
        };

        const json = await response.json();

        console.log(json);
        const tarjeta = JSON.stringify(usu);
        await AsyncStorage.setItem("tarjeta", tarjeta);
        Alert.alert("Prometheus", "Tarjeta ingresada correctamente");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalTyT.titulo}>TARJETAS</Text>
        </View>
        <ScrollView style={styles.main}>
          <Text style={globalTyT.texto}>Numero de tarjeta: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setnum_tarjeta}
            keyboardType="number-pad"
            placeholder="Numero de tarjeta"
            placeholderTextColor="#ced4da"
            //maxLength={16}
          ></TextInput>
          <Text style={globalTyT.texto}>VIN:</Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setVIN}
            keyboardType="number-pad"
            placeholder="VIN"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <Text style={globalTyT.texto}>Tipo tarjeta: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={settipo_tarjeta}
            placeholder="Tipo de tarjeta"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <View style={styles.contenedorFecha}>
            <Text style={styles.fechaTexto}>Fecha de vencimiento: </Text>
            <Text style={styles.fechaTexto}>{chooseData}</Text>
          </View>
          <Pressable title="Show Date Picker" onPress={showDatePicker}>
            <LinearGradient
              style={globalBotones.boton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#E43E31", "#F4AA31"]}
            >
              <Text style={globalBotones.tituloBoton}>Elegir fecha</Text>
            </LinearGradient>
          </Pressable>
          <DateTimePickerModal
            onChange={this.onChange}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <StatusBar style="auto" />

          <View style={styles.contenedorBotones}>
            <Pressable onPress={() => navigation.replace("Usuarios")}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Cancelar</Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={IntroducirTarjeta}>
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
  contenedorFecha: {
    display: "flex",
    flexDirection: "row",
  },
  fechaTexto: {
    textAlign: "left",
    color: "#ed7731",
    fontSize: 20,
    fontFamily: "montserrat-bold",
  },
});
