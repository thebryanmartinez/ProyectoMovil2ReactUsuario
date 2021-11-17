import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Pressable, SafeAreaView, StatusBar, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {

  const [nombre_completo, setNombre_Completo]= useState(null);
  const [contrasena_encriptada, setContrasena_Encriptada]= useState(null);
  const [nombre_usuario, setNombre_Usuario]= useState(null);
  const [correo, setCorreo]= useState(null);
  const [telefono, setTelefono]= useState(null);
  const [direccion_usuario, setDireccion_Usuario]= useState(false);

  const cerrarSesion = async () =>{
    await AsyncStorage.removeItem('cliente');
    console.log("Sesion Cerrada");
    Alert.alert("Prometheus", "Sesion Cerrada");
  };
  
  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.tituloPrometheus}>TARJETAS</Text>
            <Pressable onPress={() => navigation.replace('Login')}>
                <Image source={require('../../assets/img/exit.png')}/>
            </Pressable>
          </View>
            <ScrollView style={styles.main}>
              <Text style={styles.texto}>Numero de tarjeta: </Text>
              <TextInput style={styles.entradaTexto} onChangeText={setNombre_Completo} placeholder='Numero de tarjeta'></TextInput>
              <Text style={styles.texto}>VIN: </Text>
              <TextInput style={styles.entradaTexto}  onChangeText={setNombre_Usuario} placeholder='VIN'></TextInput>
              <Text style={styles.texto}>Tipo tarjeta: </Text>
              <TextInput style={styles.entradaTexto}  onChangeText={setContrasena_Encriptada} placeholder='Tipo de tarjeta'></TextInput>
              <Text style={styles.texto}>Fecha de vencimiento: </Text>
              <TextInput style={styles.entradaTexto} onChangeText={setCorreo} placeholder='Fecha de vencimiento'></TextInput>
              <View style={styles.contenedorBotones}>
                <Pressable style={styles.botones} title="Cancelar" onPress={() => navigation.replace('Login')}>
                    <Text style={styles.tituloBotones}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.botones}  title="Ingresar" >
                    <Text style={styles.tituloBotones}>Ingresar</Text>
                </Pressable>
              </View>
            </ScrollView>
          <View style={styles.footer}> 
            <Pressable onPress={() => navigation.replace('Principal')}>
                <Image source={require('../../assets/img/home.png')}/>
            </Pressable>
            <Pressable onPress={() => navigation.replace('Producto')}>
                <Image source={require('../../assets/img/search.png')}/>
            </Pressable>
            <Pressable onPress={() => navigation.replace('Usuarios')}>
            <Image source={require('../../assets/img/user.png')}/>
            </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );    
}

const styles = StyleSheet.create({
    fondo: {
      backgroundColor: '#072C50',
      flex: 1,
    },
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      backgroundColor: '#072C50'
    },
    header: {
      display: 'flex',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'left',
      backgroundColor: '#154472'
    },
    main:{
      display: 'flex',
      marginTop: 25, 
      margin: 20,
    },
    footer:{
      display: 'flex',
      backgroundColor: '#ed7731',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    tituloPrometheus: {
      color: "#ed7731",
      fontSize: 24,
      textAlign: 'left',
      fontFamily: 'montserrat-bold'
    },
    texto: {
      textAlign: 'left',
      color: "#ed7731",
      fontSize: 24,
      fontFamily: 'montserrat-bold'
    },
    entradaTexto: {
      backgroundColor: '#fff',
      fontFamily: 'montserrat-semibold',
      height: 32,
      marginTop: 10,
      marginBottom: 10
    },
    contenedorBotones: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
    },
    botones: {
      marginTop: 10,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 35,
      paddingRight: 35,
      borderRadius: 5,
      backgroundColor: '#ed7731',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tituloBotones: {
      color: "#072C50",
      fontSize: 26,
      fontWeight: "700",
    },

});
