import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Animal } from "../data/Animals";

interface Props {
  animal: Animal;
}

export default function AnimalCard({ animal }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{animal.name}</Text>
      <Text>{animal.type}</Text>
      <Text>{animal.age}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#e0f7fa",
    width: "90%",
    alignItems: "center",
  },
  name: { fontSize: 20, fontWeight: "bold" },
});
