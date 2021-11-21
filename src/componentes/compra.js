import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient }  from 'expo-linear-gradient';

export default function App({ navigation }) {

  return (
    <SafeAreaView style={styles.fondo}>
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.titulo}>COMPRA</Text>
          </View>
          <ScrollView style={styles.main}>
            <View style={styles.contenedorImagen}>
              <Image source={require('../../assets/img/adidas3.jpg')}/>
            </View>
            <View style={styles.contenedorInfo}>
              <View style={styles.contenedores}>
                <Text style={styles.texto}>Nombre</Text>
                <Text style={styles.texto}>Marca</Text>
              </View>
              <View>

              </View>
              <View style={styles.contenedores}>
                <Text style={styles.texto}>Cantidad:</Text>
                <TextInput keyboardType='number-pad' placeholder='#' style={styles.entradaTexto} placeholderTextColor='#ced4da'/>
              </View>
              <View style={styles.contenedores}>
                <Text style={styles.texto}>Subtotal</Text>
                <Text style={styles.texto}>Impuesto</Text>
              </View>
              <View>
                <Text style={styles.texto}>Total</Text>
              </View>
              <Pressable>
                <LinearGradient
                style={styles.boton}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['#E43E31','#F4AA31']}
                >
                <Text style={styles.tituloBoton}>Comprar</Text>
                </LinearGradient>
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
    backgroundColor: '#072C50'
  },
  header: {
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'left',
    backgroundColor: '#154472'
  },
  main:{
    flex: 1, 
  },
  footer:{
    display: 'flex',
    backgroundColor: '#ed7731',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  texto: {
    textAlign: 'left',
    color: "#ed7731",
    fontSize: 24,
    fontFamily: 'montserrat-bold'
  },
  titulo: {
    color: "#ed7731",
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'montserrat-bold'
  },
  contenedorImagen: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorInfo: {
    margin: 20,
  },  
  contenedores: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boton: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  tituloBoton: {
    color: "#072C50",
    fontSize: 26,
    fontWeight: "700",
    fontFamily: 'montserrat-semibold',
  },
  entradaTexto: {
    fontFamily: 'montserrat-semibold',
    height: 32,
    fontSize: 20,
    paddingLeft: 5,
    color: "#495057",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#ed7731",
    color: '#ed7731',
  },
});