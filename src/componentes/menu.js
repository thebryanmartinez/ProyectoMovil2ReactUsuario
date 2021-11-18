import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './login';
import registro from './registro';
import principal from './principalUsuario';
import producto from './productos';
import usuarios from './usuarios';
import tarjetas from './tarjetas';
import ingresarProductos from './ingresarProductos';

const Stack = createNativeStackNavigator();
export default function menu(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Usuarios" component={usuarios} />
                <Stack.Screen name="IngresarProductos" component={ingresarProductos} />
                <Stack.Screen name="Tarjetas" component={tarjetas} />
                <Stack.Screen name="Principal" component={principal} />
                <Stack.Screen name="Login" component={login} />
                <Stack.Screen name="Registro" component={registro} />
                <Stack.Screen name="Producto" component={producto} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}