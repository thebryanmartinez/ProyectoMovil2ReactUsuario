import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Login from './src/componentes/login';


export default function App() {
  const [usuario, setUsuario]= useState(null);
  return (
    <Login></Login>
  );
}
