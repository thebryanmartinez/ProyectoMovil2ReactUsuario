import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

const options = [
  "Seleccione una opción",
  "Camisas",
  "Joggers",
  "Accesorios",
  "Sneakers",
];
const WIDHT = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const ModalPicker = (props) => {
  const onPressItem = (option) => {
    props.changeModalVisibility(false);
    props.setData(option);
  };
  const option = options.map((item, index) => {
    return (
      <TouchableOpacity
        style={style.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={style.text}>{item}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      onPress={() => props.changeModalVisibility(false)}
      style={style.container}
    >
      <View style={[style.modal, { width: WIDHT - 20, height: HEIGHT / 2 }]}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  option: {
    alignItems: "flex-start",
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export { ModalPicker };
