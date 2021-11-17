import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, Image, ScrollView, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({ navigation }) {
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
  }

  return (
    <SafeAreaView style={styles.fondo}>
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.tituloPrometheus}>PROMETHEUS</Text>
              <Pressable onPress={() => navigation.replace('Login')}>
                  <Image source={require('../../assets/img/exit.png')}/>
              </Pressable>
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
                        <View style={styles.contenedorInfo}>
                          <Text style={styles.productosTexto}>Nombre: {item.nombre_producto}</Text>
                          <Text style={styles.productosTexto}>Cantidad: {item.cantidad_producto}</Text>
                          <Text style={styles.productosTexto}>Precio producto: {item.precio_producto}</Text>
                          <Text style={styles.productosTexto}>Marca producto: {item.marca_producto}</Text>
                          <Text style={styles.productosTexto}>categoria producto: {item.idcategorias}</Text>
                          <Text style={styles.productosTexto}>Id talla: {item.idtallas}</Text>
                          <Text style={styles.productosTexto}>Costo: {item.costo}</Text>
                        </View>
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
          <Pressable >
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
    justifyContent: 'space-between',
    textAlign: 'left',
    backgroundColor: '#154472'
  },
  main:{
    flex: 1,
    marginTop: 20, 
    marginLeft: 20,
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
  contenedorInfo: {
    marginRight: 10,
    marginBottom: 20,
  },
  tituloPrometheus: {
    color: "#ed7731",
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'montserrat-bold'
  },
});