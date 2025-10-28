import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import AnimalCard from "../components/AnimalCard";
import { animals } from "../data/Animals";

export default function Adoption() {
  return (
    <View style={styles.container}>
      <FlatList
        data={animals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AnimalCard animal={item} />}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
});
