import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../screens/FavoriteContext"; // Ajuste o caminho

export default function Favorites() {
  const navigation = useNavigation();
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  const handleRemoveFavorite = (petId: string) => {
    Alert.alert(
      "Remover dos Favoritos",
      "Tem certeza que deseja remover este pet dos favoritos?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          style: "destructive",
          onPress: () => removeFavorite(petId)
        }
      ]
    );
  };

  const handleClearAllFavorites = () => {
    if (favorites.length === 0) return;
    
    Alert.alert(
      "Limpar Favoritos",
      "Tem certeza que deseja remover todos os pets dos favoritos?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Limpar Tudo", 
          style: "destructive",
          onPress: () => clearFavorites()
        }
      ]
    );
  };

  // Pets disponíveis para sugestão
  const availablePets = [
    { id: "1", name: "Thor", info: "2 anos, Médio", src: require("../screens/img/Thor.png") },
    { id: "2", name: "Luna", info: "1 ano, Pequeno", src: require("../screens/img/gato.png") },
    { id: "3", name: "Tobby", info: "8 meses, Pequeno", src: require("../screens/img/yorkshire.png") },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Ionicons name="heart" size={20} color="#b563c5ff" />
          <Text style={styles.headerTitle}>Favoritos</Text>
        </View>
        {favorites.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearAllFavorites}
          >
            <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
          </TouchableOpacity>
        )}
      </View>

      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="heart" size={40} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Seus Pets Favoritos</Text>
          <Text style={styles.bannerSubtitle}>
            {favorites.length > 0 
              ? `Você tem ${favorites.length} ${favorites.length === 1 ? 'pet favorito' : 'pets favoritos'}`
              : "Nenhum pet favorito ainda"
            }
          </Text>
        </View>
      </LinearGradient>

      {/* Lista de Favoritos */}
      <View style={styles.favoritesSection}>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={60} color="#ccc" />
            <Text style={styles.emptyStateTitle}>Nenhum Favorito</Text>
            <Text style={styles.emptyStateText}>
              Você ainda não adicionou nenhum pet aos favoritos.
            </Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Home' as never)}
            >
              <Text style={styles.exploreButtonText}>Explorar Pets</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Seus Favoritos</Text>
              <Text style={styles.favoritesCount}>
                {favorites.length} {favorites.length === 1 ? 'pet' : 'pets'}
              </Text>
            </View>

            <View style={styles.favoritesGrid}>
              {favorites.map((pet) => (
                <View key={pet.id} style={styles.favoriteCard}>
                  <Image source={pet.src} style={styles.petImage} />
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => handleRemoveFavorite(pet.id)}
                  >
                    <Ionicons name="heart" size={18} color="#FF6B6B" />
                  </TouchableOpacity>
                  <View style={styles.petInfo}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petDetails}>{pet.info}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.adoptButton}
                    onPress={() => navigation.navigate('Adoption' as never)}
                  >
                    <Text style={styles.adoptButtonText}>Quero Adotar</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      {/* ... resto do código */}
    </ScrollView>
  );
}

// ... styles permanecem os mesmos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#debcebff",
  },
  header: {
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  clearButton: {
    padding: 8,
  },
  headerRightPlaceholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    borderRadius: 16,
    margin: 20,
    padding: 25,
    alignItems: "center",
  },
  bannerContent: {
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
  favoritesSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  favoritesCount: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  exploreButton: {
    backgroundColor: "#b563c5ff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  favoritesGrid: {
    gap: 16,
  },
  favoriteCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 6,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
  },
  petInfo: {
    flex: 1,
    marginLeft: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 12,
    color: "#666",
  },
  adoptButton: {
    backgroundColor: "#b563c5ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  adoptButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  suggestionsSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  suggestionsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  suggestionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  suggestionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    width: 120,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  suggestionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  suggestionInfo: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
});