import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../screens/FavoriteContext"; // Ajuste o caminho

export default function Home() {
  const navigation = useNavigation();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Dados para o carrossel - apenas imagens
  const carouselImages = [
    { id: "1", src: require("../screens/img/cachorroPurple.png") },
    { id: "2", src: require("../screens/img/gatoPurple.png") },
    { id: "3", src: require("../screens/img/cachorroBlack.png") },
    { id: "4", src: require("../screens/img/gatoBlack.png") },
  ];

  // Pets da seção principal
  const homePets = [
    { id: "1", name: "Thor", info: "2 anos, Médio", src: require("../screens/img/Thor.png") },
    { id: "2", name: "Luna", info: "1 ano, Pequeno", src: require("../screens/img/gato.png") },
    { id: "3", name: "Tobby", info: "8 meses, Pequeno", src: require("../screens/img/yorkshire.png") },
  ];

  // Efeito para o carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = currentPage === carouselImages.length - 1 ? 0 : currentPage + 1;
      pagerRef.current?.setPage(nextPage);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage, carouselImages.length]);

  const goToNextPage = () => {
    const nextPage = currentPage === carouselImages.length - 1 ? 0 : currentPage + 1;
    pagerRef.current?.setPage(nextPage);
  };

  const goToPreviousPage = () => {
    const prevPage = currentPage === 0 ? carouselImages.length - 1 : currentPage - 1;
    pagerRef.current?.setPage(prevPage);
  };

  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const handleToggleFavorite = (pet: any) => {
    toggleFavorite(pet);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="paw" size={24} color="#b563c5ff" />
          <Text style={styles.headerTitle}>Lar Amigo</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Search' as never)}
          >
            <Ionicons name="search" size={20} color="#b563c5ff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Favorites' as never)}
          >
            <Ionicons name="heart" size={20} color="#b563c5ff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Chat' as never)}
          >
            <Ionicons name="chatbubble-ellipses" size={20} color="#b563c5ff" />
          </TouchableOpacity>

          {/* BOTÃO DO BLOG/NOTÍCIAS */}
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('News' as never)}
          >
            <Ionicons name="newspaper" size={20} color="#b563c5ff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Login' as never)}
          >
            <Ionicons name="person-circle" size={22} color="#b563c5ff" />
          </TouchableOpacity>
          
          {/* BOTÃO DOAR REMOVIDO */}
        </View>
      </View>

      {/* Banner com Carrossel de Imagens */}
      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.carouselContainer}>
          <PagerView 
            ref={pagerRef} 
            style={styles.pagerView} 
            initialPage={0}
            onPageSelected={onPageSelected}
          >
            {carouselImages.map((item) => (
              <View key={item.id} style={styles.carouselPage}>
                <Image
                  source={item.src} 
                  style={styles.bannerImage}
                />
                
                {/* Setas de navegação */}
                <TouchableOpacity 
                  style={styles.arrowLeft} 
                  onPress={goToPreviousPage}
                >
                  <Ionicons name="chevron-back" size={20} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.arrowRight} 
                  onPress={goToNextPage}
                >
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </PagerView>
          
          {/* Indicadores na parte de baixo da imagem */}
          <View style={styles.carouselIndicators}>
            {carouselImages.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.indicator,
                  index === currentPage && styles.indicatorActive
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Texto fixo - não muda com o carrossel */}
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Adote Amor, Ganhe um Amigo</Text>
          <Text style={styles.bannerSubtitle}>
            Milhares de patinhas esperam por um lar. 
          </Text>
          <Text style={styles.bannerSubtitle}>Mude uma vida hoje!</Text>
          <TouchableOpacity 
            style={styles.mainButton}
            onPress={() => navigation.navigate('Adoption' as never)}
          >
            <Text style={styles.mainButtonText}>Quero Adotar um Pet 🐾</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Pets Section */}
      <View style={styles.petsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitlee}> Quem Está Esperando por Você?</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={() => navigation.navigate('Search' as never)}
          >
            <Text style={styles.seeAllText}>Ver todos</Text>
            <Ionicons name="chevron-forward" size={14} color="#b563c5ff" />
          </TouchableOpacity>
        </View>
        <View style={styles.petsContainer}>
          {homePets.map((pet) => (
            <View key={pet.id} style={styles.petCard}>
              <Image source={pet.src} style={styles.petImage} />
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => handleToggleFavorite(pet)}
              >
                <Ionicons 
                  name={isFavorite(pet.id) ? "heart" : "heart-outline"} 
                  size={18} 
                  color={isFavorite(pet.id) ? "#FF6B6B" : "#b563c5ff"} 
                />
              </TouchableOpacity>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petInfo}>{pet.info}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Help Section - CORRIGIDO O ESPAÇAMENTO */}
      <Text style={[styles.sectionTitle, styles.helpSectionTitle]}>Não Pode Adotar? Ainda Pode Ajudar!</Text>
      <View style={styles.helpContainer}>
        <TouchableOpacity 
          style={[styles.helpBox, { backgroundColor: "#ad5de2ff" }]}
          onPress={() => navigation.navigate('Donation' as never)}
        >
          <Ionicons name="cash-outline" size={24} color="#fff" />
          <Text style={styles.helpTitle}>Doação</Text>
          <Text style={styles.helpText}>Cada R$1 ajuda com vacinas e rações</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.helpBox, { backgroundColor: "#a458d6ff" }]}
          onPress={() => navigation.navigate('TemporaryHome' as never)}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.helpTitle}>Lar Temporário</Text>
          <Text style={styles.helpText}>Ofereça um lar até a adoção definitiva</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.helpBox, { backgroundColor: "#bc41f5ff" }]}
          onPress={() => navigation.navigate('Volunteer' as never)}
        >
          <Ionicons name="people-outline" size={24} color="#fff" />
          <Text style={styles.helpTitle}>Voluntário</Text>
          <Text style={styles.helpText}>Doe seu tempo e amor aos animais</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Fale Conosco</Text>
        <Text style={styles.contactSubtitle}>
          Tem dúvidas ou quer saber mais sobre adoção? Entre em contato conosco!
        </Text>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => navigation.navigate('Contact' as never)}
        >
          <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
          <Text style={styles.contactButtonText}>Entrar em Contato</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Siga o Lar Amigo 💜</Text>
        <View style={styles.socialContainer}>
          <Ionicons name="logo-instagram" size={20} color="#C13584" />
          <Ionicons name="logo-facebook" size={20} color="#1877F2" />
          <Ionicons name="logo-youtube" size={20} color="#FF0000" />
        </View>
      </View>
    </ScrollView>
  );
}

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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  iconButton: {
    padding: 6,
  },
  // REMOVIDO: donateButton e donateText
  // Banner com carrossel
  banner: {
    borderRadius: 16,
    margin: 20,
    overflow: "hidden",
  },
  carouselContainer: {
    height: 180,
    position: "relative",
  },
  pagerView: {
    flex: 1,
  },
  carouselPage: {
    flex: 1,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  // Setas de navegação
  arrowLeft: {
    position: "absolute",
    left: 10,
    top: "50%",
    marginTop: -10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 16,
    padding: 6,
  },
  arrowRight: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 16,
    padding: 6,
  },
  // Indicadores do carrossel
  carouselIndicators: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 3,
  },
  indicatorActive: {
    backgroundColor: "#b563c5ff",
    width: 10,
  },
  bannerTextContainer: {
    padding: 15,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  bannerSubtitle: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
  mainButton: {
    marginTop: 12,
    backgroundColor: "#8a4697ff",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  // Pets Section
  petsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginHorizontal: 30,
  },
  sectionTitlee: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  // NOVO ESTILO PARA A SEÇÃO DE AJUDA - CORREÇÃO DO ESPAÇAMENTO
  helpSectionTitle: {
    marginTop: 25, // Espaçamento acima do título "Não Pode Adotar?"
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllText: {
    fontSize: 13,
    color: "#b563c5ff",
    fontWeight: "600",
  },
  petsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  petCard: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    width: 100,
    position: "relative",
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
  },
  petName: {
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    fontSize: 13,
  },
  petInfo: {
    fontSize: 11,
    color: "#777",
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  helpBox: {
    width: 100,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  helpTitle: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
  },
  helpText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
    lineHeight: 12,
  },
  contactSection: {
    backgroundColor: "#f0e6f5",
    margin: 20,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  contactSubtitle: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 18,
  },
  contactButton: {
    flexDirection: "row",
    backgroundColor: "#b563c5ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    gap: 6,
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
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
  socialContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
});