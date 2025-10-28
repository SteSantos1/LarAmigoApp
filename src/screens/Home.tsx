import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Lar Amigo 🐶🐱</Text>
      <Button title="Sobre a ONG" onPress={() => navigation.navigate("About")} />
      <Button title="Adoção" onPress={() => navigation.navigate("Adoption")} />
      <Button title="Contato" onPress={() => navigation.navigate("Contact")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
});
