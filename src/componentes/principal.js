import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, SectionList, ListItem, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withSafeAreaInsets } from 'react-native-safe-area-context';


export default function App({ navigation }) {

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
  
    const [info, setinfo] = useState([]);
    const [ejecucion, setEjecucion] = useState(null);

    if(ejecucion==null){
      try {
          const response = fetch("http://192.168.1.165:3001/api/productos/listar2")
          .then((response) => response.json())
          .then((json) => {
              setinfo(json);
              console.log(json);
          });
          setEjecucion(false);
      } 
      catch (error) {
          setEjecucion(false);
          console.error(error);
      }
    };

    const cerrarSesion = async () =>{
      await AsyncStorage.removeItem('cliente');
      console.log("Sesion Cerrada");
      Alert.alert("Prometheus", "Sesion Cerrada");
    };

  return (
    <View style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.tituloPrometheus}>PROMETHEUS</Text>
            <Pressable onPress={() => navigation.replace('Login')}>
                <Image source={require('../../assets/img/exit.png')}/>
            </Pressable>
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
            <Pressable >
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
    },
    productosTexto: {
      color: '#ed7731',
      fontSize: 18,
    },
    contenedorInfo: {
      marginRight: 10,
      marginBottom: 20,
    },
    imagen: {
      marginTop: 20,
    }
});
