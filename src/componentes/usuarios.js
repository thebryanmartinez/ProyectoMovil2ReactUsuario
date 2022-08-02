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
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalTyT } from "../styles/textoytitulo";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";
import { date } from "yup";

export default function App({ navigation }) {
  const [nombre_usuario, setNombre_Usuario] = useState(null);
  const [nombre_completo, setNombre_Completo] = useState(null);
  const [contrasena_encriptada, setContrasena_Encriptada] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [direccion_usuario, setDireccion_Usuario] = useState(false);

  const readData = async () => {
    try {
      var nombre = JSON.parse(await AsyncStorage.getItem("cliente_usuario"));
      var contrasena = JSON.parse(await AsyncStorage.getItem("contrasena"));
      var cliente = JSON.parse(await AsyncStorage.getItem("cliente"));
      var token = cliente.token;
      const response = await fetch(
        'http://192.168.0.3:3001/api/usuarios/?nombre_usuario=' + nombre , {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          
        });
      const json = await response.json();
      var id= json.idusuario;
      console.log(json);
      setNombre_Completo(json.nombre_completo);
      setNombre_Usuario(json.nombre_usuario);
      setContrasena_Encriptada(contrasena);
      setCorreo(json.correo);
      setTelefono(json.telefono);
      setDireccion_Usuario(json.direccion_usuario);

    } catch (error) {
      console.error(error);
    }
  };

  const eliminarUsuario = async() => {
    try {
      var nombre = JSON.parse(await AsyncStorage.getItem("cliente_usuario"));
    }  
      catch (error) {
        Alert.alert("Error al leer:" + error);
      }
    fetch("http://192.168.0.3:3001/api/usuarios/" + nombre, {
      method: "DELETE",
      
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
    Alert.alert("Eliminado", "El Usuario ha sido eliminado con exito");
    navigation.replace('Login') 
  
  }

  const ActualizarUsuario = async() => {
    try {
      var nombre = JSON.parse(await AsyncStorage.getItem("cliente_usuario"));
    }  
      catch (error) {
        Alert.alert("Error al leer:" + error);
      }
    fetch("http://192.168.0.3:3001/api/usuarios/?nombre_usuario=" + nombre, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        nombre_completo: nombre_completo,
        contrasena_encriptada: contrasena_encriptada,
        nombre_usuario: nombre_usuario,
        correo: correo,
        telefono: telefono,
        direccion_usuario: direccion_usuario,
      }),
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
    Alert.alert("Actualizado", "El Usuario ha sido Actualizado con exito");
  
  }
  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalTyT.titulo}>USUARIO</Text>
        </View>
        <ScrollView style={styles.main}>
          <Text style={globalTyT.texto}>Nombre completo: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setNombre_Completo}
            placeholderTextColor="#ced4da"
            placeholder="Nombre completo"

          >
            {nombre_completo}
          </TextInput>
          <Text style={globalTyT.texto}>Nombre de usuario: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setNombre_Usuario}
            placeholder="Nombre de usuario"
            placeholderTextColor="#ced4da"
          >
            {nombre_usuario}
          </TextInput>
          <Text style={globalTyT.texto}>Contraseña: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setContrasena_Encriptada}
            placeholder="Contraseña"
            placeholderTextColor="#ced4da"
          >
            {contrasena_encriptada}
          </TextInput>
          <Text style={globalTyT.texto}>Correo electronico: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setCorreo}
            placeholder="Correo electronico"
            keyboardType = "email-address"
            placeholderTextColor="#ced4da"
            maxLength={50}
          >
            {correo}
          </TextInput>
          <Text style={globalTyT.texto}>Telefono: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setTelefono}
            keyboardType = "numeric"
            placeholder="Telefono"
            placeholderTextColor="#ced4da"
            maxLength={10}
          >
            {telefono}
          </TextInput>
          <Text style={globalTyT.texto}>Direccion domiciliaria: </Text>
          <TextInput
            style={globalEntradas.entradaArea}
            maxLength={255}
            onChangeText={setDireccion_Usuario}
            placeholder="Direccion domiciliaria"
            placeholderTextColor="#ced4da"
            multiline={true}
          >
            {direccion_usuario}
          </TextInput>
          <View style={styles.contenedorBotones}>
            <Pressable onPress={readData}>
              <LinearGradient
                style={globalBotones.botonConMargen}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Llenar</Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={ActualizarUsuario}>
              <LinearGradient
                style={globalBotones.botonConMargen}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Modificar</Text>
              </LinearGradient>
            </Pressable>
          </View>
          <View style={styles.textoYBoton}>
            <Text style={globalTyT.texto}>Desea eliminar su usuario?</Text>
            <Pressable onPress={eliminarUsuario}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Eliminar</Text>
              </LinearGradient>
            </Pressable>
          </View>
          <View style={styles.textoYBoton}>
            <Text style={globalTyT.texto}>Ingresar tarjeta de credito</Text>
            <Pressable onPress={() => navigation.replace("Tarjetas")}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Ingresar tarjeta</Text>
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
  },
  textoYBoton: {
    marginTop: 50,
  },
});
