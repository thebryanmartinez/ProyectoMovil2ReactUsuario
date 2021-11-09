import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Button } from 'react-native';
import login from './login';
import registro from './registro';

const Stack = createNativeStackNavigator();
export default function menu(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={login} />
                <Stack.Screen name="Registro" component={registro} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}