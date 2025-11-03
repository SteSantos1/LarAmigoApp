import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Animal } from "../data/Animals";

interface Props {
  animal: Animal;
}

export default function AnimalCard({ animal }: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://place-puppy.com/200x200" }} // imagem de exemplo
        style={styles.image}
      />
      <Text style={styles.name}>{animal.name}</Text>
      <Text style={styles.info}>{animal.type} - {animal.age}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 5, color: "#00796b" },
  info: { fontSize: 16, color: "#004d40" },
});
