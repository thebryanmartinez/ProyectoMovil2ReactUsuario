import React, { useState } from "react";
import * as Font from "expo-font";
import Menu from "./src/componentes/menu";
import AppLoading from "expo-app-loading";

const getFonts = () =>
  Font.loadAsync({
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return <Menu />;
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}
