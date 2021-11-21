import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Pressable, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient }  from 'expo-linear-gradient';

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
        var cliente = JSON.parse(await AsyncStorage.getItem('cliente'));
        var token = cliente.token;

        const response = await fetch('http://192.168.1.165:3001/api/usuarios', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token, 
            },

          body: JSON.stringify({
            nombre_completo: nombre_completo,
            contrasena_encriptada: contrasena_encriptada,
            nombre_usuario: nombre_usuario,
            correo: correo,
            telefono: telefono,
            direccion_usuario: direccion_usuario
          })
        });
        Alert.alert('Prometheus', 'Usuario ingresado correctamente');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.fondo}>
        <ScrollView style={styles.container}>
            <Text style={styles.tituloPrometheus}>PROMETHEUS</Text>
              <View style={styles.main}>
              <Text style={styles.texto}>Nombre completo: </Text>
              <TextInput style={styles.entradaTexto} onChangeText={setNombre_Completo} placeholder='Nombre completo' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Nombre de usuario: </Text>
              <TextInput style={styles.entradaTexto}  onChangeText={setNombre_Usuario} placeholder='Nombre de usuario' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Contraseña: </Text>
              <TextInput style={styles.entradaTexto}  onChangeText={setContrasena_Encriptada} placeholder='Contraseña' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Correo electronico: </Text>
              <TextInput style={styles.entradaTexto}  keyboardType='email-address' onChangeText={setCorreo} placeholder='Correo electronico' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Telefono: </Text>
              <TextInput style={styles.entradaTexto} keyboardType='number-pad' onChangeText={setTelefono} placeholder='Telefono' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Direccion domiciliaria: </Text>
              <TextInput style={styles.entradaArea} maxLength={255} onChangeText={setDireccion_Usuario} placeholder='Direccion domiciliaria' placeholderTextColor="#ced4da" multiline={true} ></TextInput>
            </View> 
            <View style={styles.contenedorBotones}>
                <Pressable onPress={() => navigation.replace('Login')}>
                <LinearGradient
                style={styles.botones}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['#E43E31','#F4AA31']}
                >
                </LinearGradient>
                  <Text style={styles.tituloBotones}>Cancelar</Text>
                </Pressable>
                <Pressable onPress={pressCrearUsuario} >
                  <LinearGradient
                  style={styles.boton}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#E43E31','#F4AA31']}
                  >
                    <Text style={styles.tituloBotones}>Ingresar</Text>
                  </LinearGradient>
                </Pressable>
            </View>
        </ScrollView>
    </SafeAreaView>
  );    
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: '#072C50',
    flex: 1
  },
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#072C50'
  },
  main:{
    marginTop: 40,
    display: 'flex',
  },
  tituloPrometheus: {
    color: "#ed7731",
    marginTop: 20,
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'montserrat-bold'
  },
  texto: {
    textAlign: 'left',
    color: "#ed7731",
    fontSize: 24,
    fontFamily: 'montserrat-bold'
  },
  entradaTexto: {
    fontFamily: 'montserrat-semibold',
    height: 32,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    color: "#495057",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#ed7731",
    color: '#ed7731',
  },
  entradaArea: {
    fontFamily: 'montserrat-semibold',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    fontSize: 20,
    color: "#495057",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#ed7731",
    color: '#ed7731',
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
    fontFamily: 'montserrat-semibold',
  }
});
