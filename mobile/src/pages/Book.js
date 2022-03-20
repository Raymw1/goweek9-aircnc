import React, { useState } from "react";
import {
  SafeAreaView,
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Book({ navigation }) {
  const [date, setDate] = useState("");
  const id = navigation.getParam("id");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user");
    await api.post(`/spots/${id}/bookings`, { date }, { headers: { user_id } });
    Alert.alert("Success on Booking! ;)");
    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATE *</Text>
      <TextInput
        style={styles.input}
        placeholder="When do you want your booking?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        autoFocus
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        activeOpacity={0.6}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    color: "#444",
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
