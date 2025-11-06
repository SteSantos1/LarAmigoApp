import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function News() {
  const navigation = useNavigation();

  // Dados para as notícias
  const newsData = [
    {
      id: "1",
      title: "Como Adaptar um Pet Recém-Chegado em Casa",
      category: "Dicas de Cuidado",
      date: "15 Nov 2024",
      image: require("../screens/img/cachorroPurple.png"), // Use uma imagem existente
      excerpt: "Confira dicas essenciais para receber seu novo amigo de quatro patas...",
      readTime: "5 min de leitura"
    },
    {
      id: "2",
      title: "História de Sucesso: Thor Encontrou um Lar",
      category: "Adoção Bem-Sucedida",
      date: "12 Nov 2024",
      image: require("../screens/img/Thor.png"),
      excerpt: "Conheça a emocionante história de Thor, que após 1 ano no abrigo, encontrou uma família...",
      readTime: "3 min de leitura"
    },
    {
      id: "3",
      title: "Feira de Adoção Especial - Natal 2024",
      category: "Eventos do Abrigo",
      date: "10 Nov 2024",
      image: require("../screens/img/gatoPurple.png"),
      excerpt: "Participe da nossa feira de adoção natalina e dê um lar para um pet neste fim de ano...",
      readTime: "2 min de leitura"
    },
    {
      id: "4",
      title: "Campanha: Castração Gratuita",
      category: "Campanhas Especiais",
      date: "8 Nov 2024",
      image: require("../screens/img/cachorroBlack.png"),
      excerpt: "Apoie nossa campanha de castração gratuita para pets de comunidades carentes...",
      readTime: "4 min de leitura"
    },
    {
      id: "5",
      title: "Alimentação Saudável para Seu Pet",
      category: "Dicas de Cuidado",
      date: "5 Nov 2024",
      image: require("../screens/img/gatoBlack.png"),
      excerpt: "Aprenda a escolher a melhor ração e manter uma alimentação balanceada...",
      readTime: "6 min de leitura"
    },
    {
      id: "6",
      title: "Luna: De Abandonada a Amada",
      category: "Adoção Bem-Sucedida",
      date: "3 Nov 2024",
      image: require("../screens/img/gato.png"),
      excerpt: "A transformação incrível de Luna, que superou o abandono e encontrou amor...",
      readTime: "4 min de leitura"
    }
  ];

  // Categorias para filtro
  const categories = [
    "Todos",
    "Dicas de Cuidado",
    "Adoção Bem-Sucedida",
    "Eventos do Abrigo",
    "Campanhas Especiais"
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  const filteredNews = selectedCategory === "Todos" 
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory);

  const renderNewsItem = ({ item }: any) => (
    <TouchableOpacity style={styles.newsCard}>
      <Image source={item.image} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsExcerpt}>{item.excerpt}</Text>
        <View style={styles.newsFooter}>
          <Text style={styles.newsDate}>{item.date}</Text>
          <Text style={styles.readTime}>{item.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === item && styles.categoryButtonTextActive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

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
          <Ionicons name="newspaper" size={20} color="#b563c5ff" />
          <Text style={styles.headerTitle}>Blog & Notícias</Text>
        </View>
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Banner */}
      <LinearGradient colors={["#ffffffff", "#b563c5ff"]} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Ionicons name="newspaper" size={40} color="#b563c5ff" />
          <Text style={styles.bannerTitle}>Blog do Lar Amigo</Text>
          <Text style={styles.bannerSubtitle}>
            Fique por dentro das novidades, dicas e histórias inspiradoras
          </Text>
        </View>
      </LinearGradient>

      {/* Categorias */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Destaque */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Em Destaque</Text>
        <TouchableOpacity style={styles.featuredCard}>
          <Image 
            source={require("../screens/img/Thor.png")} 
            style={styles.featuredImage} 
          />
          <LinearGradient 
            colors={["transparent", "rgba(0,0,0,0.8)"]} 
            style={styles.featuredGradient}
          >
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Destaque</Text>
            </View>
            <Text style={styles.featuredTitle}>
              Recorde de Adoções no Mês de Outubro
            </Text>
            <Text style={styles.featuredExcerpt}>
              45 pets encontraram lares amorosos em um único mês!
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Lista de Notícias */}
      <View style={styles.newsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "Todos" ? "Todas as Notícias" : selectedCategory}
          </Text>
          <Text style={styles.newsCount}>
            {filteredNews.length} {filteredNews.length === 1 ? 'item' : 'itens'}
          </Text>
        </View>

        <FlatList
          data={filteredNews}
          renderItem={renderNewsItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.newsList}
        />
      </View>

      {/* Newsletter */}
      <View style={styles.newsletterSection}>
        <Ionicons name="mail" size={32} color="#b563c5ff" />
        <Text style={styles.newsletterTitle}>Fique por Dentro</Text>
        <Text style={styles.newsletterText}>
          Receba as novidades do abrigo diretamente no seu email
        </Text>
        <TouchableOpacity style={styles.newsletterButton}>
          <Text style={styles.newsletterButtonText}>Assinar Newsletter</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lar Amigo - Transformando Vidas 💜</Text>
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
  headerRightPlaceholder: {
    width: 40,
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
  categoriesSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  categoriesList: {
    gap: 10,
  },
  categoryButton: {
    backgroundColor: "#f0e6f5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0d0e9",
  },
  categoryButtonActive: {
    backgroundColor: "#b563c5ff",
    borderColor: "#b563c5ff",
  },
  categoryButtonText: {
    fontSize: 12,
    color: "#b563c5ff",
    fontWeight: "500",
  },
  categoryButtonTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  featuredSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  featuredCard: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  featuredBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  featuredExcerpt: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.9,
  },
  newsSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  newsCount: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  newsList: {
    gap: 16,
  },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  newsImage: {
    width: "100%",
    height: 160,
  },
  newsContent: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#f0e6f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    color: "#b563c5ff",
    fontWeight: "600",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
    lineHeight: 20,
  },
  newsExcerpt: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 10,
  },
  newsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newsDate: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
  },
  readTime: {
    fontSize: 11,
    color: "#b563c5ff",
    fontWeight: "500",
  },
  newsletterSection: {
    backgroundColor: "#f0e6f5",
    margin: 20,
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
  },
  newsletterTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
    marginBottom: 4,
  },
  newsletterText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 18,
  },
  newsletterButton: {
    backgroundColor: "#b563c5ff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  newsletterButtonText: {
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
    marginBottom: 8,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
  },
});