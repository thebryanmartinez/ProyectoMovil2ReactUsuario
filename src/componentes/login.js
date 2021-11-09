import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function login({ navigation }) {
  const [usuario, setUsuario]= useState(null);
  const [contrasena, setContrasena]= useState(null);
  const [focusNombre, setFocusNombre]= useState(false);

  const presIniciarSesion = async () => {
    if(!usuario || !contrasena){
      console.log("Debe escribir los datos completos");
      Alert.alert("Prometheus", "Debe Escribir los datos completos");
    }
    else{
      try {
        const response = await fetch('http://192.168.0.12:3001/api/autenticacion/iniciosesion/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre_usuario: usuario,
            contrasena_encriptada: contrasena
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
  const verAlmacenamiento = async () => {
    var cliente = JSON.parse(await AsyncStorage.getItem('cliente'));
    if(!cliente){
      console.log("Usuario no autenticado");
      Alert.alert("Prometheus", "Usuario no autenticado");
    }
    else{
      var token = cliente.token;
      console.log('Bearer ' + token)
      try {
        const response = await fetch('http://192.168.0.12:3001/api/productos/listar', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        });
        const json = await response.json();
        console.log(json);
        if(json.data.length==0){
          Alert.alert("Prometheus", json.msj);
        }
        else{
          Alert.alert("Prometheus", json.msj);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const cerrarSesion = async () =>{
    await AsyncStorage.removeItem('cliente');
    console.log("Sesion Cerrada");
    Alert.alert("Prometheus", "Sesion Cerrada");
  };
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorLogin}>
        <View style={styles.contenedorTitulo}>
          <Text style={styles.tituloLogin}>PROMETHEUS</Text>
        </View>
        <View style={[styles.contenedorControles, styles.sombraControles]}>
          <View style={styles.controles}>
            <Text style={styles.texto}>Ingrese su usuario:
            </Text>
            <TextInput
              value={usuario}
              onChangeText={setUsuario}
              placeholder="Escriba el usuario o correo"
              style={styles.entradas}
              autoFocus={focusNombre}
            >
            </TextInput>
            <Text style={styles.texto}>Ingrese su contraseña:
            </Text>
            <TextInput
              value={contrasena}
              onChangeText={setContrasena}
              placeholder="Escriba la contraseña"
              style={styles.entradas}
              passwordRules=""
              secureTextEntry={true}
            >
            </TextInput>
          </View>
          <View style={styles.contenedorBotones}>
            <View style={styles.boton}>
              <Button title="Iniciar Sesión"
                onPress={presIniciarSesion}
              ></Button>
            </View>
            <View style={styles.boton}>
              <Button title="Cerrar"
                onPress={verAlmacenamiento}
              ></Button>
            </View>
          </View>
          <View style={styles.contenedorBotonesRedes}>
            <View style={styles.botonRedes}>
              <Text style={styles.texto}>No esta registrado?</Text>
            </View>
            <View style={styles.botonRedes}>
              <Button
                title="Registrese aquí" color="#ed7731"
                onPress={() => navigation.replace('Registro')}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#072C50',
    alignItems: 'center',
    justifyContent: "center",
    margin:0,
    padding: 20,
    width:"100%",
    height:"100%",
  },
  contenedorLogin: {
    alignItems: "stretch",
    justifyContent: 'center',
    height: 530,
    width: 360,
  },
  contenedorTitulo: {
    flex: 1,
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  contenedorControles: {
    flex: 3,
    flexDirection:"column",
    alignItems: "stretch",
    justifyContent:"center",
    padding:10,
  },
  texto:{
    fontFamily: 'montserrat-bold',
    color: "#ed7731" ,
    fontSize: 18,
    textAlign: "center"
  },
  tituloLogin: {
    color: "#ed7731" ,
    fontFamily: 'montserrat-bold',
    fontSize: 40,
    fontWeight: "600"
    },
  controles:{
    flex:4,
    marginBottom: 10,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
  },
  contenedorBotones:{
    flex:1,
    padding: 10,
    justifyContent:"space-evenly",
    flexDirection: "row",
  },
  contenedorBotonesRedes:{
    flex:2,
    padding: 10,
    justifyContent:"space-evenly",
    flexDirection: "column",
  },
  boton:{
    flex:1,
    alignItems:"stretch",
    marginLeft:10,
    marginRight:10,
  },
  botonRedes:{
    flex:1,
    alignItems:"stretch",
    margin:5,
  },
  entradas:{
    fontFamily: 'montserrat-semibold',
    flex:1,
    alignItems:"stretch",
    margin:10,
    padding:10,
    fontSize: 20,
    fontWeight:"400",
    color: "#495057",
    backgroundColor:"#fff",
    borderWidth:1,
    borderStyle:"solid",
    borderColor: "#ced4da",
    borderRadius: 15,
  }
});