import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";

export default function Home() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Dados para o carrossel - apenas imagens
  const carouselImages = [
    { id: "1", src: require("../screens/img/cachorroPurple.png") },
    { id: "2", src: require("../screens/img/gatoPurple.png") },
    { id: "3", src: require("../screens/img/cachorroBlack.png") },
    { id: "4", src: require("../screens/img/gatoBlack.png") },
  ];

  const goToNextPage = () => {
    const nextPage = currentPage === carouselImages.length - 1 ? 0 : currentPage + 1;
    pagerRef.current?.setPage(nextPage);
    setCurrentPage(nextPage);
  };

  const goToPreviousPage = () => {
    const prevPage = currentPage === 0 ? carouselImages.length - 1 : currentPage - 1;
    pagerRef.current?.setPage(prevPage);
    setCurrentPage(prevPage);
  };

  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="paw" size={28} color="#b563c5ff" />
          <Text style={styles.headerTitle}>Lar Amigo</Text>
        </View>
        <TouchableOpacity style={styles.donateButton}>
          <Ionicons name="heart" size={18} color="#debcebff" />
          <Text style={styles.donateText}>DOAR</Text>
        </TouchableOpacity>
      </View>

      {/* Banner com Carrossel de Imagens */}
      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        {/* Carrossel apenas para as imagens */}
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
                  <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.arrowRight} 
                  onPress={goToNextPage}
                >
                  <Ionicons name="chevron-forward" size={24} color="#fff" />
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
          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Quero Adotar um Pet 🐾</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Pets Section */}
      <Text style={styles.sectionTitle}>Quem Está Esperando por Você?</Text>
      <View style={styles.petsContainer}>
        {[
          { name: "Thor", info: "2 anos, Médio", src: require("../screens/img/Thor.png") },
          { name: "Luna", info: "1 anos, Pequeno", src: require("../screens/img/gato.png") },
          { name: "Tobby", info: "8 meses, Pequeno", src: require("../screens/img/yorkshire.png") },
        ].map((pet, index) => (
          <View key={index} style={styles.petCard}>
            <Image source={pet.src} style={styles.petImage} />
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petInfo}>{pet.info}</Text>
          </View>
        ))}
      </View>

      {/* Help Section */}
      <Text style={styles.sectionTitle}>Não Pode Adotar? Ainda Pode Ajudar!</Text>
      <View style={styles.helpContainer}>
        <TouchableOpacity style={[styles.helpBox, { backgroundColor: "#ad5de2ff" }]}>
          <Ionicons name="cash-outline" size={30} color="#fff" />
          <Text style={styles.helpTitle}>Doação</Text>
          <Text style={styles.helpText}>Cada R$1 ajuda com vacinas e rações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.helpBox, { backgroundColor: "#a458d6ff" }]}>
          <Ionicons name="home-outline" size={30} color="#fff" />
          <Text style={styles.helpTitle}>Lar Temporário</Text>
          <Text style={styles.helpText}>Ofereça um lar até a adoção definitiva</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.helpBox, { backgroundColor: "#bc41f5ff" }]}>
          <Ionicons name="people-outline" size={30} color="#fff" />
          <Text style={styles.helpTitle}>Voluntário</Text>
          <Text style={styles.helpText}>Doe seu tempo e amor aos animais</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Siga o Lar Amigo 💜</Text>
        <View style={styles.socialContainer}>
          <Ionicons name="logo-instagram" size={24} color="#C13584" />
          <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          <Ionicons name="logo-youtube" size={24} color="#FF0000" />
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
    gap: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  donateButton: {
    flexDirection: "row",
    backgroundColor: "#b563c5ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    gap: 4,
  },
  donateText: {
    color: "#fff",
    fontWeight: "600",
  },
  // Banner com carrossel
  banner: {
    borderRadius: 16,
    margin: 20,
    overflow: "hidden",
  },
  carouselContainer: {
    height: 180, // Altura fixa para as imagens
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
    marginTop: -12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 4,
  },
  arrowRight: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 4,
  },
  // Indicadores do carrossel - agora na parte de baixo da imagem
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: "#b563c5ff",
    width: 12,
  },
  bannerTextContainer: {
    padding: 15,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  bannerSubtitle: {
    fontSize: 14,
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
  },
  // Resto dos estilos permanecem iguais
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
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
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  petName: {
    fontWeight: "600",
    color: "#333",
  },
  petInfo: {
    fontSize: 12,
    color: "#777",
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  helpBox: {
    width: 100,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  helpTitle: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 5,
  },
  helpText: {
    color: "#fff",
    fontSize: 11,
    textAlign: "center",
    marginTop: 3,
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
});