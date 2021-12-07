import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from "./login";
import registro from "./registro";
import principal from "./principalUsuario";
import productos from "./productos";
import usuarios from "./usuarios";
import tarjetas from "./tarjetas";
import carritoCompras from "./carritoCompras";
import compras from "./compra";
import productosAccesorios from "./productosAccesorios";
import productosJoggers from "./productosJoggers";
import productosCamisas from "./productosCamisas";
import productosSneakers from "./productosSneakers";
import correo from "./correo";
import compraRealizada from "./compraRealizada";

const Stack = createNativeStackNavigator();
export default function menu() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Producto" component={productos} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Principal" component={principal} />
        <Stack.Screen name="CompraRealizada" component={compraRealizada} />
        <Stack.Screen name="Compra" component={compras} />
        <Stack.Screen name="Correo" component={correo} />
        <Stack.Screen name="ProductosSneakers" component={productosSneakers} />
        <Stack.Screen name="ProductosCamisas" component={productosCamisas} />
        <Stack.Screen name="ProductosJoggers" component={productosJoggers} />
        <Stack.Screen name="ProductosAccesorios" component={productosAccesorios} />
        <Stack.Screen name="Tarjetas" component={tarjetas} />
        <Stack.Screen name="Usuarios" component={usuarios} />
        <Stack.Screen name="Registro" component={registro} />     
        <Stack.Screen name="CarritoCompras" component={carritoCompras} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
