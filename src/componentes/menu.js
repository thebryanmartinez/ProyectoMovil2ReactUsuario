import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './login';
import registro from './registro';
import principal from './principal';
import producto from './productos';

const Stack = createNativeStackNavigator();
export default function menu(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={login} />
                <Stack.Screen name="Registro" component={registro} />
                <Stack.Screen name="Principal" component={principal} />
                <Stack.Screen name="Producto" component={producto} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}