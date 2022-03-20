import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SpotList from "../components/SpotList";

import logo from "../../assets/logo.png";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("techs").then((storagedTechs) => {
      const techsArray = storagedTechs.split(",").map((tech) => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} alt="AirCnC" />
      <ScrollView>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: Platform.OS === "ios" ? 10 : 30,
  },
});
