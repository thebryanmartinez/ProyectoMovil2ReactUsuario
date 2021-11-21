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
          ></TextInput>
          <Text style={globalTyT.texto}>Nombre de usuario: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setNombre_Usuario}
            placeholder="Nombre de usuario"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <Text style={globalTyT.texto}>Contraseña: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setContrasena_Encriptada}
            placeholder="Contraseña"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <Text style={globalTyT.texto}>Correo electronico: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setCorreo}
            placeholder="Correo electronico"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <Text style={globalTyT.texto}>Telefono: </Text>
          <TextInput
            style={globalEntradas.entradaTexto}
            onChangeText={setTelefono}
            placeholder="Telefono"
            placeholderTextColor="#ced4da"
          ></TextInput>
          <Text style={globalTyT.texto}>Direccion domiciliaria: </Text>
          <TextInput
            style={globalEntradas.entradaArea}
            maxLength={255}
            onChangeText={setDireccion_Usuario}
            placeholder="Direccion domiciliaria"
            placeholderTextColor="#ced4da"
            multiline={true}
          ></TextInput>
          <Pressable>
            <LinearGradient
              style={globalBotones.boton}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#E43E31", "#F4AA31"]}
            >
              <Text style={globalBotones.tituloBoton}>Modificar</Text>
            </LinearGradient>
          </Pressable>
          <View style={styles.eliminarUsuario}>
            <Text style={globalTyT.texto}>Desea eliminar su usuario?</Text>
            <Pressable>
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
  eliminarUsuario: {
    marginTop: 50,
  },
});
