import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
  const cerrarSesion = async () =>{
    await AsyncStorage.removeItem('cliente');
    console.log("Sesion Cerrada");
    Alert.alert("Prometheus", "Sesion Cerrada");
  };
  
  return (
    <View style={styles.fondo}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.tituloPrometheus}>PROMETHEUS</Text>
            <View style={styles.headerbotones}>
            <Pressable>
                <Image source={require('../../assets/img/filtrar.png')}/>
            </Pressable>
            <Pressable onPress={() => navigation.replace('Login')}>
                <Image source={require('../../assets/img/exit.png')}/>
            </Pressable>
            </View>
          </View>
            <ScrollView style={styles.main}>
              <Image source={require('../../assets/img/adidas1.jpg')} styles={styles.imagen}/>
              <Image source={require('../../assets/img/adidas2.jpg')} styles={styles.imagen}/>
              <Image source={require('../../assets/img/adidas3.jpg')} styles={styles.imagen}/>
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
      </SafeAreaView>
    </View>
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
      marginLeft: 20,
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
    imagen: {
      marginTop: 20,
    },
    headerbotones: {
      display: 'flex',
      flexDirection: 'row',
    }
});