import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Image, TextInput, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const searchFilter = (text) => {
    if(text){
      
      const nuevaInfo = info.filter((item) => {
        const itemData = item.nombre_producto ? item.nombre_producto.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1; 
      });
      
      setinfo(nuevaInfo);
      setSearch(text);
    } else {
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
      setinfo(info);
      setSearch(text);
    }
  }

  return (
    <SafeAreaView style={styles.fondo}>
        <View style={styles.container}>
          <View style={styles.header}>
              <Image source={require('../../assets/img/busqueda.png')}/>
              <TextInput style={styles.busqueda} placeholder='Buscar producto' placeholderTextColor='#ed7731'
               value={search} underlineColorAndroid="transparent" onChangeText={(text) => searchFilter(text)}/>
          </View>
          <View style={styles.main}>
            <View>
            <FlatList
              numColumns={2}
              style={styles.productos}
              data={info}
              keyExtractor={(item) => item.idproductos}
              renderItem={({item}) => {
                return(
                  <Pressable style={styles.contenedorFuera}>
                    <View style={styles.contenedorDentro}>
                      <View style={styles.contenedorImagen}>
                        <Image source={require('../../assets/img/adidas3.jpg')} style={styles.imagen}/>
                      </View>
                      <View style={styles.contenedorInfo}>
                        <Text style={styles.productoNombre}>{item.nombre_producto}</Text>                        
                        <Text style={styles.productoMarca}>{item.marca_producto}</Text>      
                        <Text style={styles.productoPrecio}>L. {item.costo}</Text>
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
  productosTexto: {
    color: '#ed7731',
    fontSize: 18,
  },
  contenedorFuera: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#eee'
  },
  tituloPrometheus: {
    color: "#ed7731",
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'montserrat-bold'
  },
  busqueda:{
    fontSize: 18,
    fontFamily: 'montserrat-semibold',
    paddingLeft: 5,
    width: '85%',
    marginLeft: 10,
  },
  contenedorDentro: {
    margin: 10,
  },
  contenedorImagen: {
    flex: 1,
  },
  imagen: {
    width: '100%',
  },
  productoNombre: {
    textAlign: 'left',
    color: "#ed7731",
    fontSize: 18,
    fontFamily: 'montserrat-semibold'
  },
  productoMarca: {
    marginTop: 5,
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
});