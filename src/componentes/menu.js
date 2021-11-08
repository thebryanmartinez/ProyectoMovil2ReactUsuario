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
            <Stack.Navigator>
                <Stack.Screen name="Login" component={login} options= {({ navigation }) => ({
                    headerRight: () => (
                        <Button onPress={() => navigation.navigate('Login')}title="Iniciar sesion" />


                    ),
                })}
                />
                <Stack.Screen name="Registro" component={registro} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}