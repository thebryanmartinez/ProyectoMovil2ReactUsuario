import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, Pressable, SectionList, ListItem, FlatList, ScrollView} from 'react-native';
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
  };*/

  const SECTIONS = [
      {
          title: "Made for you",
          data: [
              {
                key: "1",
                text: "Item text 1",
                uri: "https://picsum.photos/id/1/200",    
              },
              {
                key: "2",
                text: "Item text 2",
                uri: "https://picsum.photos/id/10/200",    
              },
          ]
      }
  ];
  return (
    <View style={styles.fondo}>
            <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={styles.tituloPrometheus}>PROMETHEUS</Text>
                </View>
            <ScrollView>
                <View style={styles.main}>
                    <Text style={styles.texto}>Camisas</Text>
                    {/*
                    <SectionList contentContainerStyle={{ paddingHorizontal: 10}}
                    stickySectionHeadersEnabled={false}
                    sections={SECTIONS}
                    renderSectionHeader={({ section }) => (
                        <>
                        <Text style={styles.texto}>{section.title}</Text>
                        <FlatList data={section.data}
                        horizontal
                        renderItem={({ item }) => {
                            return <ListItem item={item}/>
                        }}/>
                        </>
                    )}
                    renderItem={({ item, section }) => {
                        return <ListItem item={item} />
                    }}
                    />*/}
                </View>
            </ScrollView>
            <View style={styles.footer}> 
                <Pressable onPress={() => navigation.replace('Login')}>
                    <Image source={require('../../assets/img/home.png')}/>
                </Pressable>
                <Pressable>
                    <Image source={require('../../assets/img/search.png')}/>
                </Pressable>
                <Pressable onPress={() => navigation.replace('Producto')}>
                <Image source={require('../../assets/img/user.png')}/>
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
        flex: 1,
        marginTop: 20,
        backgroundColor: '#072C50'
    },
    header: {
        padding: 20,
        textAlign: 'left',
        backgroundColor: '#154472'
    },
    main:{
        marginTop: 20, 
        marginLeft: 20,
    },
    footer:{
        display: 'flex',
        backgroundColor: '#ed7731',
        padding: 20,
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
    },
    tituloBotones: {
    color: "#072C50",
    fontSize: 26,
    fontWeight: "700",
    }
});
