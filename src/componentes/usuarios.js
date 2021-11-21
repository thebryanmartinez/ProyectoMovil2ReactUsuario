import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, Pressable, SafeAreaView, StatusBar, ScrollView, TextInput } from 'react-native';
import { LinearGradient }  from 'expo-linear-gradient';

export default function App({ navigation }) {

  const [nombre_completo, setNombre_Completo]= useState(null);
  const [contrasena_encriptada, setContrasena_Encriptada]= useState(null);
  const [nombre_usuario, setNombre_Usuario]= useState(null);
  const [correo, setCorreo]= useState(null);
  const [telefono, setTelefono]= useState(null);
  const [direccion_usuario, setDireccion_Usuario]= useState(false);
  
  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.tituloPrometheus}>USUARIO</Text>
          </View>
            <ScrollView style={styles.main}>
              <Text style={styles.texto}>Nombre completo: </Text>
              <TextInput style={styles.entradaTexto} onChangeText={setNombre_Completo} placeholderTextColor="#ced4da" placeholder='Nombre completo'></TextInput>
              <Text style={styles.texto}>Nombre de usuario: </Text>
              <TextInput style={styles.entradaTexto}  onChangeText={setNombre_Usuario} placeholder='Nombre de usuario' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Contraseña: </Text>
              <TextInput style={styles.entradaTexto}  onChangeText={setContrasena_Encriptada} placeholder='Contraseña' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Correo electronico: </Text>
              <TextInput style={styles.entradaTexto} onChangeText={setCorreo} placeholder='Correo electronico' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Telefono: </Text>
              <TextInput style={styles.entradaTexto} onChangeText={setTelefono} placeholder='Telefono' placeholderTextColor="#ced4da"></TextInput>
              <Text style={styles.texto}>Direccion domiciliaria: </Text>
              <TextInput style={styles.entradaArea} maxLength={255} onChangeText={setDireccion_Usuario} placeholder='Direccion domiciliaria' placeholderTextColor="#ced4da" multiline={true} ></TextInput>
              <Pressable style={styles.botones}  title="Modificar">
                    <Text style={styles.tituloBotones}>Modificar</Text>
              </Pressable>
              <View style={styles.eliminarUsuario}>
                <Text style={styles.texto}>Desea eliminar su usuario?</Text>
                <Pressable style={styles.botones}  title="Eliminar">
                    <Text style={styles.tituloBotones}>Eliminar</Text>
                </Pressable>
              </View>
            </ScrollView>
          <View> 
          <LinearGradient
          style={styles.footer}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#E43E31','#F4AA31']}
          >
          <Pressable onPress={() => navigation.replace('Principal')}>
            <Image source={require('../../assets/img/home.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.replace('Producto')}>
            <Image source={require('../../assets/img/search.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.replace('CarritoCompras')}>
            <Image source={require('../../assets/img/shoppingcart.png')}/>
          </Pressable>
          <Pressable onPress={() => navigation.replace('Usuarios')}>
            <Image source={require('../../assets/img/user.png')}/>
          </Pressable>
          </LinearGradient>
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
    },
    botones: {
      marginTop: 10,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 30,
      paddingRight: 30,
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
    entradaTexto: {
      fontFamily: 'montserrat-semibold',
      height: 32,
      fontSize: 20,
      marginTop: 10,
      marginBottom: 10,
      paddingLeft: 5,
      fontFamily: 'montserrat-semibold',
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
    tituloBotones: {
      color: "#072C50",
      fontSize: 26,
      fontWeight: "700",
    },
    eliminarUsuario: {
        marginTop: 50,
    },  
});
