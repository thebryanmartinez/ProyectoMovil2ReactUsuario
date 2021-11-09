import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Pressable, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
 /* const [nombre_completo, setNombre_Completo]= useState(null);
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
      } catch (error) {
        console.error(error);
      }
    }
  };
*/
  const [info, setInfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  
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
        const response = await fetch('http://192.168.1.165:3001/api/productos/listar', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        });
        const json = await response.json();
        console.log(json);
        JSON.stringify(json);
        var mydata = JSON.parse(json);
        alert(mydata[3].idproducto); 
        alert(mydata[6].nombre_producto);
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
  
  return (
    <View style={styles.fondo}>
        <View style={styles.container}>
            <Text styles={styles.texto}>Hola</Text>
            <Pressable onPress={verAlmacenamiento}>
                <Text>HOLA</Text>
            </Pressable>
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
    backgroundColor: 'red'
  },
  tituloPrometheus: {
      color: "#ed7731",
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
      backgroundColor: '#fff',
      fontFamily: 'montserrat-semibold',
      height: 32,
      marginTop: 10,
      marginBottom: 10
  },
  entradaArea: {
      backgroundColor: '#fff',
      fontFamily: 'montserrat-semibold',
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