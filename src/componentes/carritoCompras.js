import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, StatusBar, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {  
    const [info, setinfo] = useState([]);
    const [ejecucion, setEjecucion] = useState(null);
    const [search, setSearch] = useState('');
  
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
    }

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.tituloPrometheus}>COMPRAS</Text>
        </View>
        <View style={styles.main}>
            <View>
            <FlatList
              numColumns={1}
              style={styles.productos}
              data={info}
              keyExtractor={(item) => item.idproductos}
              renderItem={({item}) => {
                return(
                  <Pressable style={styles.contenedorFuera}>
                    <View style={styles.contenedorDentro}>
                      <View style={styles.contenedorImagen}>
                        <Image source={require('../../assets/img/user.png')} style={styles.imagen}/>
                      </View>
                      <View style={styles.contenedorInfo}>
                        <Text style={styles.productoNombre}>{item.nombre_producto}</Text>                        
                        <Text style={styles.productoPrecio}>L. {item.costo}</Text>
                      </View>
                      <View styles={styles.contenedorBoton}>
                        <Pressable style={styles.eliminar}>
                            <Image source={require('../../assets/img/shoppingcart_error.png')}/>
                        </Pressable>
                      </View>
                    </View>
                  </Pressable>
                )
              }
              }
            />
            </View>
          </View>
        <View style={styles.footer}> 
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
    backgroundColor: '#072C50',
    marginTop: StatusBar.currentHeight,
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
  tituloPrometheus: {
    color: "#ed7731",
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'montserrat-bold'
  },
  contenedorFuera: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
  },
  contenedorDentro: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorInfo:{
    display: 'flex',
    flexGrow: 1
  },
  contenedorImagen: {
    flex: 1,
    flexGrow: 2
  },
  imagen: {
    
  },
  productoNombre: {
    textAlign: 'left',
    color: "#ed7731",
    fontSize: 18,
    fontFamily: 'montserrat-semibold'
  },
  productoPrecio: {
    marginTop: 15,
    textAlign: 'left',
    color: "#ed7731",
    fontSize: 20,
    fontFamily: 'montserrat-bold'
  },
  eliminar:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: '#ED553B',
  },
});
