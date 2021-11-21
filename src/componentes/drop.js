import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState }  from 'react'; 
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment";



const App =()=>  {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  var Fecha = new Date();
  var FechaFormato;

  onChange = fecha =>
  {
    this.setState({fecha:fecha});
  }

  Mostrar = fecha=> 
  {
    Fecha = fecha;
    FechaFormato = Fecha.getFullYear() + "-" + (Fecha.getMonth()+1)+ "-" +  Fecha.getDate();
    alert(FechaFormato);

  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
    Mostrar(date);
  };

  return (
    <View style={styles.container}>
      <Text>Holaaa perros</Text>
      <TextInput />
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        onChange ={this.onChange}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;