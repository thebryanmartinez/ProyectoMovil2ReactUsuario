import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function padding(a, b, c, d){
    return{
        paddingTop: a,
        paddingRight: b ? b : a,
        paddingBottom: c ? c : a,
        paddingLeft: d ? d : (b ? b : a)
    }
}

export default function App() {

  return (
    <View style={styles.fondo}>
        <View style={styles.container}>
            <Text style={styles.tituloPrometheus}>PROMETHEUS</Text>
            <Text style={styles.texto}>Nombre completo: </Text>
            <TextInput style={styles.entradaTexto} placeholder='Nombre completo'></TextInput>
            <Text style={styles.texto}>Nombre de usuario: </Text>
            <TextInput style={styles.entradaTexto} placeholder='Nombre de usuario'></TextInput>
            <Text style={styles.texto}>Contraseña: </Text>
            <TextInput style={styles.entradaTexto} placeholder='Contraseña'></TextInput>
            <Text style={styles.texto}>Correo electronico: </Text>
            <TextInput style={styles.entradaTexto} placeholder='Correo electronico'></TextInput>
            <Text style={styles.texto}>Telefono: </Text>
            <TextInput style={styles.entradaTexto} placeholder='Telefono'></TextInput>
            <Text style={styles.texto}>Direccion domiciliaria: </Text>
            <TextInput style={styles.entradaArea} maxLength={255} placeholder='Direccion domiciliaria' multiline={true} ></TextInput>
            <View style={styles.contenedorBotones}>
                <Pressable style={styles.botones} title="Cancelar">
                    <Text style={styles.tituloBotones}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.botones}  title="Ingresar">
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
    margin: '20px',
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
      height: '32px',
      marginTop: '10px',
      marginBottom: '10px'
  },
  entradaArea: {
      backgroundColor: '#fff',
      height: '80px',
      marginTop: '10px',
      marginBottom: '10px'
  },
  contenedorBotones: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  botones: {
      marginTop: '10px',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '30px',
      paddingRight: '30px',
      borderRadius: '5px',
      backgroundColor: '#ed7731',
  },
  tituloBotones: {
    color: "#072C50",
    fontSize: 26,
    fontWeight: "700",
  }
});
