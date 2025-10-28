import React from "react";
import { View, Text, StyleSheet, Linking, Button } from "react-native";

export default function Contact() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Entre em contato conosco 📞</Text>
      <Button title="Enviar e-mail" onPress={() => Linking.openURL("mailto:contato@laramigo.org")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  text: { fontSize: 18, marginBottom: 20 },
});
