import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
  const [nombre_completo, setNombre_Completo]= useState(null);
  const [contrasena_encriptada, setContrasena_Encriptada]= useState(null);
  const [nombre_usuario, setNombre_Usuario]= useState(null);
  const [correo, setCorreo]= useState(null);
  const [telefono, setTelefono]= useState(null);
  const [direccion_usuario, setDireccion_Usuario]= useState(false);

  const pressCrearUsuario = async () => {
    if(!nombre_completo || !contrasena_encriptada || !nombre_usuario || !correo || !telefono || !direccion_usuario){
      console.log("Debe escribir los datos completos");
      Alert.alert("Prometheus", "Debe escribir los datos completos");
    }
    else{
      try {
        const response = await fetch('http://192.168.0.12:3001/api/usuarios', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre_completo: nombre_completo,
            contrasena_encriptada: contrasena_encriptada,
            nombre_usuario: nombre_usuario,
            contrasena_encriptada: contrasena,
            correo: correo,
            telefono: telefono,
            direccion_usuario: direccion_usuario
          })
        });
        const json = await response.json();
        console.log(json);
        if(json.data.length==0){
          console.log(json.msj);
          Alert.alert("Prometheus", json.msj);
        }
        else{
          const cliente=JSON.stringify(json.data);
          await AsyncStorage.setItem('cliente', cliente);
          console.log(json.msj);
          Alert.alert("Prometheus", json.msj);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.fondo}>
        <View style={styles.container}>
            <Text style={styles.tituloPrometheus}>PROMETHEUS</Text>
            <Text style={styles.texto}>Nombre completo: </Text>
            <TextInput style={styles.entradaTexto} onChangeText={setNombre_Completo} placeholder='Nombre completo'></TextInput>
            <Text style={styles.texto}>Nombre de usuario: </Text>
            <TextInput style={styles.entradaTexto}  onChangeText={setNombre_Usuario} placeholder='Nombre de usuario'></TextInput>
            <Text style={styles.texto}>Contraseña: </Text>
            <TextInput style={styles.entradaTexto}  onChangeText={setContrasena_Encriptada} placeholder='Contraseña'></TextInput>
            <Text style={styles.texto}>Correo electronico: </Text>
            <TextInput style={styles.entradaTexto} onChangeText={setCorreo} placeholder='Correo electronico'></TextInput>
            <Text style={styles.texto}>Telefono: </Text>
            <TextInput style={styles.entradaTexto} onChangeText={setTelefono} placeholder='Telefono'></TextInput>
            <Text style={styles.texto}>Direccion domiciliaria: </Text>
            <TextInput style={styles.entradaArea} maxLength={255} onChangeText={setDireccion_Usuario} placeholder='Direccion domiciliaria' multiline={true} ></TextInput>
            <View style={styles.contenedorBotones}>
                <Pressable style={styles.botones} title="Cancelar" onPress={() => navigation.replace('Login')}>
                    <Text style={styles.tituloBotones}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.botones}  title="Ingresar" /* onPress={pressCrearUsuario} */>
                    <Text style={styles.tituloBotones}>Ingresar</Text>
                </Pressable>
            </View>
        </View>
    </View>
  );    
}

const styles = StyleSheet.create({
    fondo: {
        backgroundColor: '#072C50',
        width:"100%",
        height:"100%"
    },
    container: {
    margin: 20,
    backgroundColor: '#072C50'
  },
  tituloPrometheus: {
      color: "#ed7731",
      fontSize: 40,
      fontWeight: "700",
      textAlign: 'center'
  },
  texto: {
      textAlign: 'left',
      color: "#ed7731",
      fontSize: 24,
      fontWeight: "700",
  },
  entradaTexto: {
      backgroundColor: '#fff',
      height: 32,
      marginTop: 10,
      marginBottom: 10
  },
  entradaArea: {
      backgroundColor: '#fff',
      height: 80,
      marginTop: 10,
      marginBottom: 10
  },
  contenedorBotones: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  botones: {
      marginTop: 10,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 5,
      backgroundColor: '#ed7731',
  },
  tituloBotones: {
    color: "#072C50",
    fontSize: 26,
    fontWeight: "700",
  }
});
